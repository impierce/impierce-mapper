use core::panic;
use digital_credential_data_models::{elmv3::EuropassEdcCredential, obv3::AchievementCredential};
use regex::Regex;
use serde::{de::DeserializeOwned, Serialize};
use serde_json::{json, Value};
use std::{collections::HashMap, fs::File, io::BufReader, path::Path};

use super::repository::{construct_leaf_node, merge};
use crate::{
    backend::{leaf_nodes::get_leaf_nodes, repository::Repository, transformations::Transformation},
    state::AppState,
    trace_dbg,
};

// todo: when going back to p1 and loading again, everything in backend is wiped because of this preload fn.
// this is fine but then also state info must be wiped
pub fn preload_p2(state: &mut AppState) {
    let (input_format, output_format) = (state.mapping.input_format(), state.mapping.output_format());

    // Load the input file
    {
        let rdr = std::fs::File::open(&state.input_path).unwrap();
        let input_value: Value = serde_json::from_reader(rdr).unwrap();
        let leaf_nodes: HashMap<String, Value> = get_leaf_nodes(input_value);
        let mut input_fields = vec![(String::new(), String::new())];

        for (key, value) in leaf_nodes {
            input_fields.push((key, value.to_string()));
        }

        input_fields.sort();
        state.amount_input_fields = input_fields.len() - 2;
        state.input_fields = input_fields;

        state.repository = Repository::from(HashMap::from_iter(vec![
            (
                input_format.to_string(),
                get_json(&state.input_path).expect("No source file found"),
            ),
            (output_format.to_string(), json!({})),
        ]));

        trace_dbg!("Successfully loaded the input file");
    }

    // Load the mapping file
    {
        let rdr = std::fs::File::open(&state.mapping_path).unwrap();
        let transformations: Vec<Transformation> = serde_json::from_reader(rdr).unwrap();

        trace_dbg!("Successfully loaded the mapping file");

        // Load the custom mapping file
        // { // todo: I added the custom_mapping_path as the destination to save the manual mappings to. not to load mappings from, thats the mapping_path
        //     if !state.custom_mapping_path.is_empty() && Path::new(&state.custom_mapping_path).is_file() && state.custom_mapping_path.ends_with(".json"){
        //         let rdr = std::fs::File::open(&state.custom_mapping_path).unwrap();
        //         let mut custom_transformations: Vec<Transformation> = serde_json::from_reader(rdr).unwrap();
        //         transformations.append(&mut custom_transformations);

        //         trace_dbg!("Successfully loaded the custom mapping file");
        //     }
        // }

        state.repository.apply_transformations(transformations);
    }

    trace_dbg!(&output_format);
    trace_dbg!(&state.repository);
    let json_value = state.repository.get(&output_format).unwrap().clone();

    state.missing_data_fields = [
        vec![("".to_string(), "".to_string())],
        match state.mapping.output_format().as_str() {
            "OBv3" => get_missing_data_fields::<AchievementCredential>(json_value.clone()),
            "ELM" => get_missing_data_fields::<EuropassEdcCredential>(json_value.clone()),
            _ => panic!(),
        }
        .into_iter()
        .map(|pointer| (pointer, "".to_string()))
        .collect(),
    ]
    .concat();

    //selector(state);
}

pub fn verify<T>(json_value: &mut Value) -> Result<Value, String>
where
    T: DeserializeOwned + Serialize,
{
    let mut json_as_string = json_value.to_string();
    loop {
        // TODO: make dynamic
        let mut de = serde_json::Deserializer::from_str(&json_as_string);
        match serde_path_to_error::deserialize::<_, T>(&mut de) {
            Ok(obv3_credential) => {
                return Ok(json!(obv3_credential));
            }
            Err(e) => {
                let error_message = e.inner().to_string();

                let path = e.path().to_string().replace('.', "/");

                if error_message.starts_with("missing field") {
                    let missing_field = extract_between_backticks(&e.to_string()).unwrap();
                    let pointer = if path == "/" {
                        format!("{path}{missing_field}")
                    } else {
                        format!("/{path}/{missing_field}")
                    };

                    let mut leaf_node = construct_leaf_node(&pointer);

                    leaf_node.pointer_mut(&pointer).map(|value| *value = json!({})).unwrap(); // could be a problem when we add field constraints

                    merge(json_value, leaf_node);

                    json_as_string = json_value.to_string();

                    continue;
                }

                if error_message.starts_with("data did not match any variant of untagged enum") {
                    let pointer = if path == "/" { path } else { format!("/{path}") };

                    let mut leaf_node = construct_leaf_node(&pointer);

                    leaf_node.pointer_mut(&pointer).map(|value| *value = json!("")).unwrap(); // doesnt work

                    merge(json_value, leaf_node);

                    json_as_string = json_value.to_string();

                    continue;
                }

                if error_message.starts_with("input contains invalid characters") {
                    let pointer = if path == "/" { path } else { format!("/{path}") };

                    let mut leaf_node = construct_leaf_node(&pointer);

                    leaf_node
                        .pointer_mut(&pointer)
                        .map(|value| *value = json!("2010-01-01T00:00:00Z"))
                        .unwrap();

                    merge(json_value, leaf_node);

                    json_as_string = json_value.to_string();

                    continue;
                }

                if error_message.starts_with("invalid value") {
                    let pointer = if path == "/" { path } else { format!("/{path}") };

                    let mut leaf_node = construct_leaf_node(&pointer);

                    let expected_value = extract_string_value(&error_message).unwrap();

                    if expected_value != "https://www.w3.org/ns/credentials/v2" {
                        panic!("Expected value: {}", expected_value);
                    }

                    leaf_node
                        .pointer_mut(&pointer)
                        .map(|value| *value = json!([expected_value]))
                        .unwrap();

                    merge(json_value, leaf_node);

                    json_as_string = json_value.to_string();

                    continue;
                }

                if error_message.starts_with("invalid type") {
                    let pointer = if error_message.contains("invalid type: map")
                        && error_message.contains("expected a sequence")
                    {
                        let pointer = if path == "/" { path } else { format!("/{path}") };

                        let mut leaf_node = construct_leaf_node(&pointer);

                        leaf_node
                            .pointer_mut(&pointer)
                            .map(|value| *value = json!(["TEMP"]))
                            .unwrap();

                        merge(json_value, leaf_node);

                        // json_as_string = json_value.to_string();

                        return Err(format!("{pointer}/0"));
                    } else if path == "/" {
                        path
                    } else {
                        format!("/{path}")
                    };

                    return Err(pointer);
                } else {
                    panic!("Unknown error: {}", error_message);
                };
            }
        }
    }
}

pub fn get_missing_data_fields<T>(mut temp_credential: Value) -> Vec<String>
where
    T: DeserializeOwned + Serialize,
{
    let mut missing_data_fields = vec![];
    while let Err(pointer) = verify::<T>(&mut temp_credential) {
        trace_dbg!(&temp_credential);
        trace_dbg!(&pointer);

        match temp_credential
            .pointer_mut(&pointer)
            .map(|value| *value = json!("TEMP")) // could be a problem when we add field constraints
        {
            Some(_) => {}
            None => return vec![],
        }
        missing_data_fields.push(pointer);
    }

    missing_data_fields
}

fn extract_string_value(input: &str) -> Option<&str> {
    let re = Regex::new(r"expected (.*?) at line").unwrap();
    re.captures(input).and_then(|cap| cap.get(1).map(|m| m.as_str()))
}

fn get_json<T>(path: impl AsRef<Path>) -> Result<T, serde_json::Error>
where
    T: DeserializeOwned,
{
    let file = File::open(path).expect("failed to open file");
    let reader = BufReader::new(file);

    serde_json::from_reader(reader)
}

fn extract_between_backticks(s: &str) -> Option<String> {
    // Define the regex pattern to match text between backticks
    let re = Regex::new(r"`([^`]*)`").unwrap();

    // Find the first match and extract the text between the backticks
    re.captures(s)
        .and_then(|caps| caps.get(1).map(|m| m.as_str().to_string()))
}
