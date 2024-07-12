use std::ops::Deref;

#[derive(Debug)]
// TODO: add validation
pub struct JsonPath(pub String);

impl Deref for JsonPath {
    type Target = String;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Debug)]
pub struct JsonPointer(pub String);

impl Deref for JsonPointer {
    type Target = String;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<JsonPointer> for JsonPath {
    fn from(val: JsonPointer) -> JsonPath {
        JsonPath(format!("${}", val.replace('/', ".")))
    }
}

impl TryFrom<JsonPath> for JsonPointer {
    type Error = String;

    fn try_from(value: JsonPath) -> Result<Self, Self::Error> {
        Ok(JsonPointer(value.0.trim_start_matches('$').replace('.', "/")))
    }
}
