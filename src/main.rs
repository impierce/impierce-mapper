mod backend;
mod events;
mod render;
mod state;

use crate::events::*;
use crate::render::*;

use backend::logging::initialize_logging;
use crossterm::event::DisableMouseCapture;
use crossterm::event::EnableMouseCapture;
use crossterm::execute;
use crossterm::terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen};
use jsonschema::ValidationError;
use ratatui::prelude::{CrosstermBackend, Terminal};
use state::AppState;
use std::io::{stdout, Result};

// Load I18n macro, for allow you use `t!` macro in anywhere.
#[macro_use]
extern crate rust_i18n;
i18n!("src/locales", fallback = "en");

// fn main() -> Result<()> {
//     initialize_logging().expect("Unexpected error while initializing logging");
//     trace_dbg!("Starting the application");

//     // Initialize the alternate terminal screen, its input and the backend for it.
//     execute!(stdout(), EnterAlternateScreen, EnableMouseCapture)?;
//     enable_raw_mode()?;
//     let mut terminal = Terminal::new(CrosstermBackend::new(stdout()))?;
//     terminal.clear()?;
//     let mut state = AppState {
//         // Default example values, remove if no longer needed
//         input_path: "res/elm_example.json".to_string(),
//         mapping_path: "res/mapping_empty.json".to_string(),
//         output_path: "res/output_credential.json".to_string(),
//         custom_mapping_path: "res/custom_mapping.json".to_string(),

//         optional_fields: vec![
//             ("".to_string(), "".to_string()),
//             ("credentialSubject/e-Mail".to_string(), "".to_string()),
//             ("credentialSubject/phoneNumber".to_string(), "".to_string()),
//             ("credentialSubject/gender".to_string(), "".to_string()),
//         ], // todo: load in optional fields properly

//         selected_input_field: 1, // todo: what if none? Also after going back to tab 1 and changing file paths?
//         selected_missing_field: 1, // todo: what if none?
//         selected_optional_field: 1, // todo: what if none?
//         select_mapping_option: true,
//         ..Default::default()
//     };

//     loop {
//         terminal.draw(|frame| {
//             let area = frame.size();
//             state.area = area;
//             render_page(frame, area, &mut state);
//         })?;

//         if events_handler(&mut state)? {
//             break;
//         };
//     }

//     execute!(stdout(), LeaveAlternateScreen, DisableMouseCapture)?;
//     disable_raw_mode()?;
//     Ok(())
// }

use jsonschema::JSONSchema;
use serde_json::json;

fn main() {
    println!("pwd: {}", std::env::current_dir().unwrap().display());
    let file = std::fs::File::open("./res/obv3_schema.json").unwrap();
    let reader = std::io::BufReader::new(file);

    let schema: serde_json::Value = serde_json::from_reader(reader).unwrap();
    let target_rdr = std::fs::File::open("./res/obv3_example.json").unwrap();
    let target_credential: serde_json::Value = serde_json::from_reader(target_rdr).unwrap();
    
    // let target_credential = json!(
    //     { }
    // );

    // Draft is detected automatically
    // with fallback to Draft7
    let schema = JSONSchema::compile(&schema).expect("A valid schema");

    let result = schema.validate(&target_credential);
    let errors: Vec<ValidationError> = result.unwrap_err().collect();
    println!("{:#?}", errors.len());
    // println!("{:#?}", errors);
    println!("{:#?}", errors.get(0).unwrap());
}

// instance: Object {
//     "id": String("did:ebsi:org:12345689"),
//     "identifier": Object {
//         "id": String("urn:epass:identifier:2"),
//         "notation": String("73737373"),
//         "schemeName": String("University Aliance ID"),
//         "type": String("Identifier"),
//     },
//     "legalName": Object {
//         "en": String("ORGANIZACION TEST"),
//     },
