use crate::{
    backend::{
        jsonpointer::{JsonPath, JsonPointer},
        repository::Repository,
        transformations::{DataLocation, OneToOne, Transformation},
    },
    state::{AppState, Transformations},
    trace_dbg,
};

pub fn selector(state: &mut AppState) {
    let selected_transformations = [
        vec![Transformations::DirectCopy],
        state.selected_transformations.clone(),
    ]
    .concat();
    // This function shows the outcome of the transformation selected in the togglebar not the outcome of the Vec of selected transformations: state.selected_transformations.
    for transformation in selected_transformations.iter() {
        trace_dbg!(transformation);

        let (input_format, output_format) = (state.mapping.input_format(), state.mapping.output_format());

        let (source_pointer, _source_value) = state.input_fields[state.selected_input_field].clone();

        let pointer = state.missing_data_fields[state.selected_missing_field].0.clone();
        let destination_path: JsonPath = JsonPointer(pointer.clone()).into();

        let mut temp_repository = Repository::from(state.repository.clone());

        let transformation = match transformation {
            Transformations::LowerCase => Transformation::OneToOne {
                type_: OneToOne::toLowerCase,
                source: DataLocation {
                    format: input_format.clone(),
                    path: JsonPath::from(JsonPointer(source_pointer)).to_string(),
                },
                destination: DataLocation {
                    format: output_format.clone(),
                    path: destination_path.to_string(),
                },
            },
            Transformations::UpperCase => Transformation::OneToOne {
                type_: OneToOne::toUpperCase,
                source: DataLocation {
                    format: input_format.clone(),
                    path: JsonPath::from(JsonPointer(source_pointer)).to_string(),
                },
                destination: DataLocation {
                    format: output_format.clone(),
                    path: destination_path.to_string(),
                },
            },
            // todo: This clippy warning is known, this body is for 'DirectCopy' and all others until they
            // get their own branches
            Transformations::DirectCopy | _ => Transformation::OneToOne {
                type_: OneToOne::copy,
                source: DataLocation {
                    format: input_format.clone(),
                    path: JsonPath::from(JsonPointer(source_pointer)).to_string(),
                },
                destination: DataLocation {
                    format: output_format.clone(),
                    path: destination_path.to_string(),
                },
            },
        };

        temp_repository.apply_transformation(transformation.clone());
        state.mappings.push(transformation);

        //trace_dbg!(&pointer);
        let candidate_data_value = temp_repository.get(&output_format).unwrap().pointer(&pointer).unwrap();

        state.candidate_data_value = Some(candidate_data_value.to_string());
    }
}
