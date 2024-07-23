![EBSI Logo](https://ec.europa.eu/digital-building-blocks/sites/images/logo/default-space-logo.svg)

# @cef-ebsi/vcdm2.0-attestation-schema

> EBSI Verifiable Attestation
>
> The schema defines a generic structure for any EBSI-related Verifiable Credentials according to the VCDM v2.0

The schema is published to the [Trusted Schemas Registry](https://hub.ebsi.eu/apis/pilot/trusted-schemas-registry) with the IDs:

- `0x0b6c86bd80e1e97f9d461f5310fc82120049914246002ecf0e14330dbed4f7ef` (hexadecimal)
- `zmbU2KpoDHbKg2ZC3L5Amz1wqSzSeaFy9K3JhLv17NPp` (multibase base58btc)

## Table of Contents

- [JSON Schema](#json-schema)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## JSON Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "EBSI Verifiable Attestation",
  "description": "The schema defines a generic structure for any EBSI-related Verifiable Credentials according to the VCDM v2.0",
  "type": "object",
  "properties": {
    "@context": {
      "description": "Semantic context for the issued credential. First element MUST be https://www.w3.org/ns/credentials/v2",
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri"
      },
      "contains": {
        "const": "https://www.w3.org/ns/credentials/v2"
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "id": {
      "description": "Globally unique identifier for the issued credential. It can be a UUID or another globally unique identifier.",
      "type": "string",
      "format": "uri"
    },
    "type": {
      "description": "Full type chain, used to identify the credential base types",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "issuer": {
      "description": "DID of the credential issuer",
      "oneOf": [
        {
          "type": "string",
          "format": "uri"
        },
        {
          "type": "object",
          "required": ["id"],
          "properties": {
            "id": {
              "description": "DID of the credential issuer",
              "type": "string",
              "format": "uri"
            }
          }
        }
      ]
    },
    "validFrom": {
      "description": "Defines the earliest point when the credential becomes valid.",
      "type": "string",
      "format": "date-time"
    },
    "validUntil": {
      "description": "Defines the latest point when the credential ceases to be valid.",
      "type": "string",
      "format": "date-time"
    },
    "credentialSubject": {
      "anyOf": [
        {
          "$ref": "#/$defs/credentialSubject"
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/$defs/credentialSubject"
          }
        }
      ]
    },
    "credentialStatus": {
      "description": "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension",
      "anyOf": [
        {
          "$ref": "#/$defs/credentialStatus"
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/$defs/credentialStatus"
          }
        }
      ]
    },
    "credentialSchema": {
      "description": "One or more schemas that validate the Verifiable Credential.",
      "anyOf": [
        {
          "$ref": "#/$defs/credentialSchema"
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/$defs/credentialSchema"
          }
        }
      ]
    },
    "termsOfUse": {
      "anyOf": [
        {
          "$ref": "#/$defs/termsOfUse"
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/$defs/termsOfUse"
          }
        }
      ]
    },
    "evidence": {
      "anyOf": [
        {
          "$ref": "#/$defs/evidence"
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/$defs/evidence"
          }
        }
      ]
    },
    "relatedResource": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "description": "URL the integrity information is for",
            "type": "string",
            "format": "uri"
          },
          "mediaType": {
            "description": "Expected media type for the indicated resource",
            "type": "string"
          }
        },
        "required": ["id"],
        "anyOf": [
          {
            "properties": {
              "digestSRI": {
                "description": "Digest value of Subresource Integrity",
                "type": "string"
              }
            },
            "required": ["digestSRI"]
          },
          {
            "properties": {
              "digestMultibase": {
                "description": "Digest value of multihash encoded in multibase.",
                "type": "string"
              }
            },
            "required": ["digestMultibase"]
          }
        ]
      }
    }
  },
  "required": [
    "@context",
    "id",
    "type",
    "issuer",
    "validFrom",
    "credentialSubject",
    "credentialSchema"
  ],
  "$defs": {
    "credentialSubject": {
      "description": "Defines information about the subject that is defined by the type chain",
      "type": "object",
      "properties": {
        "id": {
          "description": "Defines the DID of the subject that is described by the issued credential",
          "type": "string",
          "format": "uri"
        }
      }
    },
    "credentialStatus": {
      "description": "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension",
      "type": "object",
      "properties": {
        "id": {
          "description": "Exact identity for the credential status",
          "type": "string",
          "format": "uri"
        },
        "type": {
          "description": "Defines the revocation type extension",
          "type": "string"
        }
      },
      "required": ["id", "type"]
    },
    "credentialSchema": {
      "description": "Contains information about the credential schema on which the issued credential is based",
      "type": "object",
      "properties": {
        "id": {
          "description": "References the credential schema stored on the Trusted Schemas Registry (TSR)",
          "type": "string",
          "format": "uri"
        },
        "type": {
          "description": "Defines credential schema type",
          "type": "string"
        }
      },
      "required": ["id", "type"]
    },
    "termsOfUse": {
      "description": "Contains the terms under which the issued credential was issued",
      "type": "object",
      "properties": {
        "id": {
          "description": "Contains a URL that points to where more information about this instance of terms of use can be found.",
          "type": "string",
          "format": "uri"
        },
        "type": {
          "description": "Defines the type extension",
          "type": "string"
        }
      },
      "required": ["type"]
    },
    "evidence": {
      "type": "object",
      "properties": {
        "id": {
          "description": "If present, it MUST contain a URL that points to where more information about this instance of evidence can be found.",
          "type": "string"
        },
        "type": {
          "anyOf": [
            {
              "description": "Defines the evidence type extension",
              "type": "string"
            },
            {
              "description": "Defines the evidence type extension",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          ]
        }
      },
      "required": ["type"]
    }
  }
}
```

## Installation

```sh
# with npm
npm add @cef-ebsi/vcdm2.0-attestation-schema@1.2.0

# with Yarn
yarn add @cef-ebsi/vcdm2.0-attestation-schema@1.2.0

# with pnpm
pnpm add @cef-ebsi/vcdm2.0-attestation-schema@1.2.0
```

## Usage

The package exports the schema and its metadata as JavaScript objects:

```js
import { schema, metadata } from "@cef-ebsi/vcdm2.0-attestation-schema";

// you can now use the schema and metadata
```

In addition, the package exports a TypeScript type corresponding to the schema:

```ts
import type { EBSIVerifiableAttestation } from "@cef-ebsi/vcdm2.0-attestation-schema";
```

## License

Copyright (c) 2019 European Commission
Licensed under the EUPL, Version 1.2 or - as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.
You may obtain a copy of the Licence at:

- <https://joinup.ec.europa.eu/page/eupl-text-11-12>

Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Licence for the specific language governing permissions and limitations under the Licence.
