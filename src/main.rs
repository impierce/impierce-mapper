// mod backend;
// mod events;
// mod render;
// mod state;

// use crate::events::*;
// use crate::render::*;

// use backend::logging::initialize_logging;
// use crossterm::event::DisableMouseCapture;
// use crossterm::event::EnableMouseCapture;
// use crossterm::execute;
// use crossterm::terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen};
// use jsonschema::ValidationError;
// use ratatui::prelude::{CrosstermBackend, Terminal};
// use serde_json::Value;
// use state::AppState;
// use std::fs::File;
// use std::io::{stdout, Result};

// use jsonschema::{Draft, JSONSchema};
// use serde_json::json;
// use std::fs;

// // Load I18n macro, for allow you use `t!` macro in anywhere.
// #[macro_use]
// extern crate rust_i18n;
// i18n!("src/locales", fallback = "en");

// // fn main() -> Result<()> {
// //     initialize_logging().expect("Unexpected error while initializing logging");
// //     trace_dbg!("Starting the application");

// //     // Initialize the alternate terminal screen, its input and the backend for it.
// //     execute!(stdout(), EnterAlternateScreen, EnableMouseCapture)?;
// //     enable_raw_mode()?;
// //     let mut terminal = Terminal::new(CrosstermBackend::new(stdout()))?;
// //     terminal.clear()?;
// //     let mut state = AppState {
// //         // Default example values, remove if no longer needed
// //         input_path: "res/elm_example.json".to_string(),
// //         mapping_path: "res/mapping_empty.json".to_string(),
// //         output_path: "res/output_credential.json".to_string(),
// //         custom_mapping_path: "res/custom_mapping.json".to_string(),

// //         optional_fields: vec![
// //             ("".to_string(), "".to_string()),
// //             ("credentialSubject/e-Mail".to_string(), "".to_string()),
// //             ("credentialSubject/phoneNumber".to_string(), "".to_string()),
// //             ("credentialSubject/gender".to_string(), "".to_string()),
// //         ], // todo: load in optional fields properly

// //         selected_input_field: 1, // todo: what if none? Also after going back to tab 1 and changing file paths?
// //         selected_missing_field: 1, // todo: what if none?
// //         selected_optional_field: 1, // todo: what if none?
// //         select_mapping_option: true,
// //         ..Default::default()
// //     };

// //     loop {
// //         terminal.draw(|frame| {
// //             let area = frame.size();
// //             state.area = area;
// //             render_page(frame, area, &mut state);
// //         })?;

// //         if events_handler(&mut state)? {
// //             break;
// //         };
// //     }

// //     execute!(stdout(), LeaveAlternateScreen, DisableMouseCapture)?;
// //     disable_raw_mode()?;
// //     Ok(())
// // }

// fn main() {
//     println!("pwd: {}", std::env::current_dir().unwrap().display());
    
//     let schema_file = File::open("json/ebsi-elm/vcdm2.0-europass-edc-schema/schema.json").unwrap();
//     let schema: Value = serde_json::from_reader(schema_file).unwrap();
//     let schema = JSONSchema::compile(&schema).expect("A valid schema");

//     let target_file = File::open("json/ebsi-elm/vcdm2.0-europass-edc-schema/examples/Bengales_highSchoolDiploma.json").unwrap();
//     let target_credential: Value = serde_json::from_reader(target_file).unwrap();

//     let result = schema.validate(&target_credential);
//     let errors: Vec<ValidationError>;
//     match result {
//         Ok(_) => {
//             println!("No validation errors found.");
//             return;
//         }
//         Err(err) => {
//             errors = err.collect();
//         }
//     };

//     println!("Total errors found: {}", errors.len());

//     for (i, error) in errors.iter().enumerate() {
//         println!("{:#?}", error);
//         if i < errors.len() - 1 {
//             println!("Press Enter to see the next error...");
//             let _ = std::io::stdin().read_line(&mut String::new());
//         }
//     }

//     // todo: get optional fields from json schema, starting with obv3
// }
use jsonschema::{JSONSchema, Draft};
use serde_json::{Map, Value};
use std::collections::HashMap;
use std::fs::File;
use std::io::{self, Write};

/// Extracts all possible leaf node paths from a JSON schema using JSON pointers.
fn extract_paths(
    schema: &Value,
    base_path: &str,
    paths: &mut Vec<String>,
    defs: &HashMap<String, Value>,
    current_path: &mut Vec<String>,
) {
    if let Some(properties) = schema.get("properties") {
        if let Value::Object(map) = properties {
            for (key, value) in map {
                if current_path.contains(key) {
                    continue; // Skip if key is already in the current path
                }
                current_path.push(key.clone());
                let new_path = format!("{}/{}", base_path, key);
                paths.push(new_path.clone());
                extract_paths(value, &new_path, paths, defs, current_path);
                current_path.pop();
            }
        }
    }
    if let Some(items) = schema.get("items") {
        current_path.push("items".to_string());
        let new_path = format!("{}/items", base_path);
        extract_paths(items, &new_path, paths, defs, current_path);
        current_path.pop();
    }
    if let Some(any_of) = schema.get("anyOf") {
        if let Value::Array(arr) = any_of {
            for (i, subschema) in arr.iter().enumerate() {
                current_path.push(format!("anyOf/{}", i));
                let new_path = format!("{}/anyOf/{}", base_path, i);
                extract_paths(subschema, &new_path, paths, defs, current_path);
                current_path.pop();
            }
        }
    }
    if let Some(one_of) = schema.get("oneOf") {
        if let Value::Array(arr) = one_of {
            for (i, subschema) in arr.iter().enumerate() {
                current_path.push(format!("oneOf/{}", i));
                let new_path = format!("{}/oneOf/{}", base_path, i);
                extract_paths(subschema, &new_path, paths, defs, current_path);
                current_path.pop();
            }
        }
    }
    if let Some(all_of) = schema.get("allOf") {
        if let Value::Array(arr) = all_of {
            for (i, subschema) in arr.iter().enumerate() {
                current_path.push(format!("allOf/{}", i));
                let new_path = format!("{}/allOf/{}", base_path, i);
                extract_paths(subschema, &new_path, paths, defs, current_path);
                current_path.pop();
            }
        }
    }
    if let Some(ref_name) = schema.get("$ref").and_then(|v| v.as_str()) {
        if ref_name.starts_with("#/$defs/") {
            let def_key = ref_name.trim_start_matches("#/$defs/").to_string();
            if let Some(def_schema) = defs.get(&def_key) {
                current_path.push(def_key.clone());
                extract_paths(def_schema, base_path, paths, defs, current_path);
                current_path.pop();
            }
        }
    }
}

fn main() {
    // Parse the JSON schema
    
    // let schema_json: Value = serde_json::from_str(schema_str).unwrap();

    let schema_file = std::fs::File::open("json/obv3/obv3_schema.json").unwrap();
    let schema_json: Value = serde_json::from_reader(schema_file).unwrap();

    // Validate the schema
    let compiled_schema = JSONSchema::options().with_draft(Draft::Draft7).compile(&schema_json);
    if let Err(e) = compiled_schema {
        eprintln!("Invalid schema: {}", e);
        return;
    }

    // Extract $defs
    let defs = schema_json.get("$defs").and_then(|v| v.as_object()).map_or_else(HashMap::new, |map| {
        map.iter().map(|(k, v)| (k.clone(), v.clone())).collect()
    });

    // Extract paths
    let mut paths = Vec::new();
    let mut current_path = Vec::new();
    extract_paths(&schema_json, "", &mut paths, &defs, &mut current_path);
    paths.sort();

    // Write paths to a file
    let mut file = std::fs::File::create("output_paths.txt").unwrap();
    for path in &paths {
        file.write_fmt(format_args!("{}\n", path)).unwrap();
    }
    
    // Print paths
    for path in &paths {
        println!("{}", path);
    }


}
