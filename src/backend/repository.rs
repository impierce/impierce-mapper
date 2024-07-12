use crate::{
    backend::{
        jsonpointer::{JsonPath, JsonPointer},
        transformations::{DataLocation, Transformation},
    },
    state::AppState,
    trace_dbg,
};
use jsonpath_rust::JsonPathFinder;
use serde_json::{json, Map, Value};
use std::{
    collections::HashMap,
    ops::{Deref, DerefMut},
};

#[derive(Debug, Default)]
pub struct Repository(HashMap<String, Value>);

impl DerefMut for Repository {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl Deref for Repository {
    type Target = HashMap<String, Value>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<HashMap<String, Value>> for Repository {
    fn from(map: HashMap<String, Value>) -> Self {
        Self(map)
    }
}

impl Repository {
    // fn new() -> Self {
    //     Self(HashMap::new())
    // }

    pub fn apply_transformation(&mut self, transformation: Transformation) {
        match transformation {
            Transformation::OneToOne {
                type_: transformation,
                source:
                    DataLocation {
                        format: source_format,
                        path: mut source_path,
                    },
                destination:
                    DataLocation {
                        format: destination_format,
                        path: destination_path,
                    },
            } => {
                let source_credential = self.get(&source_format).unwrap();

                if source_path == "$.@context" {
                    source_path = r#"$["@context"]"#.to_string();
                };
                let finder = JsonPathFinder::from_str(&source_credential.to_string(), &source_path).unwrap();
                let source_value = finder.find().as_array().unwrap().first().unwrap().clone();

                let destination_credential = self.entry(destination_format).or_insert(json!({}));
                let pointer = JsonPointer::try_from(JsonPath(destination_path)).unwrap();

                let mut leaf_node = construct_leaf_node(&pointer);

                if let Some(value) = leaf_node.pointer_mut(&pointer) {
                    *value = transformation.apply(source_value);
                }

                merge(destination_credential, leaf_node);
            }
            Transformation::ManyToOne {
                type_: transformation,
                sources,
                destination,
            } => {
                let source_values = sources
                    .iter()
                    .map(|source| {
                        let source_credential = self.get(&source.format).unwrap();

                        let finder = JsonPathFinder::from_str(&source_credential.to_string(), &source.path).unwrap();
                        finder.find().as_array().unwrap().first().unwrap().clone()
                    })
                    .collect::<Vec<_>>();

                let destination_credential = self.entry(destination.format).or_insert(json!({}));
                let pointer = JsonPointer::try_from(JsonPath(destination.path.clone())).unwrap();

                let mut leaf_node = construct_leaf_node(&pointer);

                if let Some(value) = leaf_node.pointer_mut(&pointer) {
                    *value = transformation.apply(source_values);
                }

                merge(destination_credential, leaf_node);
            }

            _ => todo!(),
        }
    }

    pub fn apply_transformations(&mut self, transformations: Vec<Transformation>) {
        for transformation in transformations {
            self.apply_transformation(transformation)
        }
    }
}

pub fn construct_leaf_node(path: &str) -> Value {
    // Split the input string by '/' and filter out any empty parts
    let parts: Vec<&str> = path.split('/').filter(|&s| !s.is_empty()).collect();

    // Initialize the root of the JSON structure as null
    let mut current_value = Value::Null;

    // Iterate through the parts in reverse order to build the nested structure
    for part in parts.into_iter().rev() {
        let mut new_object = Map::new();
        new_object.insert(part.to_string(), current_value);
        current_value = Value::Object(new_object);
    }

    current_value
}

pub fn merge(a: &mut Value, b: Value) {
    match (a, b) {
        (a @ &mut Value::Object(_), Value::Object(b)) => {
            let a = a.as_object_mut().unwrap();
            for (k, v) in b {
                merge(a.entry(k).or_insert(Value::Null), v); //
            }
        }
        (a, b) => *a = b,
    }
}

pub fn update_repository(state: &mut AppState) {
    let output_format = state.mapping.output_format();

    // let (_, source_value) = state.input_fields[state.selected_input_field].clone();

    let source_value = state.candidate_data_value.clone().unwrap();

    trace_dbg!(state.selected_missing_field);
    if state.selected_missing_field == 0 {
        return;
    }

    let pointer = state.missing_data_fields[state.selected_missing_field].0.clone();
    trace_dbg!(&pointer);

    let json_value = state.repository.get_mut(&output_format).unwrap();

    let mut leaf_node = construct_leaf_node(&pointer);

    if let Some(value) = leaf_node.pointer_mut(&pointer) {
        *value = serde_json::from_str(&source_value).unwrap();
    }

    trace_dbg!(&leaf_node);

    merge(json_value, leaf_node);
    trace_dbg!(json_value);
}
