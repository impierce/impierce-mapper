use serde_json::Value;
use std::collections::HashMap;

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
                let new_path = format!("{}/{}", base_path, key);
                paths.push(new_path.clone());
                if current_path.contains(key) {
                    continue; // Skip if key is already in the current path to prevent infinite looping.
                }
                current_path.push(key.clone());
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

pub fn get_all_fields() -> Vec<String> {
    // Parse the JSON schema
    let schema_file = std::fs::File::open("json/obv3/obv3_schema.json").unwrap();
    let schema_json: Value = serde_json::from_reader(schema_file).unwrap();

    // Extract $defs
    let defs = schema_json.get("$defs").and_then(|v| v.as_object()).map_or_else(HashMap::new, |map| {
        map.iter().map(|(k, v)| (k.clone(), v.clone())).collect()
    });

    // Extract paths
    let mut paths = Vec::new();
    let mut current_path = Vec::new();
    extract_paths(&schema_json, "", &mut paths, &defs, &mut current_path);
    paths.sort();

    // Write paths to a file for debugging
    // let mut file = std::fs::File::create("output_paths.txt").unwrap();
    // for path in &paths {
    //     std::io::Write::write_fmt(&mut file, format_args!("{}\n", path)).unwrap();
    // }
    
    paths
}
