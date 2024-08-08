use ratatui::{
    buffer::Buffer,
    layout::{Constraint, Rect},
    prelude::*,
    widgets::*,
};

use crate::{
    backend::jsonpointer::JsonPath, mapping_bars::{render_manytoone_bar, render_mapping_bar}, popups::{render_popup_exit_warning, render_popup_mapping}, state::{translate, AppState, MappingOptions, P2P3Tabs, Pages}, trace_dbg
};

use serde_json::{Map, Value};

// Function to recursively resolve $refs in the schema
fn resolve_ref(schema: &Value, defs: &Value, ref_path: &str) -> Option<Value> {
    let ref_path = ref_path.trim_start_matches("#/$defs/");
    defs.get(ref_path).cloned()
}

// Function to analyze schema and extract possible root-level keys
fn extract_root_keys(schema: &Value, defs: &Value, keys: &mut Map<String, Value>) {

    if let Some(properties) = schema.get("properties") {
        if let Some(properties_map) = properties.as_object() {
            for key in properties_map.keys() {
                keys.insert(key.clone(), properties_map[key].clone());
            }
        }
    }

    if let Some(one_of) = schema.get("oneOf") {
        if let Some(one_of_array) = one_of.as_array() {
            for sub_schema in one_of_array {
                extract_root_keys(sub_schema, defs, keys);
            }
        }
    }

    if let Some(any_of) = schema.get("anyOf") {
        if let Some(any_of_array) = any_of.as_array() {
            for sub_schema in any_of_array {
                extract_root_keys(sub_schema, defs, keys);
            }
        }
    }

    if let Some(all_of) = schema.get("allOf") {
        if let Some(all_of_array) = all_of.as_array() {
            for sub_schema in all_of_array {
                extract_root_keys(sub_schema, defs, keys);
            }
        }
    }

    if let Some(ref_value) = schema.get("$ref") {
        if let Some(ref_str) = ref_value.as_str() {
            if let Some(resolved_schema) = resolve_ref(schema, defs, ref_str) {
                extract_root_keys(&resolved_schema, defs, keys);
            }
        }
    }
}

// Main function to load schema and extract root-level keys
fn get_root_keys_from_schema(state: &mut AppState) {


    // Extract $defs from the schema
    let defs = state.schema.get("$defs").unwrap_or(&Value::Null);

    // Set to store unique root-level keys
    let mut keys = Map::new();

    // Extract root-level keys
    extract_root_keys(&state.schema, defs, &mut keys);
    // trace_dbg!(&keys);
    state.section_map = keys;
}

pub fn get_section_output_fields(state: &mut AppState) {
    let mut sections = Vec::new();


    if state.page == Pages::ManualMappingP2 && state.missing_data_fields.len() > 30 {
        for path in &state.missing_data_fields {
            // Remove the leading '/' and split the path
            if let Some(stripped_path) = path.0.strip_prefix('/') {
                if let Some(first_section) = stripped_path.split('/').next() {
                    let first_section_str = first_section.to_string();
                    if !sections.contains(&first_section_str) {
                        sections.push(first_section_str);
                    }
                }
            }
        }

        state.section_missing_fields = sections.into_iter().map(|section| (section, "".to_string())).collect();
    }

    else if state.page == Pages::UnusedDataP3 && state.optional_fields.len() > 30 {

        get_root_keys_from_schema(state);
        let value: Value = state.section_map.clone().into();
        // let path = serde_json_path::JsonPath::parse(&state.selected_optional_path);
        let path = serde_json_path::JsonPath::parse("$.credentialSubject");
        // trace_dbg!(&path);
        // trace_dbg!(&value);
        match path {
            Ok(path) => {
                state.section_optional_fields = vec![value.pointer("/credentialSubject").unwrap().clone()];
                // state.section_optional_fields = path.query(&value).all().into_iter().cloned().collect();
                // state.section_optional_fields = path.query(&state.section_map.into()).all().into_iter().cloned().collect();
                
                trace_dbg!(value.pointer("/credentialSubject").unwrap().clone());
                trace_dbg!(&state.section_optional_fields);
                trace_dbg!("hiero");
            }
            Err(_) => {}
        }
        
        // for path in &state.optional_fields {
        //     // Remove the leading '/' and split the path
        //     if let Some(stripped_path) = path.0.strip_prefix('/') {
        //         if let Some(first_section) = stripped_path.split('/').next() {
        //             let first_section_str = first_section.to_string();
        //             if !sections.contains(&first_section_str) {
        //                 sections.push(first_section_str);
        //             }
        //         }
        //     }
        // }
        // state.section_optional_fields = sections.into_iter().map(|section| (section, "".to_string())).collect();
    }
}

pub fn render_lost_data_p3(area: Rect, buf: &mut Buffer, state: &mut AppState) {
    // Testing
    
    let path = serde_json_path::JsonPath::parse("$['$defs'].AchievementSubject").unwrap();
    let node = path.query(&state.schema).all();

    // trace_dbg!(&state.selected_optional_path);
    // trace_dbg!(&node);

    get_section_output_fields(state);
    // End testing


    Block::new()
        .title(format!("  {}  ", translate("unused_data")))
        .title_alignment(Alignment::Center)
        .borders(Borders::TOP)
        .render(area, buf);

    // Layout
    let [_title, page, bottom] =
        Layout::vertical(vec![Constraint::Length(1), Constraint::Min(0), Constraint::Length(1)]).areas(area);
    let [mut left_selector, mut right_optional_fields] =
        Layout::horizontal(vec![Constraint::Percentage(50), Constraint::Min(0)]).areas(page);
    Block::new().borders(Borders::RIGHT).render(left_selector, buf);

    // Inner blocks for margins
    left_selector = left_selector.inner(&Margin {
        vertical: 0,
        horizontal: 1,
    });
    right_optional_fields = right_optional_fields.inner(&Margin {
        vertical: 0,
        horizontal: 1,
    });

    // Store areas in state
    state.selector_area_p2_p3 = left_selector;
    state.output_fields_area_p2_p3 = right_optional_fields;

    // Highlight active area
    let mut inputfields_style = Style::default().fg(Color::Yellow).add_modifier(Modifier::ITALIC);
    let mut optionalfields_style = Style::default().fg(Color::Yellow).add_modifier(Modifier::ITALIC);
    let mut mappingoptions_style = Style::default().fg(Color::White);
    match state.p2_p3_tabs {
        P2P3Tabs::InputFields => {
            inputfields_style = Style::default().fg(Color::Yellow).add_modifier(Modifier::BOLD);
        }
        P2P3Tabs::OutputFields => {
            optionalfields_style = Style::default().fg(Color::Yellow).add_modifier(Modifier::BOLD);
        }
        P2P3Tabs::MappingOptions => {
            mappingoptions_style = Style::default().fg(Color::Yellow).add_modifier(Modifier::BOLD);
        }
        _ => {}
    }

    // Render left selector list of input fields
    let mut table_state = TableState::default().with_selected(Some(state.selected_input_field));
    let rows: Vec<Row> = state
        .input_fields
        .iter()
        .enumerate()
        .map(|(index, (key, value))| {
            let mut row = Row::new(vec![key.as_str(), value.as_str()]);
            if state
                .completed_missing_fields
                .iter()
                .any(|&(_, second)| second == index)
                || state
                    .completed_optional_fields
                    .iter()
                    .any(|&(_, second)| second == index)
            {
                row = row.style(Style::default().fg(Color::Green));
            }
            row
        })
        .collect();

    StatefulWidget::render(
        Table::new(rows, [Constraint::Percentage(50), Constraint::Percentage(50)])
            .block(Block::new())
            .header(Row::new([translate("field"), translate("value")]).style(Style::new().add_modifier(Modifier::BOLD)))
            .highlight_style(inputfields_style),
        left_selector,
        buf,
        &mut table_state,
    );

    // Render right tab containing optional fields
    // state.amount_optional_fields = state.optional_fields.len() - 2; // todo

    state.amount_optional_fields = state.section_map.len() + 1;
    state.section_map = state.section_optional_fields[0].as_object().unwrap().clone();
    let mut table_state = TableState::default().with_selected(Some(state.selected_optional_field));
    let rows: Vec<Row> = state
        .section_map
        .iter()
        .enumerate()
        .map(|(index, (key, value))| {
            let mut row = Row::new(vec![key.clone(), value.to_string().to_owned()]);
            if state.completed_optional_fields.iter().any(|&(first, _)| first == index) {
                row = row.style(Style::default().fg(Color::Green));
            }
            row
        })
        .collect();

    StatefulWidget::render(
        Table::new(rows, [Constraint::Percentage(50), Constraint::Percentage(50)])
            .block(Block::new())
            .header(
                Row::new([translate("optional_field"), translate("result_value")])
                    .style(Style::new().add_modifier(Modifier::BOLD)),
            )
            .highlight_style(optionalfields_style),
        right_optional_fields,
        buf,
        &mut table_state,
    );
    // todo: render  output results

    render_mapping_bar(bottom, buf, state, mappingoptions_style);

    if state.popup_mapping_p2_p3 {
        if state.select_mapping_option {
            render_popup_mapping(area, buf, state);
        } else {
            match state.mapping_option {
                MappingOptions::Transformations => render_popup_mapping(area, buf, state),
                MappingOptions::OneToMany => render_popup_mapping(area, buf, state), //todo
                MappingOptions::ManyToOne => render_manytoone_bar(area, buf, state), //todo
                MappingOptions::DirectCopy => {}                                     // DirectCopy
            }
        }
    }
    // Render warning if user wants to exit.
    if state.exit_warning {
        render_popup_exit_warning(area, buf);
    }
}
