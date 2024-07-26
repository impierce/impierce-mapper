use crate::state::AppState;
use super::schema_fields::get_all_fields;

use std::vec;

pub fn preload_p3(state: &mut AppState) {
    state.optional_fields = [
        vec![("".to_string(), "".to_string())],
        get_all_fields().into_iter()
        .map(|pointer| (pointer, "".to_string()))
        .collect(),
    ]
    .concat();
}
