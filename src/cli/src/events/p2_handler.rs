use super::is_mouse_over_area;
use crate::{
    backend::{
        repository::{construct_leaf_node, merge},
        selector::selector,
    },
    state::{AppState, MappingOptions, P2P3Tabs, Pages, Transformations},
    trace_dbg,
};

use crossterm::event::{self, Event, KeyCode::*, KeyEventKind};

pub fn p2_handler(event: Event, state: &mut AppState) -> Result<bool, std::io::Error> {
    if let event::Event::Key(key) = event {
        if key.kind == KeyEventKind::Press {
            match key.code {
                Esc => {
                    // Close popup warning
                    if state.uncompleted_warning {
                        state.uncompleted_warning = false;
                    }
                    // Close popup mapping and reset scroll offsets
                    else if state.popup_mapping_p2_p3 {
                        state.popup_mapping_p2_p3 = false;
                        state.popup_offset_path = 0;
                        state.popup_offset_value = 0;
                        state.popup_offset_output_path = 0;
                        state.popup_offset_result = 0;
                    }
                    // clear mapping
                    else if state.p2_p3_tabs == P2P3Tabs::MappingOptions && !state.select_mapping_option {
                        state.select_mapping_option = true;
                        state.selected_transformations_tab = false;
                        state.selected_transformations.clear();
                        state.transformations = Transformations::LowerCase;
                        state.mapping_option = MappingOptions::DirectCopy;
                    }
                    // Close program
                    else {
                        return Ok(true);
                    }
                }
                Backspace => {
                    // Delete a selected transformation from the list of selected transformations
                    if state.selected_transformations_tab && !state.selected_transformations.is_empty() {
                        state.selected_transformations.remove(state.selected_transformation);
                        if state.selected_transformation > 0 {
                            state.selected_transformation -= 1;
                        }
                    }
                    // Delete a character from the dividers
                    else if state.p2_p3_tabs == P2P3Tabs::MappingOptions
                        && state.mapping_option == MappingOptions::OneToMany
                    {
                        state.dividers.pop();
                    }
                }
                Tab => {
                    handle_tab(state);
                }
                F(2) => {
                    // Check if inside Transformations bar on the selected_transformations tab and switch to the transformations tab
                    if state.p2_p3_tabs == P2P3Tabs::MappingOptions
                        && !state.select_mapping_option
                        && state.mapping_option == MappingOptions::Transformations
                        && state.selected_transformations_tab
                    {
                        state.selected_transformations_tab = false;
                    } else {
                        state.p2_p3_tabs.prev();
                    }
                }
                Left => {
                    handle_left(state);
                }
                Right => {
                    handle_right(state);
                }
                Up => match state.p2_p3_tabs {
                    // Scroll up through input or output fields
                    P2P3Tabs::InputFields => {
                        if state.selected_input_field > 1 {
                            state.selected_input_field -= 1;
                        }
                    }
                    P2P3Tabs::OutputFields => {
                        if state.selected_missing_field > 1 {
                            state.selected_missing_field -= 1;
                        }
                    }
                    _ => {}
                },
                Down => match state.p2_p3_tabs {
                    // Scroll down through input or output fields
                    P2P3Tabs::InputFields => {
                        if state.selected_input_field <= state.amount_input_fields {
                            state.selected_input_field += 1;
                        }
                    }
                    P2P3Tabs::OutputFields => {
                        if state.selected_missing_field <= state.amount_missing_fields {
                            state.selected_missing_field += 1;
                        }
                    }
                    _ => {}
                },
                Enter => {
                    handle_enter(state);
                }
                Char(char) => {
                    if state.popup_mapping_p2_p3 && state.mapping_option == MappingOptions::OneToMany {
                        state.dividers.push(char);
                    }
                }
                _ => {}
            }
        }
    }
    if let event::Event::Mouse(mouse_event) = event {
        match mouse_event.kind {
            event::MouseEventKind::ScrollDown => {
                // Scroll through input/output fields
                if !state.popup_mapping_p2_p3 {
                    if is_mouse_over_area(state.selector_area_p2_p3, mouse_event.column, mouse_event.row) {
                        if state.selected_input_field <= state.amount_input_fields {
                            state.selected_input_field += 1;
                        }
                    } else if is_mouse_over_area(state.output_fields_area_p2_p3, mouse_event.column, mouse_event.row) {
                        if state.selected_missing_field <= state.amount_missing_fields {
                            state.selected_missing_field += 1;
                        }
                    }
                }
                // Scroll within tabs of the view popup
                else {
                    if is_mouse_over_area(state.popup_path_area_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_path < state.popup_amount_lines_path as u16 {
                            state.popup_offset_path += 1;
                        }
                    } else if is_mouse_over_area(state.popup_value_area_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_value < state.popup_amount_lines_value as u16 {
                            state.popup_offset_value += 1;
                        }
                    } else if is_mouse_over_area(state.popup_output_path_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_output_path < state.popup_amount_lines_output_path as u16 {
                            state.popup_offset_output_path += 1;
                        }
                    } else if is_mouse_over_area(state.popup_output_result_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_result < state.popup_amount_lines_result as u16 {
                            state.popup_offset_result += 1;
                        }
                    }
                }
            }
            event::MouseEventKind::ScrollUp => {
                // Scroll through input/output fields
                if !state.popup_mapping_p2_p3 {
                    if is_mouse_over_area(state.selector_area_p2_p3, mouse_event.column, mouse_event.row) {
                        if state.selected_input_field > 1 {
                            state.selected_input_field -= 1;
                        }
                    } else if is_mouse_over_area(state.output_fields_area_p2_p3, mouse_event.column, mouse_event.row) {
                        if state.selected_missing_field > 1 {
                            state.selected_missing_field -= 1;
                        }
                    }
                }
                // Scroll within tabs of the view popup
                else {
                    if is_mouse_over_area(state.popup_path_area_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_path > 0 {
                            state.popup_offset_path -= 1;
                        }
                    } else if is_mouse_over_area(state.popup_value_area_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_value > 0 {
                            state.popup_offset_value -= 1;
                        }
                    } else if is_mouse_over_area(state.popup_output_path_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_output_path > 0 {
                            state.popup_offset_output_path -= 1;
                        }
                    } else if is_mouse_over_area(state.popup_output_result_p2, mouse_event.column, mouse_event.row) {
                        if state.popup_offset_result > 0 {
                            state.popup_offset_result -= 1;
                        }
                    }
                }
            }
            event::MouseEventKind::Up(_) => {
                if is_mouse_over_area(state.complete_button, mouse_event.column, mouse_event.row) {
                    trace_dbg!(state.missing_data_fields.len() - 1);
                    trace_dbg!(state.completed_missing_fields.len());
                    if state.missing_data_fields.len() - 1 == state.completed_missing_fields.len() {
                        state.popup_mapping_p2_p3 = false;
                        state.transformations = Transformations::LowerCase;
                        state.selected_transformations_tab = false;
                        state.selected_input_field = 1;
                        state.select_mapping_option = true;
                        state.selected_transformation = 0;
                        state.selected_transformations.clear();
                        state.page.next();
                    } else {
                        state.uncompleted_warning = true;
                    }
                } else if is_mouse_over_area(state.view_button, mouse_event.column, mouse_event.row) {
                    state.popup_mapping_p2_p3 = true;
                } else if is_mouse_over_area(state.clear_button, mouse_event.column, mouse_event.row) {
                    // Close popup if open.
                    if state.popup_mapping_p2_p3 {
                        state.popup_mapping_p2_p3 = false;
                    }
                    // If mapping options have been chosen, clear mapping options.
                    else if !state.select_mapping_option {
                        state.transformations = Transformations::LowerCase;
                        state.selected_transformations.clear();
                        state.mapping_option = MappingOptions::DirectCopy;
                        state.selected_transformations_tab = false;
                        state.select_mapping_option = true;
                    }
                    // Clear selected missing field
                    else {
                        // todo: no way yet to correctly clear the completed input fields (one field can be used for multipe output fields)
                        state.missing_data_fields[state.selected_missing_field].1.clear();
                        state
                            .completed_missing_fields
                            .retain(|&x| x != state.selected_missing_field);

                        state.transformations = Transformations::LowerCase;
                        state.selected_transformations.clear();
                        state.mapping_option = MappingOptions::DirectCopy;
                        state.selected_transformations_tab = false;
                        state.select_mapping_option = true;
                    }
                } else if is_mouse_over_area(state.confirm_button, mouse_event.column, mouse_event.row) {
                    save_result(state);
                } else if is_mouse_over_area(state.prev_page_button, mouse_event.column, mouse_event.row) {
                    if state.popup_mapping_p2_p3 {
                        state.popup_mapping_p2_p3 = false;
                    } else if state.uncompleted_warning {
                        state.uncompleted_warning = false;
                    } else {
                        state.select_mapping_option = true;
                        state.selected_transformation = 0;
                        state.selected_transformations.clear();
                        state.transformations = Transformations::LowerCase;

                        state.page.prev();
                    }
                } else if !is_mouse_over_area(state.popup_path_area_p2, mouse_event.column, mouse_event.row)
                    && !is_mouse_over_area(state.popup_value_area_p2, mouse_event.column, mouse_event.row)
                {
                    state.popup_mapping_p2_p3 = false;
                    state.popup_offset_path = 0;
                    state.popup_offset_value = 0;
                } else if is_mouse_over_area(state.prev_page_button, mouse_event.column, mouse_event.row) {
                    state.page.prev();
                } else if !is_mouse_over_area(state.popup_path_area_p2, mouse_event.column, mouse_event.row)
                    && !is_mouse_over_area(state.popup_value_area_p2, mouse_event.column, mouse_event.row)
                {
                    state.popup_mapping_p2_p3 = false;
                    state.popup_offset_path = 0;
                    state.popup_offset_value = 0;
                }
            }
            _ => {}
        }
    }

    Ok(false)
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

    let mut json_value = state.repository.get_mut(&output_format).unwrap();

    let mut leaf_node = construct_leaf_node(&pointer);

    leaf_node
        .pointer_mut(&pointer)
        .map(|value| *value = serde_json::from_str(&source_value).unwrap());
    trace_dbg!(&leaf_node);

    merge(&mut json_value, leaf_node);
    trace_dbg!(json_value);
}

/////     HELPERS     /////

// todo: move to general file for both P2 and P3 and substitute as many events as possible with helper functions to make clear which are the same between P2 & P3
pub fn handle_tab(state: &mut AppState) {
    // Check if inside Transformations bar in the transformations tab and switch to the selected transformations tab
    if state.p2_p3_tabs == P2P3Tabs::MappingOptions
        && !state.select_mapping_option
        && state.mapping_option == MappingOptions::Transformations
        && !state.selected_transformations_tab
    {
        state.selected_transformations_tab = true;
    }
    // Check if inside Transformation bar in the selected transformations tab and switch to button
    else if state.p2_p3_tabs == P2P3Tabs::MappingOptions
        && !state.select_mapping_option
        && state.mapping_option == MappingOptions::Transformations
        && state.selected_transformations_tab
    {
        state.p2_p3_tabs.next();
    }
    // Check if right tab of Transformations bar is still selected and switch to the left when tabbing to the bar from output_fields
    else if state.p2_p3_tabs == P2P3Tabs::OutputFields && state.selected_transformations_tab {
        state.selected_transformations_tab = false;
        state.p2_p3_tabs.next();
    } else {
        state.p2_p3_tabs.next();
        //state.selected_transformations_tab = false;
    }
}

pub fn handle_left(state: &mut AppState) {
    // Move through mapping options bar, loops.
    if state.p2_p3_tabs == P2P3Tabs::MappingOptions && state.select_mapping_option {
        state.mapping_option.prev();
    }
    // Move through transformation bar, loops
    else if state.p2_p3_tabs == P2P3Tabs::MappingOptions
        && !state.select_mapping_option
        && !state.selected_transformations_tab
    {
        state.transformations.prev();
    }
    // Move through selected transformations bar, loops
    else if state.p2_p3_tabs == P2P3Tabs::MappingOptions {
        if state.selected_transformation > 0 {
            state.selected_transformation -= 1;
        } else if state.selected_transformations.len() > 0 {
            state.selected_transformation = state.selected_transformations.len() - 1;
        }
    }
    // move between input tab and output tab
    else if state.p2_p3_tabs == P2P3Tabs::OutputFields && !state.popup_mapping_p2_p3 {
        state.p2_p3_tabs = P2P3Tabs::InputFields;
    }
}

pub fn handle_right(state: &mut AppState) {
    // Move through mapping options bar, loops.
    if state.p2_p3_tabs == P2P3Tabs::MappingOptions && state.select_mapping_option {
        state.mapping_option.next();
    }
    // Move through transformation bar, loops
    else if state.p2_p3_tabs == P2P3Tabs::MappingOptions
        && !state.select_mapping_option
        && !state.selected_transformations_tab
    {
        state.transformations.next();
    }
    // Move through selected transformations bar, loops
    else if state.p2_p3_tabs == P2P3Tabs::MappingOptions
        && state.selected_transformations_tab
        && !state.selected_transformations.is_empty()
    {
        if state.selected_transformation < state.selected_transformations.len() - 1 {
            state.selected_transformation += 1;
        } else {
            state.selected_transformation = 0;
        }
    }
    // Move between input tab and output tab
    else if state.p2_p3_tabs == P2P3Tabs::InputFields && !state.popup_mapping_p2_p3 {
        state.p2_p3_tabs = P2P3Tabs::OutputFields;
    }
}

fn handle_enter(state: &mut AppState) {
    // Close warning, reset values and move to next page
    if state.uncompleted_warning {
        state.uncompleted_warning = false;
        state.popup_mapping_p2_p3 = false;
        state.selected_input_field = 1;
        state.selected_transformation = 0;
        state.selected_transformations_tab = false;
        state.selected_transformations.clear();
        state.select_mapping_option = true;
        state.p2_p3_tabs = P2P3Tabs::InputFields;
        state.page.next();
    } else {
        match state.p2_p3_tabs {
            P2P3Tabs::MappingOptions => {
                // Switch from mapping options tab to respective tab
                if state.select_mapping_option {
                    // Fast-track mapping, Copy to output result value and reset values
                    if state.mapping_option == MappingOptions::DirectCopy {
                        selector(state);
                        state.selected_transformations_tab = false;
                        state.popup_mapping_p2_p3 = false;
                        state.select_mapping_option = true;
                        state.selected_transformations.clear();
                        state.popup_offset_path = 0;
                        state.popup_offset_value = 0;
                        state.p2_p3_tabs = P2P3Tabs::InputFields;

                        // Only push input field and missing field if they are not already in the completed fields
                        if !state.completed_input_fields.contains(&state.selected_input_field) {
                            state.completed_input_fields.push(state.selected_input_field);
                        }
                        if !state.completed_missing_fields.contains(&state.selected_missing_field) {
                            state.completed_missing_fields.push(state.selected_missing_field);
                        }

                        state.missing_data_fields[state.selected_missing_field].1 =
                            state.candidate_data_value.clone().unwrap();

                        update_repository(state);
                        
                        // Move active fields to next field
                        if state.selected_input_field == state.input_fields.len() - 1 {
                            state.selected_input_field = 1;
                        } else {
                            state.selected_input_field += 1;
                        }

                        if state.selected_missing_field == state.missing_data_fields.len() - 1 {
                            state.selected_missing_field = 1;
                        } else {
                            state.selected_missing_field += 1;
                        }

                    } else {
                        state.select_mapping_option = false;
                    }
                }
                // Select a transformation
                else if state.mapping_option == MappingOptions::Transformations && !state.selected_transformations_tab && !state.selected_transformations.contains(&state.transformations) {
                    state.selected_transformations.push(state.transformations);
                }
                // Complete a mapping from the view popup
                else if state.popup_mapping_p2_p3 {
                    state.popup_mapping_p2_p3 = false;
                    state.selected_transformations_tab = false;
                    state.select_mapping_option = true;
                    state.selected_transformations.clear();
                    state.popup_offset_path = 0;
                    state.popup_offset_value = 0;
                    state.p2_p3_tabs = P2P3Tabs::InputFields;

                    // Only push input field and missing field if they are not already in the completed fields
                    if !state.completed_input_fields.contains(&state.selected_input_field) {
                        state.completed_input_fields.push(state.selected_input_field);
                    }
                    if !state.completed_missing_fields.contains(&state.selected_missing_field) {
                        state.completed_missing_fields.push(state.selected_missing_field);
                    }

                    selector(state);
                    state.missing_data_fields[state.selected_missing_field].1 =
                        state.candidate_data_value.clone().unwrap();

                    // Move active fields to next field
                    if state.selected_input_field == state.input_fields.len() - 1 {
                        state.selected_input_field = 1;
                    } else {
                        state.selected_input_field += 1;
                    }

                    if state.selected_missing_field == state.missing_data_fields.len() - 1 {
                        state.selected_missing_field = 1;
                    } else {
                        state.selected_missing_field += 1;
                    }

                    update_repository(state);
                }
                // If transformation(s) selected open the view popup to show the result.
                else if state.selected_transformations_tab {
                    state.popup_mapping_p2_p3 = true;
                }
            }
            P2P3Tabs::Clear => {
                // Close popup if open.
                if state.popup_mapping_p2_p3 {
                    state.popup_mapping_p2_p3 = false;
                }
                // If mapping options have been chosen, clear mapping options.
                else if !state.select_mapping_option {
                    state.transformations = Transformations::LowerCase;
                    state.selected_transformations.clear();
                    state.mapping_option = MappingOptions::DirectCopy;
                    state.selected_transformations_tab = false;
                    state.select_mapping_option = true;
                }
                // Clear selected missing field
                else {
                    state.missing_data_fields[state.selected_missing_field].1.clear();

                    state.transformations = Transformations::LowerCase;
                    state.selected_transformations.clear();
                    state.mapping_option = MappingOptions::DirectCopy;
                    state.selected_transformations_tab = false;
                    state.select_mapping_option = true;
                }
            }
            P2P3Tabs::View => {
                // Open Popup
                state.popup_mapping_p2_p3 = true;
            }
            _ => {
                if !state.popup_mapping_p2_p3 && state.page != Pages::UnusedDataP3 {
                    state.p2_p3_tabs.next();
                } else {
                    state.popup_mapping_p2_p3 = false;
                    state.p2_p3_tabs.next();
                }
            }
        }
    }
}

pub fn save_result(state: &mut AppState) {

    state.popup_mapping_p2_p3 = false;
    state.selected_transformations_tab = false;
    state.select_mapping_option = true;
    state.selected_transformations.clear();
    state.popup_offset_path = 0;
    state.popup_offset_value = 0;
    state.p2_p3_tabs = P2P3Tabs::InputFields;

    if !state.completed_input_fields.contains(&state.selected_input_field) {
        state.completed_input_fields.push(state.selected_input_field);
    }
    if !state.completed_missing_fields.contains(&state.selected_missing_field) {
        state.completed_missing_fields.push(state.selected_missing_field);
    }
    state.missing_data_fields[state.selected_missing_field].1 =
        state.candidate_data_value.clone().unwrap();

    update_repository(state);

    trace_dbg!(state.candidate_data_value.as_ref().unwrap());
    trace_dbg!(state.missing_data_fields.clone()[state.selected_missing_field].to_owned());    
}
