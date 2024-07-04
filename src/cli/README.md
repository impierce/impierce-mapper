OpenBadges and ELM Converter
This project is a command-line application written in Rust that converts JSON files between the OpenBadges v3 standard and the ELM standard. The application utilizes the ratatui and crossterm libraries to create a terminal user interface for managing the conversion process. Future updates will add support for additional standards.

Features
- Converts JSON files from OpenBadges v3 to the ELM standard and vice versa.
- Provides a terminal user interface for managing the conversion process.
- Mapping files developed and provided by DESM.
- Supports saving and using your own custom mappings.
- Multi-language support with i18n.

Requirements
- Rust (1.56.0 or later)
- Cargo (Rust package manager)

Installation
Clone the repository:
https://github.com/impierce/impierce-mapper.git

Build the project:
cd to the root folder and run `cargo build`

Usage
Prepare your JSON files:

Ensure you have the paths to:
- The input file, which will be converted.
- The output path, where the result will be saved.
- Your own mapping file if desired, otherwise the default provided by DESM will be used.
- The custom mapping file if desired, which will be created in the given location. This file saves all the extra manual mappings which were performed for later usage. This can then be used in the step above as your own mapping file.
  
Run the application:

`cargo run`
Use the terminal UI to navigate through the options and perform the conversion.

Example

input_path: res/elm_example.json
mapping_path: res/mapping_empty.json
output_path: res/output_credential.json
custom_mapping_path: res/custom_mapping.json
These paths can be modified in the AppState struct in main.rs.


Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

Acknowledgements
Thanks to the developers of ratatui and crossterm for their excellent libraries.
Multi-language support provided by rust-i18n.
