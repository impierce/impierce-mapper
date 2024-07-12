use serde::{Deserialize, Serialize};
use serde_json::Value;

#[allow(non_camel_case_types)]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum OneToOne {
    copy,
    toLowerCase,
    toUpperCase,
    slice,
}

impl OneToOne {
    pub fn apply(&self, value: Value) -> Value {
        match self {
            OneToOne::copy => value,
            OneToOne::toLowerCase => {
                if let Value::String(s) = value {
                    Value::String(s.to_lowercase())
                } else {
                    value
                }
            }
            OneToOne::toUpperCase => {
                if let Value::String(s) = value {
                    Value::String(s.to_uppercase())
                } else {
                    value
                }
            }
            _ => value,
        }
    }
}

#[allow(non_camel_case_types)]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum OneToMany {
    split,
}

#[allow(non_camel_case_types)]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum ManyToOne {
    concat,
}

impl ManyToOne {
    pub fn apply(&self, values: Vec<Value>) -> Value {
        match self {
            ManyToOne::concat => {
                let mut s = String::new();
                for value in values {
                    if let Value::String(string) = value {
                        s.push_str(&string);
                    }
                }
                Value::String(s)
            }
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Transformation {
    OneToOne {
        type_: OneToOne,
        source: DataLocation,
        destination: DataLocation,
    },
    OneToMany {
        type_: OneToMany,
        source: DataLocation,
        destinations: Vec<DataLocation>,
    },
    ManyToOne {
        type_: ManyToOne,
        sources: Vec<DataLocation>,
        destination: DataLocation,
    },
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DataLocation {
    pub format: String,
    pub path: String,
}
