export const metadata = {
  vcdm: "2.0",
  id: {
    base16:
      "0x0b6c86bd80e1e97f9d461f5310fc82120049914246002ecf0e14330dbed4f7ef",
    multibase_base58btc: "zmbU2KpoDHbKg2ZC3L5Amz1wqSzSeaFy9K3JhLv17NPp",
  },
  verification: "Documents",
  context: "General",
};
export const schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "EBSI Verifiable Attestation",
  description:
    "The schema defines a generic structure for any EBSI-related Verifiable Credentials according to the VCDM v2.0",
  type: "object",
  properties: {
    "@context": {
      description:
        "Semantic context for the issued credential. First element MUST be https://www.w3.org/ns/credentials/v2",
      type: "array",
      items: { type: "string", format: "uri" },
      contains: { const: "https://www.w3.org/ns/credentials/v2" },
      minItems: 1,
      uniqueItems: true,
    },
    id: {
      description:
        "Globally unique identifier for the issued credential. It can be a UUID or another globally unique identifier.",
      type: "string",
      format: "uri",
    },
    type: {
      description:
        "Full type chain, used to identify the credential base types",
      type: "array",
      items: { type: "string" },
    },
    issuer: {
      description: "DID of the credential issuer",
      oneOf: [
        { type: "string", format: "uri" },
        {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              description: "DID of the credential issuer",
              type: "string",
              format: "uri",
            },
          },
        },
      ],
    },
    validFrom: {
      description:
        "Defines the earliest point when the credential becomes valid.",
      type: "string",
      format: "date-time",
    },
    validUntil: {
      description:
        "Defines the latest point when the credential ceases to be valid.",
      type: "string",
      format: "date-time",
    },
    credentialSubject: {
      anyOf: [
        { $ref: "#/$defs/credentialSubject" },
        { type: "array", items: { $ref: "#/$defs/credentialSubject" } },
      ],
    },
    credentialStatus: {
      description:
        "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension",
      anyOf: [
        { $ref: "#/$defs/credentialStatus" },
        { type: "array", items: { $ref: "#/$defs/credentialStatus" } },
      ],
    },
    credentialSchema: {
      description:
        "One or more schemas that validate the Verifiable Credential.",
      anyOf: [
        { $ref: "#/$defs/credentialSchema" },
        { type: "array", items: { $ref: "#/$defs/credentialSchema" } },
      ],
    },
    termsOfUse: {
      anyOf: [
        { $ref: "#/$defs/termsOfUse" },
        { type: "array", items: { $ref: "#/$defs/termsOfUse" } },
      ],
    },
    evidence: {
      anyOf: [
        { $ref: "#/$defs/evidence" },
        { type: "array", items: { $ref: "#/$defs/evidence" } },
      ],
    },
    relatedResource: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            description: "URL the integrity information is for",
            type: "string",
            format: "uri",
          },
          mediaType: {
            description: "Expected media type for the indicated resource",
            type: "string",
          },
        },
        required: ["id"],
        anyOf: [
          {
            properties: {
              digestSRI: {
                description: "Digest value of Subresource Integrity",
                type: "string",
              },
            },
            required: ["digestSRI"],
          },
          {
            properties: {
              digestMultibase: {
                description: "Digest value of multihash encoded in multibase.",
                type: "string",
              },
            },
            required: ["digestMultibase"],
          },
        ],
      },
    },
  },
  required: [
    "@context",
    "id",
    "type",
    "issuer",
    "validFrom",
    "credentialSubject",
    "credentialSchema",
  ],
  $defs: {
    credentialSubject: {
      description:
        "Defines information about the subject that is defined by the type chain",
      type: "object",
      properties: {
        id: {
          description:
            "Defines the DID of the subject that is described by the issued credential",
          type: "string",
          format: "uri",
        },
      },
    },
    credentialStatus: {
      description:
        "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension",
      type: "object",
      properties: {
        id: {
          description: "Exact identity for the credential status",
          type: "string",
          format: "uri",
        },
        type: {
          description: "Defines the revocation type extension",
          type: "string",
        },
      },
      required: ["id", "type"],
    },
    credentialSchema: {
      description:
        "Contains information about the credential schema on which the issued credential is based",
      type: "object",
      properties: {
        id: {
          description:
            "References the credential schema stored on the Trusted Schemas Registry (TSR)",
          type: "string",
          format: "uri",
        },
        type: { description: "Defines credential schema type", type: "string" },
      },
      required: ["id", "type"],
    },
    termsOfUse: {
      description:
        "Contains the terms under which the issued credential was issued",
      type: "object",
      properties: {
        id: {
          description:
            "Contains a URL that points to where more information about this instance of terms of use can be found.",
          type: "string",
          format: "uri",
        },
        type: { description: "Defines the type extension", type: "string" },
      },
      required: ["type"],
    },
    evidence: {
      type: "object",
      properties: {
        id: {
          description:
            "If present, it MUST contain a URL that points to where more information about this instance of evidence can be found.",
          type: "string",
        },
        type: {
          anyOf: [
            {
              description: "Defines the evidence type extension",
              type: "string",
            },
            {
              description: "Defines the evidence type extension",
              type: "array",
              items: { type: "string" },
            },
          ],
        },
      },
      required: ["type"],
    },
  },
};
export const examples = {
  complexAttestation: {
    "@context": ["https://www.w3.org/ns/credentials/v2"],
    id: "urn:uuid:003a1dd8-a5d2-42ef-8182-e921c0a9f2cd",
    type: ["VerifiableCredential", "VerifiableAttestation"],
    issuer: {
      id: "did:ebsi:ziDnioxYYLW1a3qUbqTFz4W",
      type: "organisation",
      legalName: { en: "some legal name", fr: "un nom légal" },
      eIDASIdentifier: {
        id: "http://example.org/126839",
        type: "LegalIdentifier",
        notation: "126839",
        spatial: {
          id: "http://publications.europa.eu/resource/authority/country/FRA",
          type: "Concept",
          inScheme: {
            id: "http://publications.europa.eu/resource/authority/country",
            type: "ConceptScheme",
          },
        },
      },
    },
    validFrom: "2023-01-01T00:00:00Z",
    validUntil: "2025-01-01T00:00:00Z",
    credentialSubject: [
      {
        type: "did",
        id: "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbnTvvSLAcNJvfNeLNuB9Y3Mbhus5btx3CBNknmhSStgGbqhMkqfWNSYZ5Vd1A8xQdD948jQSEjShYE1SFe1wZSgsw5S4v6sfHVV2p6waDwh9hCjdWdjFUo3nyU1rYLbuZxg",
      },
      {
        type: "person",
        birthName: { en: "Alice" },
        familyName: { en: "Wonderland" },
        fullName: { en: "Alice Wonderland" },
      },
    ],
    credentialSchema: [
      {
        type: "JsonSchema",
        id: "https://api-test.ebsi.eu/trusted-schemas-registry/v3/schemas/0xff4f1fa4f0efd4306a218f669c7482d8cfcc7a13ba44f34af69f41889704002a",
      },
      {
        type: "ShaclValidator2017",
        id: "http://data.europa.eu/snb/model/ap/edc-generic-no-cv",
      },
    ],
    relatedResource: [
      {
        id: "https://www.w3.org/ns/credentials/v2",
        mediaType: "application/ld+json",
        digestSRI:
          "sha384-lHKDHh0msc6pRx8PhDOMkNtSI8bOfsp4giNbUrw71nXXLf13nTqNJoRp3Nx+ArVK",
        digestMultibase:
          "moLay0ut7BUL5IfvPTaE2QhqrtH5cU3mrf4fQb/MhrH5NhGh+oDwdoqE0AynGRjFJ",
      },
    ],
  },
  evidenceExample: {
    "@context": ["https://www.w3.org/ns/credentials/v2"],
    id: "urn:uuid:003a1dd8-a5d2-42ef-8182-e921c0a9f2cd",
    type: ["VerifiableCredential", "VerifiableAttestation"],
    issuer: "did:ebsi:ziDnioxYYLW1a3qUbqTFz4W",
    validFrom: "2023-01-01T00:00:00Z",
    validUntil: "2025-01-01T00:00:00Z",
    credentialSubject: {
      id: "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbnTvvSLAcNJvfNeLNuB9Y3Mbhus5btx3CBNknmhSStgGbqhMkqfWNSYZ5Vd1A8xQdD948jQSEjShYE1SFe1wZSgsw5S4v6sfHVV2p6waDwh9hCjdWdjFUo3nyU1rYLbuZxg",
    },
    credentialSchema: [
      {
        id: "https://api-test.ebsi.eu/trusted-schemas-registry/v3/schemas/0xff4f1fa4f0efd4306a218f669c7482d8cfcc7a13ba44f34af69f41889704002a",
        type: "JsonSchema",
      },
    ],
    evidence: { type: ["CustomType"] },
    relatedResource: [
      {
        id: "https://www.w3.org/ns/credentials/v2",
        mediaType: "application/ld+json",
        digestSRI:
          "sha384-lHKDHh0msc6pRx8PhDOMkNtSI8bOfsp4giNbUrw71nXXLf13nTqNJoRp3Nx+ArVK",
      },
    ],
  },
  genericAttestation: {
    "@context": ["https://www.w3.org/ns/credentials/v2"],
    id: "urn:uuid:003a1dd8-a5d2-42ef-8182-e921c0a9f2cd",
    type: ["VerifiableCredential", "VerifiableAttestation"],
    issuer: "did:ebsi:ziDnioxYYLW1a3qUbqTFz4W",
    validFrom: "2023-01-01T00:00:00Z",
    validUntil: "2025-01-01T00:00:00Z",
    credentialSubject: {
      id: "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbnTvvSLAcNJvfNeLNuB9Y3Mbhus5btx3CBNknmhSStgGbqhMkqfWNSYZ5Vd1A8xQdD948jQSEjShYE1SFe1wZSgsw5S4v6sfHVV2p6waDwh9hCjdWdjFUo3nyU1rYLbuZxg",
    },
    credentialStatus: [
      { id: "https://essif.europa.eu/status/45", type: "AnyExtension" },
    ],
    credentialSchema: [
      {
        id: "https://api-test.ebsi.eu/trusted-schemas-registry/v3/schemas/0xff4f1fa4f0efd4306a218f669c7482d8cfcc7a13ba44f34af69f41889704002a",
        type: "JsonSchema",
      },
    ],
    evidence: { type: "CustomType" },
    relatedResource: [
      {
        id: "https://www.w3.org/ns/credentials/v2",
        mediaType: "application/ld+json",
        digestMultibase:
          "moLay0ut7BUL5IfvPTaE2QhqrtH5cU3mrf4fQb/MhrH5NhGh+oDwdoqE0AynGRjFJ",
      },
    ],
  },
  verifiableAuthorisationOnboard: {
    "@context": ["https://www.w3.org/ns/credentials/v2"],
    id: "urn:uuid:08e26d22-8dca-4558-9c14-6e7aa7275b9b",
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "VerifiableAuthorisationToOnboard",
    ],
    issuer: "did:ebsi:ziDnioxYYLW1a3qUbqTFz4W",
    validFrom: "2023-01-01T00:00:00Z",
    validUntil: "2025-01-01T00:00:00Z",
    credentialSubject: { id: "did:ebsi:zdPj1GPXjfERXxXPE1YTYdJ" },
    credentialSchema: {
      id: "https://api-test.ebsi.eu/trusted-schemas-registry/v2/schemas/0x23039e6356ea6b703ce672e7cfac0b42765b150f63df78e2bd18ae785787f6a2",
      type: "JsonSchema",
    },
  },
};
