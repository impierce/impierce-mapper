use jsonschema::{Draft, ValidationError};
use serde_json::Value;
use std::fs::File;
use jsonschema::JSONSchema;

pub fn _validate_json_instance() {
    let schema_file = File::open("json/ebsi-elm/vcdm2.0-europass-edc-schema/schema.json").unwrap();
    let schema: Value = serde_json::from_reader(schema_file).unwrap();
    // Validate the schema
    let schema = JSONSchema::options().with_draft(Draft::Draft7).compile(&schema).expect("A valid schema");
    
    let target_file = File::open("json/ebsi-elm/vcdm2.0-europass-edc-schema/examples/Bengales_highSchoolDiploma.json").unwrap();
    let target_credential: Value = serde_json::from_reader(target_file).unwrap();

    let result = schema.validate(&target_credential);
    let errors: Vec<ValidationError>;
    match result {
        Ok(_) => {
            println!("No validation errors found.");
            return;
        }
        Err(err) => {
            errors = err.collect();
        }
    };

    println!("Total errors found: {}\n", errors.len());

    for (i, error) in errors.iter().enumerate() {
        println!("{:#?}", error);
        if i < errors.len() - 1 {
            println!("Press Enter to see the next error...");
            let _ = std::io::stdin().read_line(&mut String::new());
        }
    }
}
