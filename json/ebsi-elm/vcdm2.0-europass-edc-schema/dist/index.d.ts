export declare const metadata: {
  readonly vcdm: "2.0";
  readonly id: {
    readonly base16: "0x4d40d34533797f62a8a03d7c4a4cd7827d289fadf1bfa582ec0ecfedbe55a6e0";
    readonly multibase_base58btc: "z6CZj2KLNFkFqeDrJ9h27Rgc2RhszhFRHJ5QTJ3W8p6B1";
  };
  readonly verification: "Documents";
  readonly context: "Education and lifelong learning";
};
export declare const schema: {
  readonly $schema: "https://json-schema.org/draft/2020-12/schema";
  readonly title: "Europass EDC credential";
  readonly description: "Schema for EDC credential based on ELM 3.2";
  readonly type: "object";
  readonly allOf: readonly [
    {
      readonly $schema: "https://json-schema.org/draft/2020-12/schema";
      readonly title: "EBSI Verifiable Attestation";
      readonly description: "The schema defines a generic structure for any EBSI-related Verifiable Credentials according to the VCDM v2.0";
      readonly type: "object";
      readonly properties: {
        readonly "@context": {
          readonly description: "Semantic context for the issued credential. First element MUST be https://www.w3.org/ns/credentials/v2";
          readonly type: "array";
          readonly items: {
            readonly type: "string";
            readonly format: "uri";
          };
          readonly contains: {
            readonly const: "https://www.w3.org/ns/credentials/v2";
          };
          readonly minItems: 1;
          readonly uniqueItems: true;
        };
        readonly id: {
          readonly description: "Globally unique identifier for the issued credential. It can be a UUID or another globally unique identifier.";
          readonly type: "string";
          readonly format: "uri";
        };
        readonly type: {
          readonly description: "Full type chain, used to identify the credential base types";
          readonly type: "array";
          readonly items: {
            readonly type: "string";
          };
        };
        readonly issuer: {
          readonly description: "DID of the credential issuer";
          readonly oneOf: readonly [
            {
              readonly type: "string";
              readonly format: "uri";
            },
            {
              readonly type: "object";
              readonly required: readonly ["id"];
              readonly properties: {
                readonly id: {
                  readonly description: "DID of the credential issuer";
                  readonly type: "string";
                  readonly format: "uri";
                };
              };
            },
          ];
        };
        readonly validFrom: {
          readonly description: "Defines the earliest point when the credential becomes valid.";
          readonly type: "string";
          readonly format: "date-time";
        };
        readonly validUntil: {
          readonly description: "Defines the latest point when the credential ceases to be valid.";
          readonly type: "string";
          readonly format: "date-time";
        };
        readonly credentialSubject: {
          readonly anyOf: readonly [
            {
              readonly $ref: "#/allOf/0/%24defs/credentialSubject";
            },
            {
              readonly type: "array";
              readonly items: {
                readonly $ref: "#/allOf/0/%24defs/credentialSubject";
              };
            },
          ];
        };
        readonly credentialStatus: {
          readonly description: "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension";
          readonly anyOf: readonly [
            {
              readonly $ref: "#/allOf/0/%24defs/credentialStatus";
            },
            {
              readonly type: "array";
              readonly items: {
                readonly $ref: "#/allOf/0/%24defs/credentialStatus";
              };
            },
          ];
        };
        readonly credentialSchema: {
          readonly description: "One or more schemas that validate the Verifiable Credential.";
          readonly anyOf: readonly [
            {
              readonly $ref: "#/allOf/0/%24defs/credentialSchema";
            },
            {
              readonly type: "array";
              readonly items: {
                readonly $ref: "#/allOf/0/%24defs/credentialSchema";
              };
            },
          ];
        };
        readonly termsOfUse: {
          readonly anyOf: readonly [
            {
              readonly $ref: "#/allOf/0/%24defs/termsOfUse";
            },
            {
              readonly type: "array";
              readonly items: {
                readonly $ref: "#/allOf/0/%24defs/termsOfUse";
              };
            },
          ];
        };
        readonly evidence: {
          readonly anyOf: readonly [
            {
              readonly $ref: "#/allOf/0/%24defs/evidence";
            },
            {
              readonly type: "array";
              readonly items: {
                readonly $ref: "#/allOf/0/%24defs/evidence";
              };
            },
          ];
        };
        readonly relatedResource: {
          readonly type: "array";
          readonly items: {
            readonly type: "object";
            readonly properties: {
              readonly id: {
                readonly description: "URL the integrity information is for";
                readonly type: "string";
                readonly format: "uri";
              };
              readonly mediaType: {
                readonly description: "Expected media type for the indicated resource";
                readonly type: "string";
              };
            };
            readonly required: readonly ["id"];
            readonly anyOf: readonly [
              {
                readonly properties: {
                  readonly digestSRI: {
                    readonly description: "Digest value of Subresource Integrity";
                    readonly type: "string";
                  };
                };
                readonly required: readonly ["digestSRI"];
              },
              {
                readonly properties: {
                  readonly digestMultibase: {
                    readonly description: "Digest value of multihash encoded in multibase.";
                    readonly type: "string";
                  };
                };
                readonly required: readonly ["digestMultibase"];
              },
            ];
          };
        };
      };
      readonly required: readonly [
        "@context",
        "id",
        "type",
        "issuer",
        "validFrom",
        "credentialSubject",
        "credentialSchema",
      ];
      readonly $defs: {
        readonly credentialSubject: {
          readonly description: "Defines information about the subject that is defined by the type chain";
          readonly type: "object";
          readonly properties: {
            readonly id: {
              readonly description: "Defines the DID of the subject that is described by the issued credential";
              readonly type: "string";
              readonly format: "uri";
            };
          };
        };
        readonly credentialStatus: {
          readonly description: "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension";
          readonly type: "object";
          readonly properties: {
            readonly id: {
              readonly description: "Exact identity for the credential status";
              readonly type: "string";
              readonly format: "uri";
            };
            readonly type: {
              readonly description: "Defines the revocation type extension";
              readonly type: "string";
            };
          };
          readonly required: readonly ["id", "type"];
        };
        readonly credentialSchema: {
          readonly description: "Contains information about the credential schema on which the issued credential is based";
          readonly type: "object";
          readonly properties: {
            readonly id: {
              readonly description: "References the credential schema stored on the Trusted Schemas Registry (TSR)";
              readonly type: "string";
              readonly format: "uri";
            };
            readonly type: {
              readonly description: "Defines credential schema type";
              readonly type: "string";
            };
          };
          readonly required: readonly ["id", "type"];
        };
        readonly termsOfUse: {
          readonly description: "Contains the terms under which the issued credential was issued";
          readonly type: "object";
          readonly properties: {
            readonly id: {
              readonly description: "Contains a URL that points to where more information about this instance of terms of use can be found.";
              readonly type: "string";
              readonly format: "uri";
            };
            readonly type: {
              readonly description: "Defines the type extension";
              readonly type: "string";
            };
          };
          readonly required: readonly ["type"];
        };
        readonly evidence: {
          readonly type: "object";
          readonly properties: {
            readonly id: {
              readonly description: "If present, it MUST contain a URL that points to where more information about this instance of evidence can be found.";
              readonly type: "string";
            };
            readonly type: {
              readonly anyOf: readonly [
                {
                  readonly description: "Defines the evidence type extension";
                  readonly type: "string";
                },
                {
                  readonly description: "Defines the evidence type extension";
                  readonly type: "array";
                  readonly items: {
                    readonly type: "string";
                  };
                },
              ];
            };
          };
          readonly required: readonly ["type"];
        };
      };
    },
    {
      readonly $ref: "#/$defs/EuropeanDigitalCredentialType";
    },
  ];
  readonly $defs: {
    readonly CredentialSubjectType: {
      readonly $ref: "#/$defs/AgentOrPersonOrOrganisationType";
    };
    readonly IntegerType: {
      readonly type: "integer";
    };
    readonly PositiveIntegerType: {
      readonly type: "integer";
      readonly minimum: 0;
    };
    readonly PercentageIntegerType: {
      readonly type: "integer";
      readonly minimum: 0;
      readonly maximum: 100;
    };
    readonly DecimalType: {
      readonly type: "number";
    };
    readonly BooleanType: {
      readonly type: "boolean";
    };
    readonly IRIType: {
      readonly type: "string";
    };
    readonly URIType: {
      readonly type: "string";
      readonly format: "uri";
    };
    readonly "Many!HTMLType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/HTMLType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/HTMLType";
          };
        },
      ];
    };
    readonly HTMLType: {
      readonly type: "string";
    };
    readonly DateTimeType: {
      readonly type: "string";
      readonly format: "date-time";
    };
    readonly EmailType: {
      readonly type: "string";
      readonly anyOf: readonly [
        {
          readonly format: "email";
        },
        {
          readonly format: "uri";
          readonly pattern: "^mailto:[^@]*[^\\.]@[^\\.]($|[^@]*[^\\.]$)";
        },
      ];
    };
    readonly DurationType: {
      readonly type: "string";
      readonly format: "duration";
    };
    readonly "Many!PeriodOfTimeType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/PeriodOfTimeType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/PeriodOfTimeType";
          };
        },
      ];
    };
    readonly PeriodOfTimeType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "PeriodOfTime";
        };
        readonly startDate: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly endDate: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly prefLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!StringType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/StringType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/StringType";
          };
        },
      ];
    };
    readonly StringType: {
      readonly type: "string";
    };
    readonly GenericIdType: {
      readonly $ref: "#/$defs/URIType";
    };
    readonly LiteralType: {
      readonly $ref: "#/$defs/StringType";
    };
    readonly "Many!AgentType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AgentType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/AgentType";
          };
        },
      ];
    };
    readonly AgentType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Agent";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly prefLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly location: {
          readonly $ref: "#/$defs/Many!LocationType";
        };
        readonly contactPoint: {
          readonly $ref: "#/$defs/Many!ContactPointType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly groupMemberOf: {
          readonly $ref: "#/$defs/Many!GroupType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!PersonType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/PersonType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/PersonType";
          };
        },
      ];
    };
    readonly PersonType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Person";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly location: {
          readonly $ref: "#/$defs/LocationType";
        };
        readonly nationalID: {
          readonly $ref: "#/$defs/LegalIdentifierType";
        };
        readonly fullName: {
          readonly $ref: "#/$defs/LangStringType";
        };
        readonly givenName: {
          readonly $ref: "#/$defs/LangStringType";
        };
        readonly familyName: {
          readonly $ref: "#/$defs/LangStringType";
        };
        readonly birthName: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly patronymicName: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly memberOf: {
          readonly $ref: "#/$defs/Many!OrganisationType";
        };
        readonly dateOfBirth: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly placeOfBirth: {
          readonly $ref: "#/$defs/LocationType";
        };
        readonly citizenshipCountry: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly gender: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly contactPoint: {
          readonly $ref: "#/$defs/Many!ContactPointType";
        };
        readonly groupMemberOf: {
          readonly $ref: "#/$defs/Many!GroupType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly hasCredential: {
          readonly $ref: "#/$defs/Many!EuropeanDigitalCredentialType";
        };
        readonly hasClaim: {
          readonly $ref: "#/$defs/Many!ClaimNodeType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!EuropeanDigitalCredentialType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/EuropeanDigitalCredentialType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/EuropeanDigitalCredentialType";
          };
        },
      ];
    };
    readonly "Many!ClaimNodeType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ClaimNodeType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ClaimNodeType";
          };
        },
      ];
    };
    readonly ClaimNodeType: {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAchievementType";
        },
        {
          readonly $ref: "#/$defs/LearningActivityType";
        },
        {
          readonly $ref: "#/$defs/LearningAssessmentType";
        },
        {
          readonly $ref: "#/$defs/LearningEntitlementType";
        },
        {
          readonly $ref: "#/$defs/ClaimTypeNodeType";
        },
      ];
    };
    readonly "Many!OrganisationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/OrganisationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/OrganisationType";
          };
        },
      ];
    };
    readonly OrganisationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Organisation";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly location: {
          readonly $ref: "#/$defs/Many!LocationType";
        };
        readonly accreditation: {
          readonly $ref: "#/$defs/Many!AccreditationType";
        };
        readonly eIDASIdentifier: {
          readonly $ref: "#/$defs/LegalIdentifierType";
        };
        readonly registration: {
          readonly $ref: "#/$defs/LegalIdentifierType";
        };
        readonly legalName: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly vatIdentifier: {
          readonly $ref: "#/$defs/Many!LegalIdentifierType";
        };
        readonly taxIdentifier: {
          readonly $ref: "#/$defs/Many!LegalIdentifierType";
        };
        readonly logo: {
          readonly $ref: "#/$defs/MediaObjectType";
        };
        readonly hasSubOrganization: {
          readonly $ref: "#/$defs/Many!OrganisationType";
        };
        readonly subOrganizationOf: {
          readonly $ref: "#/$defs/OrganisationType";
        };
        readonly hasMember: {
          readonly $ref: "#/$defs/Many!PersonType";
        };
        readonly groupMemberOf: {
          readonly $ref: "#/$defs/Many!GroupType";
        };
        readonly contactPoint: {
          readonly $ref: "#/$defs/Many!ContactPointType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
      };
      readonly required: readonly ["legalName", "location"];
    };
    readonly MediaObjectType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "MediaObject";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly contentType: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly attachmentType: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly contentEncoding: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly contentSize: {
          readonly $ref: "#/$defs/IntegerType";
        };
        readonly content: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly contentURL: {
          readonly $ref: "#/$defs/URIType";
        };
      };
      readonly required: readonly ["contentType", "contentEncoding", "content"];
    };
    readonly "Many!AccreditationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AccreditationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/AccreditationType";
          };
        },
      ];
    };
    readonly "Many!IssuerNodeType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/IssuerNodeType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/IssuerNodeType";
          };
        },
      ];
    };
    readonly IssuerNodeType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "IssuerNode";
        };
        readonly eidasLegalIdentifier: {
          readonly $ref: "#/$defs/LegalIdentifierType";
        };
      };
      readonly required: readonly ["eidasLegalIdentifier"];
    };
    readonly AccreditationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Accreditation";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly dateIssued: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly decision: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly report: {
          readonly $ref: "#/$defs/WebResourceType";
        };
        readonly organisation: {
          readonly $ref: "#/$defs/Many!OrganisationType";
        };
        readonly limitQualification: {
          readonly $ref: "#/$defs/QualificationType";
        };
        readonly limitField: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly limitEQFLevel: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly limitJurisdiction: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly limitCredentialType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly accreditingAgent: {
          readonly $ref: "#/$defs/OrganisationType";
        };
        readonly reviewDate: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly expiryDate: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly landingPage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly status: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
      };
      readonly required: readonly ["title", "accreditingAgent", "dcType"];
    };
    readonly "Many!QualificationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/QualificationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/QualificationType";
          };
        },
      ];
    };
    readonly QualificationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Qualification";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly category: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly language: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly volumeOfLearning: {
          readonly $ref: "#/$defs/DurationType";
        };
        readonly mode: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly learningOutcomeSummary: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly thematicArea: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly educationSubject: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly creditPoint: {
          readonly $ref: "#/$defs/Many!CreditPointType";
        };
        readonly educationLevel: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly learningSetting: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly maximumDuration: {
          readonly $ref: "#/$defs/DurationType";
        };
        readonly targetGroup: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly entryRequirement: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly learningOutcome: {
          readonly $ref: "#/$defs/Many!LearningOutcomeType";
        };
        readonly influencedBy: {
          readonly $ref: "#/$defs/Many!LearningActivitySpecificationType";
        };
        readonly provenBy: {
          readonly $ref: "#/$defs/Many!LearningAssessmentSpecificationType";
        };
        readonly entitlesTo: {
          readonly $ref: "#/$defs/Many!LearningEntitlementSpecificationType";
        };
        readonly awardingOpportunity: {
          readonly $ref: "#/$defs/Many!AwardingOpportunityType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!QualificationType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!QualificationType";
        };
        readonly specialisationOf: {
          readonly $ref: "#/$defs/Many!QualificationType";
        };
        readonly generalisationOf: {
          readonly $ref: "#/$defs/Many!QualificationType";
        };
        readonly isPartialQualification: {
          readonly $ref: "#/$defs/BooleanType";
        };
        readonly eqfLevel: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly nqfLevel: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly accreditation: {
          readonly $ref: "#/$defs/Many!AccreditationType";
        };
        readonly qualificationCode: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly status: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!LearningOutcomeType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningOutcomeType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningOutcomeType";
          };
        },
      ];
    };
    readonly LearningOutcomeType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningOutcome";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly reusabilityLevel: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly relatedSkill: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly relatedESCOSkill: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!ContactPointType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ContactPointType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ContactPointType";
          };
        },
      ];
    };
    readonly ContactPointType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "ContactPoint";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly address: {
          readonly $ref: "#/$defs/Many!AddressType";
        };
        readonly phone: {
          readonly $ref: "#/$defs/Many!PhoneType";
        };
        readonly emailAddress: {
          readonly $ref: "#/$defs/Many!MailboxType";
        };
        readonly contactForm: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!NoteType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/NoteType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/NoteType";
          };
        },
      ];
    };
    readonly NoteType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Note";
        };
        readonly noteLiteral: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly subject: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly noteFormat: {
          readonly $ref: "#/$defs/ConceptType";
        };
      };
      readonly required: readonly ["noteLiteral"];
    };
    readonly "Many!AddressType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AddressType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/AddressType";
          };
        },
      ];
    };
    readonly AddressType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Address";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        };
        readonly fullAddress: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly countryCode: {
          readonly $ref: "#/$defs/ConceptType";
        };
      };
      readonly required: readonly ["countryCode"];
    };
    readonly "Many!PhoneType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/PhoneType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/PhoneType";
          };
        },
      ];
    };
    readonly PhoneType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Phone";
        };
        readonly phoneNumber: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly countryDialing: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly areaDialing: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly dialNumber: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!MailboxType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/MailboxType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/MailboxType";
          };
        },
      ];
    };
    readonly MailboxType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/EmailType";
        };
        readonly type: {
          readonly const: "Mailbox";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!WebResourceType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/WebResourceType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/WebResourceType";
          };
        },
      ];
    };
    readonly WebResourceType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "WebResource";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly language: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly contentURL: {
          readonly $ref: "#/$defs/URIType";
        };
      };
      readonly required: readonly ["contentURL"];
    };
    readonly "Many!ConceptType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ConceptType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ConceptType";
          };
        },
      ];
    };
    readonly "Single!ConceptType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ConceptType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ConceptType";
          };
          readonly minItems: 1;
          readonly maxItems: 1;
        },
      ];
    };
    readonly ConceptType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Concept";
        };
        readonly prefLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly notation: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly inScheme: {
          readonly $ref: "#/$defs/ConceptSchemeType";
        };
        readonly definition: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
      };
      readonly required: readonly [];
    };
    readonly ConceptSchemeType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "ConceptScheme";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!LocationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LocationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LocationType";
          };
        },
      ];
    };
    readonly LocationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Location";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly address: {
          readonly $ref: "#/$defs/Many!AddressType";
        };
        readonly geographicName: {
          readonly $ref: "#/$defs/Many!AddressType";
        };
        readonly spatialCode: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly geometry: {
          readonly $ref: "#/$defs/Many!GeometryType";
        };
      };
      readonly required: readonly ["address"];
    };
    readonly "Many!GeometryType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/GeometryType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/GeometryType";
          };
        },
      ];
    };
    readonly GeometryType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Geometry";
        };
        readonly longitude: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly latitude: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!GroupType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/GroupType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/GroupType";
          };
        },
      ];
    };
    readonly GroupType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Group";
        };
        readonly prefLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly location: {
          readonly $ref: "#/$defs/Many!LocationType";
        };
        readonly contactPoint: {
          readonly $ref: "#/$defs/Many!ContactPointType";
        };
        readonly member: {
          readonly $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType";
        };
      };
      readonly required: readonly ["prefLabel"];
    };
    readonly "Many!AgentOrPersonOrOrganisationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AgentOrPersonOrOrganisationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/AgentOrPersonOrOrganisationType";
          };
        },
      ];
    };
    readonly AgentOrPersonOrOrganisationType: {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AgentType";
        },
        {
          readonly $ref: "#/$defs/PersonType";
        },
        {
          readonly $ref: "#/$defs/OrganisationType";
        },
      ];
    };
    readonly LearningAchievementSpecificationOrSpecificationType: {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAchievementSpecificationType";
        },
        {
          readonly $ref: "#/$defs/QualificationType";
        },
      ];
    };
    readonly IdentifierOrLegalIdentifierType: {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/IdentifierType";
        },
        {
          readonly $ref: "#/$defs/LegalIdentifierType";
        },
      ];
    };
    readonly "Many!IdentifierType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/IdentifierType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/IdentifierType";
          };
        },
      ];
    };
    readonly IdentifierType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Identifier";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly notation: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly schemeAgency: {
          readonly $ref: "#/$defs/LangStringType";
        };
        readonly creator: {
          readonly $ref: "#/$defs/IRIType";
        };
        readonly dateIssued: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly schemeName: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly schemeVersion: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly schemeId: {
          readonly $ref: "#/$defs/URIType";
        };
      };
      readonly required: readonly ["notation"];
    };
    readonly "Many!LegalIdentifierType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LegalIdentifierType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LegalIdentifierType";
          };
        },
      ];
    };
    readonly LegalIdentifierType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LegalIdentifier";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly notation: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly schemeAgency: {
          readonly $ref: "#/$defs/LangStringType";
        };
        readonly creator: {
          readonly $ref: "#/$defs/IRIType";
        };
        readonly dateIssued: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly schemeName: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly schemeVersion: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly schemeId: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly spatial: {
          readonly $ref: "#/$defs/ConceptType";
        };
      };
      readonly required: readonly ["notation", "spatial"];
    };
    readonly "Many!CreditPointType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/CreditPointType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/CreditPointType";
          };
        },
      ];
    };
    readonly CreditPointType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "CreditPoint";
        };
        readonly framework: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly point: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly ["framework", "point"];
    };
    readonly AmountType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Amount";
        };
        readonly unit: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly value: {
          readonly $ref: "#/$defs/DecimalType";
        };
      };
      readonly required: readonly ["unit", "value"];
    };
    readonly "Many!LangStringType": {
      readonly type: "object";
      readonly propertyNames: {
        readonly pattern: "^(aa|ab|ae|af|ak|am|an|ar|as|av|ay|az|ba|be|bg|bh|bi|bm|bn|bo|br|bs|ca|ce|ch|co|cr|cs|cu|cv|cy|da|de|dv|dz|ee|el|en|eo|es|et|eu|fa|ff|fi|fj|fo|fr|fy|ga|gd|gl|gn|gu|gv|ha|he|hi|ho|hr|ht|hu|hy|hz|ia|id|ie|ig|ii|ik|in|io|is|it|iu|iw|ja|ji|jv|jw|ka|kg|ki|kj|kk|kl|km|kn|ko|kr|ks|ku|kv|kw|ky|la|lb|lg|li|ln|lo|lt|lu|lv|mg|mh|mi|mk|ml|mn|mo|mr|ms|mt|my|na|nb|nd|ne|ng|nl|nn|no|nr|nv|ny|oc|oj|om|or|os|pa|pi|pl|ps|pt|qu|rm|rn|ro|ru|rw|sa|sc|sd|se|sg|sh|si|sk|sl|sm|sn|so|sq|sr|ss|st|su|sv|sw|ta|te|tg|th|ti|tk|tl|tn|to|tr|ts|tt|tw|ty|ug|uk|ur|uz|ve|vi|vo|wa|wo|xh|yi|yo|za|zh|zu)$";
      };
      readonly minProperties: 1;
    };
    readonly LangStringType: {
      readonly allOf: readonly [
        {
          readonly $ref: "#/$defs/Many!LangStringType";
        },
        {
          readonly type: "object";
          readonly maxProperties: 1;
        },
      ];
    };
    readonly "Many!LearningAchievementType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAchievementType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningAchievementType";
          };
        },
      ];
    };
    readonly LearningAchievementType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningAchievement";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly learningOpportunity: {
          readonly $ref: "#/$defs/LearningOpportunityType";
        };
        readonly creditReceived: {
          readonly $ref: "#/$defs/Many!CreditPointType";
        };
        readonly provenBy: {
          readonly $ref: "#/$defs/Many!LearningAssessmentType";
        };
        readonly influencedBy: {
          readonly $ref: "#/$defs/Many!LearningActivityType";
        };
        readonly awardedBy: {
          readonly $ref: "#/$defs/AwardingProcessType";
        };
        readonly entitlesTo: {
          readonly $ref: "#/$defs/Many!LearningEntitlementType";
        };
        readonly specifiedBy: {
          readonly $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningAchievementType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningAchievementType";
        };
      };
      readonly required: readonly ["title", "awardedBy"];
    };
    readonly "Many!LearningAchievementSpecificationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAchievementSpecificationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningAchievementSpecificationType";
          };
        },
      ];
    };
    readonly LearningAchievementSpecificationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningAchievementSpecification";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly category: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly language: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly volumeOfLearning: {
          readonly $ref: "#/$defs/DurationType";
        };
        readonly mode: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly learningOutcomeSummary: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly thematicArea: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly educationSubject: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly creditPoint: {
          readonly $ref: "#/$defs/Many!CreditPointType";
        };
        readonly educationLevel: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly learningSetting: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly maximumDuration: {
          readonly $ref: "#/$defs/DurationType";
        };
        readonly targetGroup: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly entryRequirement: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly learningOutcome: {
          readonly $ref: "#/$defs/Many!LearningOutcomeType";
        };
        readonly influencedBy: {
          readonly $ref: "#/$defs/Many!LearningActivitySpecificationType";
        };
        readonly provenBy: {
          readonly $ref: "#/$defs/Many!LearningAssessmentSpecificationType";
        };
        readonly entitlesTo: {
          readonly $ref: "#/$defs/Many!LearningEntitlementSpecificationType";
        };
        readonly awardingOpportunity: {
          readonly $ref: "#/$defs/Many!AwardingOpportunityType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType";
        };
        readonly specialisationOf: {
          readonly $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType";
        };
        readonly generalisationOf: {
          readonly $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType";
        };
        readonly status: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!LearningActivityType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningActivityType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningActivityType";
          };
        },
      ];
    };
    readonly LearningActivityType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningActivity";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly temporal: {
          readonly $ref: "#/$defs/Many!PeriodOfTimeType";
        };
        readonly location: {
          readonly $ref: "#/$defs/Many!LocationType";
        };
        readonly learningOpportunity: {
          readonly $ref: "#/$defs/LearningOpportunityType";
        };
        readonly workload: {
          readonly $ref: "#/$defs/DurationType";
        };
        readonly directedBy: {
          readonly $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType";
        };
        readonly awardedBy: {
          readonly $ref: "#/$defs/AwardingProcessType";
        };
        readonly influences: {
          readonly $ref: "#/$defs/Many!LearningAchievementType";
        };
        readonly specifiedBy: {
          readonly $ref: "#/$defs/LearningActivitySpecificationType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningActivityType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningActivityType";
        };
        readonly levelOfCompletion: {
          readonly $ref: "#/$defs/PercentageIntegerType";
        };
      };
      readonly required: readonly ["title", "awardedBy"];
    };
    readonly "Many!LearningActivitySpecificationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningActivitySpecificationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningActivitySpecificationType";
          };
        },
      ];
    };
    readonly LearningActivitySpecificationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningActivitySpecification";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly category: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly language: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly volumeOfLearning: {
          readonly $ref: "#/$defs/DurationType";
        };
        readonly contactHour: {
          readonly $ref: "#/$defs/Many!StringType";
        };
        readonly mode: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly influences: {
          readonly $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningActivitySpecificationType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningActivitySpecificationType";
        };
        readonly specialisationOf: {
          readonly $ref: "#/$defs/Many!LearningActivitySpecificationType";
        };
        readonly generalisationOf: {
          readonly $ref: "#/$defs/Many!LearningActivitySpecificationType";
        };
        readonly status: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!LearningAssessmentType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAssessmentType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningAssessmentType";
          };
        },
      ];
    };
    readonly LearningAssessmentType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningAssessment";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly dateIssued: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly location: {
          readonly $ref: "#/$defs/LocationType";
        };
        readonly grade: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly gradeStatus: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly shortenedGrading: {
          readonly $ref: "#/$defs/ShortenedGradingType";
        };
        readonly resultDistribution: {
          readonly $ref: "#/$defs/ResultDistributionType";
        };
        readonly idVerification: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly awardedBy: {
          readonly $ref: "#/$defs/AwardingProcessType";
        };
        readonly assessedBy: {
          readonly $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType";
        };
        readonly proves: {
          readonly $ref: "#/$defs/Many!LearningAchievementType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningAssessmentType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningAssessmentType";
        };
        readonly specifiedBy: {
          readonly $ref: "#/$defs/Many!LearningAssessmentSpecificationType";
        };
      };
      readonly required: readonly ["title", "grade", "awardedBy"];
    };
    readonly "Many!LearningAssessmentSpecificationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAssessmentSpecificationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningAssessmentSpecificationType";
          };
        },
      ];
    };
    readonly LearningAssessmentSpecificationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningAssessmentSpecification";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly category: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly language: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly mode: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly gradingScheme: {
          readonly $ref: "#/$defs/GradingSchemeType";
        };
        readonly proves: {
          readonly $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningAssessmentSpecificationType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningAssessmentSpecificationType";
        };
        readonly specialisationOf: {
          readonly $ref: "#/$defs/Many!LearningAssessmentSpecificationType";
        };
        readonly generalisationOf: {
          readonly $ref: "#/$defs/Many!LearningAssessmentSpecificationType";
        };
        readonly status: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!LearningEntitlementType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningEntitlementType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningEntitlementType";
          };
        },
      ];
    };
    readonly LearningEntitlementType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningEntitlement";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly dateIssued: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly expiryDate: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly awardedBy: {
          readonly $ref: "#/$defs/AwardingProcessType";
        };
        readonly entitledBy: {
          readonly $ref: "#/$defs/Many!LearningAchievementType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningEntitlementType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningEntitlementType";
        };
        readonly specifiedBy: {
          readonly $ref: "#/$defs/Many!LearningEntitlementSpecificationType";
        };
      };
      readonly required: readonly ["title", "awardedBy"];
    };
    readonly "Many!LearningEntitlementSpecificationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningEntitlementSpecificationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningEntitlementSpecificationType";
          };
        },
      ];
    };
    readonly LearningEntitlementSpecificationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningEntitlementSpecification";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Single!ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly altLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly category: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly entitlementStatus: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly limitOrganisation: {
          readonly $ref: "#/$defs/Many!OrganisationType";
        };
        readonly limitJurisdiction: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly limitOccupation: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly limitNationalOccupation: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly entitledBy: {
          readonly $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningEntitlementSpecificationType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningEntitlementSpecificationType";
        };
        readonly specialisationOf: {
          readonly $ref: "#/$defs/Many!LearningEntitlementSpecificationType";
        };
        readonly generalisationOf: {
          readonly $ref: "#/$defs/Many!LearningEntitlementSpecificationType";
        };
        readonly status: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly ["title", "entitlementStatus", "dcType"];
    };
    readonly "Many!LearningOpportunityType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningOpportunityType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningOpportunityType";
          };
        },
      ];
    };
    readonly LearningOpportunityType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "LearningOpportunity";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly homepage: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly temporal: {
          readonly $ref: "#/$defs/PeriodOfTimeType";
        };
        readonly duration: {
          readonly $ref: "#/$defs/DurationType";
        };
        readonly mode: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly learningSchedule: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly scheduleInformation: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly admissionProcedure: {
          readonly $ref: "#/$defs/NoteType";
        };
        readonly priceDetail: {
          readonly $ref: "#/$defs/Many!PriceDetailType";
        };
        readonly providedBy: {
          readonly $ref: "#/$defs/OrganisationType";
        };
        readonly grant: {
          readonly $ref: "#/$defs/Many!GrantType";
        };
        readonly location: {
          readonly $ref: "#/$defs/Many!LocationType";
        };
        readonly learningAchievementSpecification: {
          readonly $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType";
        };
        readonly learningActivitySpecification: {
          readonly $ref: "#/$defs/LearningActivitySpecificationType";
        };
        readonly hasPart: {
          readonly $ref: "#/$defs/Many!LearningOpportunityType";
        };
        readonly isPartOf: {
          readonly $ref: "#/$defs/Many!LearningOpportunityType";
        };
        readonly bannerImage: {
          readonly $ref: "#/$defs/MediaObjectType";
        };
        readonly applicationDeadline: {
          readonly $ref: "#/$defs/Many!DateTimeType";
        };
        readonly defaultLanguage: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly descriptionHtml: {
          readonly $ref: "#/$defs/Many!HTMLType";
        };
        readonly dateModified: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly status: {
          readonly $ref: "#/$defs/StringType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!PriceDetailType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/PriceDetailType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/PriceDetailType";
          };
        },
      ];
    };
    readonly PriceDetailType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "PriceDetail";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly prefLabel: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly amount: {
          readonly $ref: "#/$defs/AmountType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!ResultCategoryType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ResultCategoryType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ResultCategoryType";
          };
        },
      ];
    };
    readonly ResultCategoryType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "ResultCategory";
        };
        readonly label: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly score: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly maximumScore: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly minimumScore: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly count: {
          readonly $ref: "#/$defs/PositiveIntegerType";
        };
      };
      readonly required: readonly ["label", "count"];
    };
    readonly "Many!ResultDistributionType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ResultDistributionType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ResultDistributionType";
          };
        },
      ];
    };
    readonly ResultDistributionType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "ResultDistribution";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly resultCategory: {
          readonly $ref: "#/$defs/Many!ResultCategoryType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!ShortenedGradingType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ShortenedGradingType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ShortenedGradingType";
          };
        },
      ];
    };
    readonly ShortenedGradingType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "ShortenedGrading";
        };
        readonly percentageLower: {
          readonly $ref: "#/$defs/IntegerType";
        };
        readonly percentageEqual: {
          readonly $ref: "#/$defs/IntegerType";
        };
        readonly percentageHigher: {
          readonly $ref: "#/$defs/IntegerType";
        };
      };
      readonly required: readonly [
        "percentageLower",
        "percentageEqual",
        "percentageHigher",
      ];
    };
    readonly "Many!VerificationCheckType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/VerificationCheckType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/VerificationCheckType";
          };
        },
      ];
    };
    readonly VerificationCheckType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "VerificationCheck";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly verificationStatus: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly elmSubject: {
          readonly $ref: "#/$defs/EuropeanDigitalCredentialType";
        };
      };
      readonly required: readonly ["verificationStatus", "subject", "dcType"];
    };
    readonly "Many!EvidenceType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/EvidenceType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/EvidenceType";
          };
        },
      ];
    };
    readonly EvidenceType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Evidence";
        };
        readonly evidenceStatement: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly evidenceTarget: {
          readonly $ref: "#/$defs/AgentOrPersonOrOrganisationType";
        };
        readonly embeddedEvidence: {
          readonly $ref: "#/$defs/Many!MediaObjectType";
        };
        readonly accreditation: {
          readonly $ref: "#/$defs/AccreditationType";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/ConceptType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!TermsOfUseType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/TermsOfUseType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/TermsOfUseType";
          };
        },
      ];
    };
    readonly TermsOfUseType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "TermsOfUse";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!ProofType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ProofType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ProofType";
          };
        },
      ];
    };
    readonly ProofType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Proof";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!CredentialStatusType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/CredentialStatusType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/CredentialStatusType";
          };
        },
      ];
    };
    readonly CredentialStatusType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly type: "string";
          readonly enum: readonly [
            "CredentialStatus",
            "TrustedCredentialStatus2021",
          ];
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!CredentialSchemaType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/CredentialSchemaType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/CredentialSchemaType";
          };
        },
      ];
    };
    readonly CredentialSchemaType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly type: "string";
          readonly enum: readonly ["ShaclValidator2017", "JsonSchema"];
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!AmountType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AmountType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/AmountType";
          };
        },
      ];
    };
    readonly "Many!AwardingProcessType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AwardingProcessType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/AwardingProcessType";
          };
        },
      ];
    };
    readonly AwardingProcessType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "AwardingProcess";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly location: {
          readonly $ref: "#/$defs/LocationType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly used: {
          readonly $ref: "#/$defs/Many!LearningAssessmentType";
        };
        readonly awards: {
          readonly $ref: "#/$defs/Many!ClaimNodeType";
        };
        readonly awardingBody: {
          readonly $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType";
        };
        readonly awardingDate: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly educationalSystemNote: {
          readonly $ref: "#/$defs/ConceptType";
        };
      };
      readonly required: readonly ["awardingBody"];
    };
    readonly "Many!DisplayParameterType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/DisplayParameterType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/DisplayParameterType";
          };
        },
      ];
    };
    readonly DisplayParameterType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "DisplayParameter";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly language: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly primaryLanguage: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly summaryDisplay: {
          readonly $ref: "#/$defs/StringType";
        };
        readonly individualDisplay: {
          readonly $ref: "#/$defs/Many!IndividualDisplayType";
        };
      };
      readonly required: readonly [
        "title",
        "language",
        "primaryLanguage",
        "individualDisplay",
      ];
    };
    readonly "Many!IndividualDisplayType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/IndividualDisplayType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/IndividualDisplayType";
          };
        },
      ];
    };
    readonly IndividualDisplayType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "IndividualDisplay";
        };
        readonly language: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly displayDetail: {
          readonly $ref: "#/$defs/Many!DisplayDetailType";
        };
      };
      readonly required: readonly ["language", "displayDetail"];
    };
    readonly "Many!DisplayDetailType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/DisplayDetailType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/DisplayDetailType";
          };
        },
      ];
    };
    readonly DisplayDetailType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "DisplayDetail";
        };
        readonly image: {
          readonly $ref: "#/$defs/MediaObjectType";
        };
        readonly page: {
          readonly $ref: "#/$defs/PositiveIntegerType";
        };
      };
      readonly required: readonly ["image", "page"];
    };
    readonly "Many!EuropeanDigitalPresentationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/EuropeanDigitalPresentationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/EuropeanDigitalPresentationType";
          };
        },
      ];
    };
    readonly EuropeanDigitalPresentationType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "EuropeanDigitalPresentation";
        };
        readonly verifiableCredential: {
          readonly $ref: "#/$defs/Many!EuropeanDigitalCredentialType";
        };
        readonly verificationCheck: {
          readonly $ref: "#/$defs/Many!VerificationCheckType";
        };
        readonly holder: {
          readonly $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType";
        };
        readonly proof: {
          readonly $ref: "#/$defs/Many!ProofType";
        };
      };
      readonly required: readonly [];
    };
    readonly "Many!GradingSchemeType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/GradingSchemeType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/GradingSchemeType";
          };
        },
      ];
    };
    readonly GradingSchemeType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "GradingScheme";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!GrantType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/GrantType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/GrantType";
          };
        },
      ];
    };
    readonly GrantType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "Grant";
        };
        readonly dcType: {
          readonly $ref: "#/$defs/ConceptType";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly contentURL: {
          readonly $ref: "#/$defs/URIType";
        };
      };
      readonly required: readonly ["title"];
    };
    readonly "Many!ClaimTypeNodeType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/ClaimTypeNodeType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/ClaimTypeNodeType";
          };
        },
      ];
    };
    readonly ClaimTypeNodeType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "ClaimTypeNode";
        };
        readonly title: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly description: {
          readonly $ref: "#/$defs/Many!LangStringType";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly additionalNote: {
          readonly $ref: "#/$defs/Many!NoteType";
        };
        readonly supplementaryDocument: {
          readonly $ref: "#/$defs/Many!WebResourceType";
        };
        readonly awardedBy: {
          readonly $ref: "#/$defs/AwardingProcessType";
        };
      };
      readonly required: readonly ["title", "awardedBy"];
    };
    readonly EuropeanDigitalCredentialType: {
      readonly type: "object";
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly type: "array";
          readonly items: {
            readonly type: "string";
            readonly enum: readonly [
              "VerifiableCredential",
              "VerifiableAttestation",
              "EuropeanDigitalCredential",
            ];
          };
          readonly minItems: 3;
          readonly uniqueItems: true;
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly credentialProfiles: {
          readonly $ref: "#/$defs/Many!ConceptType";
        };
        readonly attachment: {
          readonly $ref: "#/$defs/Many!MediaObjectType";
        };
        readonly displayParameter: {
          readonly $ref: "#/$defs/DisplayParameterType";
        };
        readonly issuer: {
          readonly anyOf: readonly [
            {
              readonly $ref: "#/$defs/AgentOrPersonOrOrganisationType";
            },
            {
              readonly $ref: "#/$defs/URIType";
            },
          ];
        };
        readonly credentialSubject: {
          readonly $ref: "#/$defs/AgentOrPersonOrOrganisationType";
        };
        readonly issuanceDate: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly issued: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly validFrom: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly expirationDate: {
          readonly $ref: "#/$defs/Many!DateTimeType";
        };
        readonly validUntil: {
          readonly $ref: "#/$defs/DateTimeType";
        };
        readonly proof: {
          readonly $ref: "#/$defs/Many!ProofType";
        };
        readonly evidence: {
          readonly $ref: "#/$defs/Many!EvidenceType";
        };
        readonly termsOfUse: {
          readonly $ref: "#/$defs/Many!TermsOfUseType";
        };
        readonly credentialSchema: {
          readonly $ref: "#/$defs/Many!CredentialSchemaType";
        };
        readonly credentialStatus: {
          readonly $ref: "#/$defs/Many!CredentialStatusType";
        };
        readonly holder: {
          readonly $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType";
        };
      };
      readonly required: readonly [
        "credentialProfiles",
        "displayParameter",
        "issuer",
        "credentialSubject",
        "issued",
        "validFrom",
        "credentialSchema",
      ];
    };
    readonly "Many!IdentifierOrLegalIdentifierType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/IdentifierOrLegalIdentifierType";
          };
        },
      ];
    };
    readonly "Many!MediaObjectType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/MediaObjectType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/MediaObjectType";
          };
        },
      ];
    };
    readonly "Many!DateTimeType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/DateTimeType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/DateTimeType";
          };
        },
      ];
    };
    readonly "Many!LearningAchievementSpecificationOrQualificationType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType";
          };
        },
      ];
    };
    readonly LearningAchievementSpecificationOrQualificationType: {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/LearningAchievementSpecificationType";
        },
        {
          readonly $ref: "#/$defs/QualificationType";
        },
      ];
    };
    readonly "Many!AwardingOpportunityType": {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/AwardingOpportunityType";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/AwardingOpportunityType";
          };
        },
      ];
    };
    readonly AwardingOpportunityType: {
      readonly type: "object";
      readonly additionalProperties: false;
      readonly properties: {
        readonly id: {
          readonly $ref: "#/$defs/URIType";
        };
        readonly type: {
          readonly const: "AwardingOpportunity";
        };
        readonly identifier: {
          readonly $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType";
        };
        readonly location: {
          readonly $ref: "#/$defs/LocationType";
        };
        readonly temporal: {
          readonly $ref: "#/$defs/PeriodOfTimeType";
        };
        readonly awardingBody: {
          readonly $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType";
        };
        readonly learningAchievementSpecification: {
          readonly $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType";
        };
      };
      readonly required: readonly ["awardingBody"];
    };
  };
};
export declare const examples: {
  readonly bengalesHighSchoolDiploma: {
    "@context": [string, string];
    id: string;
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ];
    credentialSchema: (
      | {
          id: string;
          type: "ShaclValidator2017";
        }
      | {
          id: string;
          type: "JsonSchema";
        }
    )[];
    credentialSubject: {
      id: string;
      type: "Person";
      identifier: {
        id: string;
        type: "Identifier";
        notation: string;
        schemeName: string;
      }[];
      givenName: {
        en: string[];
      };
      familyName: {
        en: string[];
      };
      fullName: {
        en: string[];
      };
      hasClaim: {
        id: string;
        type: "LearningAchievement";
        awardedBy: {
          id: string;
          type: "AwardingProcess";
          awardingBody: {
            id: string;
            type: "Organisation";
            location: {
              id: string;
              type: "Location";
              address: {
                id: string;
                type: "Address";
                countryCode: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
                fullAddress: {
                  id: string;
                  type: "Note";
                  noteLiteral: {
                    en: string[];
                  };
                };
              }[];
              description: {
                en: string[];
              };
            }[];
            legalName: {
              en: string[];
            };
            registration: {
              id: string;
              type: "LegalIdentifier";
              notation: string;
              spatial: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
                notation: string;
              };
            };
          }[];
        };
        title: {
          en: string[];
        };
        entitlesTo: {
          id: string;
          type: "LearningEntitlement";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          description: {
            en: string[];
          };
          title: {
            en: string[];
          };
          specifiedBy: {
            id: string;
            type: "LearningEntitlementSpecification";
            title: {
              en: string[];
            };
            dcType: [
              {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
              },
            ];
            entitlementStatus: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
          };
        }[];
        hasPart: {
          id: string;
          type: "LearningAchievement";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          description: {
            en: string[];
          };
          title: {
            en: string[];
          };
          provenBy: {
            id: string;
            type: "LearningAssessment";
            awardedBy: {
              id: string;
              type: "AwardingProcess";
              awardingBody: {
                id: string;
                type: "Organisation";
                location: {
                  id: string;
                  type: "Location";
                  address: {
                    id: string;
                    type: "Address";
                    countryCode: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                    fullAddress: {
                      id: string;
                      type: "Note";
                      noteLiteral: {
                        en: string[];
                      };
                    };
                  }[];
                  description: {
                    en: string[];
                  };
                }[];
                legalName: {
                  en: string[];
                };
                registration: {
                  id: string;
                  type: "LegalIdentifier";
                  notation: string;
                  spatial: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                };
              }[];
            };
            title: {
              en: string[];
            };
            grade: {
              id: string;
              type: "Note";
              noteLiteral: {
                en: string[];
              };
            };
            specifiedBy: {
              id: string;
              type: "LearningAssessmentSpecification";
              title: {
                en: string[];
              };
            };
          }[];
          specifiedBy: {
            id: string;
            type: "LearningAchievementSpecification";
            additionalNote: {
              id: string;
              type: "Note";
              noteLiteral: {
                en: string[];
              };
              subject: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
              };
            }[];
            title: {
              en: string[];
            };
          };
        }[];
        provenBy: {
          id: string;
          type: "LearningAssessment";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          title: {
            en: string[];
          };
          grade: {
            id: string;
            type: "Note";
            noteLiteral: {
              en: string[];
            };
          };
          hasPart: {
            id: string;
            type: "LearningAssessment";
            awardedBy: {
              id: string;
              type: "AwardingProcess";
              awardingBody: {
                id: string;
                type: "Organisation";
                location: {
                  id: string;
                  type: "Location";
                  address: {
                    id: string;
                    type: "Address";
                    countryCode: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                    fullAddress: {
                      id: string;
                      type: "Note";
                      noteLiteral: {
                        en: string[];
                      };
                    };
                  }[];
                  description: {
                    en: string[];
                  };
                }[];
                legalName: {
                  en: string[];
                };
                registration: {
                  id: string;
                  type: "LegalIdentifier";
                  notation: string;
                  spatial: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                };
              }[];
            };
            title: {
              en: string[];
            };
            grade: {
              id: string;
              type: "Note";
              noteLiteral: {
                en: string[];
              };
            };
            specifiedBy: {
              id: string;
              type: "LearningAssessmentSpecification";
              title: {
                en: string[];
              };
            };
          }[];
          specifiedBy: {
            id: string;
            type: "LearningAssessmentSpecification";
            title: {
              en: string[];
            };
            gradingScheme: {
              id: string;
              type: "GradingScheme";
              description: {
                en: string[];
              };
              title: {
                en: string[];
              };
            };
          };
        }[];
        specifiedBy: {
          id: string;
          type: "Qualification";
          title: {
            en: string[];
          };
          creditPoint: {
            id: string;
            type: "CreditPoint";
            framework: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            point: string;
          }[];
          maximumDuration: string;
          volumeOfLearning: string;
          nqfLevel: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            prefLabel: {
              en: string[];
            };
          }[];
          eqfLevel: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            prefLabel: {
              en: string[];
            };
          };
          isPartialQualification: true;
        };
      }[];
    };
    issuanceDate: string;
    issuer: {
      id: string;
      type: "Organisation";
      location: {
        id: string;
        type: "Location";
        address: {
          id: string;
          type: "Address";
          countryCode: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            notation: string;
            prefLabel: {
              en: string;
            };
          };
        };
      }[];
      identifier: {
        id: string;
        type: "Identifier";
        schemeName: string;
        notation: string;
      };
      legalName: {
        en: string;
      };
    };
    issued: string;
    validFrom: string;
    credentialProfiles: {
      id: string;
      type: "Concept";
      inScheme: {
        id: string;
        type: "ConceptScheme";
      };
      prefLabel: {
        en: string[];
      };
    }[];
    displayParameter: {
      id: string;
      type: "DisplayParameter";
      language: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      }[];
      description: {
        en: string[];
      };
      individualDisplay: {
        id: string;
        type: "IndividualDisplay";
        language: {
          id: string;
          type: "Concept";
          inScheme: {
            id: string;
            type: "ConceptScheme";
          };
          prefLabel: {
            en: string[];
          };
          notation: string;
        };
        displayDetail: {
          id: string;
          type: "DisplayDetail";
          image: {
            id: string;
            type: "MediaObject";
            content: string;
            contentEncoding: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            contentType: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
              notation: string;
            };
          };
          page: number;
        }[];
      }[];
      primaryLanguage: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      };
      title: {
        en: string[];
      };
    };
  };
  readonly digiCompGeneric: {
    "@context": [string, string];
    id: string;
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ];
    credentialSchema: (
      | {
          id: string;
          type: "ShaclValidator2017";
        }
      | {
          id: string;
          type: "JsonSchema";
        }
    )[];
    credentialSubject: {
      id: string;
      type: "Person";
      identifier: {
        id: string;
        type: "Identifier";
        notation: string;
        schemeName: string;
      }[];
      givenName: {
        en: string[];
      };
      familyName: {
        en: string[];
      };
      fullName: {
        en: string[];
      };
      hasClaim: {
        id: string;
        type: "LearningAchievement";
        awardedBy: {
          id: string;
          type: "AwardingProcess";
          awardingBody: {
            id: string;
            type: "Organisation";
            location: {
              id: string;
              type: "Location";
              address: {
                id: string;
                type: "Address";
                countryCode: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
                fullAddress: {
                  id: string;
                  type: "Note";
                  noteLiteral: {
                    en: string[];
                  };
                };
              }[];
              description: {
                en: string[];
              };
            }[];
            legalName: {
              en: string[];
            };
            registration: {
              id: string;
              type: "LegalIdentifier";
              notation: string;
              spatial: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
                notation: string;
              };
            };
          }[];
        };
        title: {
          en: string[];
        };
        hasPart: {
          id: string;
          type: "LearningAchievement";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          title: {
            en: string[];
          };
          specifiedBy: {
            id: string;
            type: "LearningAchievementSpecification";
            title: {
              en: string[];
            };
            learningOutcome: {
              id: string;
              type: "LearningOutcome";
              relatedSkill: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
              }[];
              title: {
                en: string[];
              };
            }[];
          };
        }[];
        provenBy: {
          id: string;
          type: "LearningAssessment";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          title: {
            en: string[];
          };
          grade: {
            id: string;
            type: "Note";
            noteLiteral: {
              en: string[];
            };
          };
          specifiedBy: {
            id: string;
            type: "LearningAssessmentSpecification";
            title: {
              en: string[];
            };
          };
        }[];
        specifiedBy: {
          id: string;
          type: "Qualification";
          title: {
            en: string[];
          };
          learningOutcome: {
            id: string;
            type: "LearningOutcome";
            relatedSkill: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            }[];
            title: {
              en: string[];
            };
          }[];
          learningOutcomeSummary: {
            id: string;
            type: "Note";
            noteLiteral: {
              en: string[];
            };
          };
          eqfLevel: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            prefLabel: {
              en: string[];
            };
          };
        };
      }[];
    };
    issuer: {
      id: string;
      type: "Organisation";
      location: {
        id: string;
        type: "Location";
        address: {
          id: string;
          type: "Address";
          countryCode: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            notation: string;
            prefLabel: {
              en: string;
            };
          };
        };
      }[];
      identifier: {
        id: string;
        type: "Identifier";
        schemeName: string;
        notation: string;
      };
      legalName: {
        en: string;
      };
    };
    issuanceDate: string;
    issued: string;
    validFrom: string;
    credentialProfiles: {
      id: string;
      type: "Concept";
      inScheme: {
        id: string;
        type: "ConceptScheme";
      };
      prefLabel: {
        en: string[];
      };
    }[];
    displayParameter: {
      id: string;
      type: "DisplayParameter";
      language: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      }[];
      description: {
        en: string[];
      };
      individualDisplay: {
        id: string;
        type: "IndividualDisplay";
        language: {
          id: string;
          type: "Concept";
          inScheme: {
            id: string;
            type: "ConceptScheme";
          };
          prefLabel: {
            en: string[];
          };
          notation: string;
        };
        displayDetail: {
          id: string;
          type: "DisplayDetail";
          image: {
            id: string;
            type: "MediaObject";
            content: string;
            contentEncoding: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            contentType: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
              notation: string;
            };
          };
          page: number;
        }[];
      }[];
      primaryLanguage: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      };
      title: {
        en: string[];
      };
    };
  };
  readonly diplomaRntuoCredential: {
    "@context": [string, string];
    id: string;
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ];
    credentialSchema: (
      | {
          id: string;
          type: "ShaclValidator2017";
        }
      | {
          id: string;
          type: "JsonSchema";
        }
    )[];
    expirationDate: string;
    credentialSubject: {
      id: string;
      type: "Person";
      identifier: {
        id: string;
        type: "Identifier";
        notation: string;
        schemeName: string;
      }[];
      givenName: {
        en: string[];
      };
      familyName: {
        en: string[];
      };
      fullName: {
        en: string[];
      };
      hasClaim: {
        id: string;
        type: "LearningAchievement";
        awardedBy: {
          id: string;
          type: "AwardingProcess";
          awardingBody: {
            id: string;
            type: "Organisation";
            location: {
              id: string;
              type: "Location";
              address: {
                id: string;
                type: "Address";
                countryCode: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
                fullAddress: {
                  id: string;
                  type: "Note";
                  noteLiteral: {
                    en: string[];
                  };
                };
              }[];
              description: {
                en: string[];
              };
            }[];
            legalName: {
              en: string[];
            };
            registration: {
              id: string;
              type: "LegalIdentifier";
              notation: string;
              spatial: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
                notation: string;
              };
            };
          }[];
          awardingDate: string;
        };
        title: {
          en: string[];
        };
        specifiedBy: {
          id: string;
          type: "LearningAchievementSpecification";
          title: {
            en: string[];
          };
        };
      }[];
    };
    issuer: {
      id: string;
      type: "Organisation";
      location: {
        id: string;
        type: "Location";
        address: {
          id: string;
          type: "Address";
          countryCode: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            notation: string;
            prefLabel: {
              en: string;
            };
          };
        };
      }[];
      identifier: {
        id: string;
        type: "Identifier";
        schemeName: string;
        notation: string;
      };
      legalName: {
        en: string;
      };
    };
    issuanceDate: string;
    issued: string;
    validUntil: string;
    validFrom: string;
    credentialProfiles: {
      id: string;
      type: "Concept";
      inScheme: {
        id: string;
        type: "ConceptScheme";
      };
      prefLabel: {
        en: string[];
      };
    }[];
    displayParameter: {
      id: string;
      type: "DisplayParameter";
      language: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      }[];
      description: {
        en: string[];
      };
      individualDisplay: {
        id: string;
        type: "IndividualDisplay";
        language: {
          id: string;
          type: "Concept";
          inScheme: {
            id: string;
            type: "ConceptScheme";
          };
          prefLabel: {
            en: string[];
          };
          notation: string;
        };
        displayDetail: {
          id: string;
          type: "DisplayDetail";
          image: {
            id: string;
            type: "MediaObject";
            content: string;
            contentEncoding: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            contentType: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
              notation: string;
            };
          };
          page: number;
        }[];
      }[];
      primaryLanguage: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      };
      title: {
        en: string[];
      };
    };
  };
  readonly franciscoCruzArgudoCertificateOfCompletion: {
    "@context": [string, string];
    id: string;
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ];
    credentialSchema: (
      | {
          id: string;
          type: "ShaclValidator2017";
        }
      | {
          id: string;
          type: "JsonSchema";
        }
    )[];
    credentialSubject: {
      id: string;
      type: "Person";
      identifier: {
        id: string;
        type: "Identifier";
        notation: string;
        schemeName: string;
      }[];
      givenName: {
        en: string[];
      };
      familyName: {
        en: string[];
      };
      fullName: {
        en: string[];
      };
      hasClaim: (
        | {
            id: string;
            type: "LearningAchievement";
            awardedBy: {
              id: string;
              type: "AwardingProcess";
              awardingBody: {
                id: string;
                type: "Organisation";
                location: {
                  id: string;
                  type: "Location";
                  address: {
                    id: string;
                    type: "Address";
                    countryCode: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                    fullAddress: {
                      id: string;
                      type: "Note";
                      noteLiteral: {
                        en: string[];
                      };
                    };
                  }[];
                  description: {
                    en: string[];
                  };
                }[];
                legalName: {
                  en: string[];
                };
                registration: {
                  id: string;
                  type: "LegalIdentifier";
                  notation: string;
                  spatial: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                };
              }[];
            };
            description: {
              en: string[];
            };
            title: {
              en: string[];
            };
            specifiedBy: {
              id: string;
              type: "LearningAchievementSpecification";
              title: {
                en: string[];
              };
              dcType?: undefined;
              language?: undefined;
              mode?: undefined;
            };
            directedBy?: undefined;
            workload?: undefined;
          }
        | {
            id: string;
            type: "LearningActivity";
            awardedBy: {
              id: string;
              type: "AwardingProcess";
              awardingBody: {
                id: string;
                type: "Organisation";
                location: {
                  id: string;
                  type: "Location";
                  address: {
                    id: string;
                    type: "Address";
                    countryCode: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                    fullAddress: {
                      id: string;
                      type: "Note";
                      noteLiteral: {
                        en: string[];
                      };
                    };
                  }[];
                  description: {
                    en: string[];
                  };
                }[];
                legalName: {
                  en: string[];
                };
                registration: {
                  id: string;
                  type: "LegalIdentifier";
                  notation: string;
                  spatial: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                };
              }[];
            };
            title: {
              en: string[];
            };
            directedBy: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
            specifiedBy: {
              id: string;
              type: "LearningActivitySpecification";
              title: {
                en: string[];
              };
              dcType: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
              }[];
              language: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
                notation: string;
              }[];
              mode: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
              }[];
            };
            workload: string;
            description?: undefined;
          }
      )[];
    };
    issuer: {
      id: string;
      type: "Organisation";
      location: {
        id: string;
        type: "Location";
        address: {
          id: string;
          type: "Address";
          countryCode: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            notation: string;
            prefLabel: {
              en: string;
            };
          };
        };
      }[];
      identifier: {
        id: string;
        type: "Identifier";
        schemeName: string;
        notation: string;
      };
      legalName: {
        en: string;
      };
    };
    issuanceDate: string;
    issued: string;
    validFrom: string;
    credentialProfiles: {
      id: string;
      type: "Concept";
      inScheme: {
        id: string;
        type: "ConceptScheme";
      };
      prefLabel: {
        en: string[];
      };
    }[];
    displayParameter: {
      id: string;
      type: "DisplayParameter";
      language: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      }[];
      description: {
        en: string[];
      };
      individualDisplay: {
        id: string;
        type: "IndividualDisplay";
        language: {
          id: string;
          type: "Concept";
          inScheme: {
            id: string;
            type: "ConceptScheme";
          };
          prefLabel: {
            en: string[];
          };
          notation: string;
        };
        displayDetail: {
          id: string;
          type: "DisplayDetail";
          image: {
            id: string;
            type: "MediaObject";
            content: string;
            contentEncoding: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            contentType: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
              notation: string;
            };
          };
          page: number;
        }[];
      }[];
      primaryLanguage: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      };
      title: {
        en: string[];
      };
    };
    identifier: {
      id: string;
      type: "Identifier";
      notation: string;
      schemeName: string;
    }[];
  };
  readonly microcredentialDataAndSoftwareBusiness: {
    "@context": [string, string];
    id: string;
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ];
    credentialSchema: (
      | {
          id: string;
          type: "ShaclValidator2017";
        }
      | {
          id: string;
          type: "JsonSchema";
        }
    )[];
    credentialSubject: {
      id: string;
      type: "Person";
      identifier: {
        id: string;
        type: "Identifier";
        notation: string;
        schemeName: string;
      }[];
      givenName: {
        en: string[];
      };
      familyName: {
        en: string[];
      };
      fullName: {
        en: string[];
      };
      hasClaim: (
        | {
            id: string;
            type: "LearningAchievement";
            awardedBy: {
              id: string;
              type: "AwardingProcess";
              awardingBody: {
                id: string;
                type: "Organisation";
                location: {
                  id: string;
                  type: "Location";
                  address: {
                    id: string;
                    type: "Address";
                    countryCode: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                    fullAddress: {
                      id: string;
                      type: "Note";
                      noteLiteral: {
                        en: string[];
                      };
                    };
                  }[];
                  description: {
                    en: string[];
                  };
                }[];
                legalName: {
                  en: string[];
                };
                registration: {
                  id: string;
                  type: "LegalIdentifier";
                  notation: string;
                  spatial: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                };
              }[];
              awardingDate: string;
            };
            title: {
              en: string[];
            };
            provenBy: {
              id: string;
              type: "LearningAssessment";
              awardedBy: {
                id: string;
                type: "AwardingProcess";
                awardingBody: {
                  id: string;
                  type: "Organisation";
                  location: {
                    id: string;
                    type: "Location";
                    address: {
                      id: string;
                      type: "Address";
                      countryCode: {
                        id: string;
                        type: "Concept";
                        inScheme: {
                          id: string;
                          type: "ConceptScheme";
                        };
                        prefLabel: {
                          en: string[];
                        };
                        notation: string;
                      };
                      fullAddress: {
                        id: string;
                        type: "Note";
                        noteLiteral: {
                          en: string[];
                        };
                      };
                    }[];
                    description: {
                      en: string[];
                    };
                  }[];
                  legalName: {
                    en: string[];
                  };
                  registration: {
                    id: string;
                    type: "LegalIdentifier";
                    notation: string;
                    spatial: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                  };
                }[];
              };
              title: {
                en: string[];
              };
              grade: {
                id: string;
                type: "Note";
                noteLiteral: {
                  en: string[];
                };
              };
              hasPart: {
                id: string;
                type: "LearningAssessment";
                awardedBy: {
                  id: string;
                  type: "AwardingProcess";
                  awardingBody: {
                    id: string;
                    type: "Organisation";
                    location: {
                      id: string;
                      type: "Location";
                      address: {
                        id: string;
                        type: "Address";
                        countryCode: {
                          id: string;
                          type: "Concept";
                          inScheme: {
                            id: string;
                            type: "ConceptScheme";
                          };
                          prefLabel: {
                            en: string[];
                          };
                          notation: string;
                        };
                        fullAddress: {
                          id: string;
                          type: "Note";
                          noteLiteral: {
                            en: string[];
                          };
                        };
                      }[];
                      description: {
                        en: string[];
                      };
                    }[];
                    legalName: {
                      en: string[];
                    };
                    registration: {
                      id: string;
                      type: "LegalIdentifier";
                      notation: string;
                      spatial: {
                        id: string;
                        type: "Concept";
                        inScheme: {
                          id: string;
                          type: "ConceptScheme";
                        };
                        prefLabel: {
                          en: string[];
                        };
                        notation: string;
                      };
                    };
                  }[];
                };
                title: {
                  en: string[];
                };
                grade: {
                  id: string;
                  type: "Note";
                  noteLiteral: {
                    en: string[];
                  };
                };
                specifiedBy: {
                  id: string;
                  type: "LearningAssessmentSpecification";
                  title: {
                    en: string[];
                  };
                  gradingScheme: {
                    id: string;
                    type: "GradingScheme";
                    description: {
                      en: string[];
                    };
                    identifier: {
                      id: string;
                      type: "Identifier";
                      notation: string;
                    }[];
                    title: {
                      en: string[];
                    };
                  };
                };
              }[];
              specifiedBy: {
                id: string;
                type: "LearningAssessmentSpecification";
                title: {
                  en: string[];
                };
                gradingScheme: {
                  id: string;
                  type: "GradingScheme";
                  description: {
                    en: string[];
                  };
                  identifier: {
                    id: string;
                    type: "Identifier";
                    notation: string;
                  }[];
                  title: {
                    en: string[];
                  };
                };
              };
            }[];
            specifiedBy: {
              id: string;
              type: "LearningAchievementSpecification";
              title: {
                en: string[];
              };
              creditPoint: {
                id: string;
                type: "CreditPoint";
                framework: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                };
                point: string;
              }[];
              learningOutcome: {
                id: string;
                type: "LearningOutcome";
                relatedESCOSkill: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                }[];
                title: {
                  en: string[];
                };
              }[];
              learningOutcomeSummary: {
                id: string;
                type: "Note";
                noteLiteral: {
                  en: string[];
                };
              };
              learningSetting: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
              };
              dcType?: undefined;
              language?: undefined;
            };
            description?: undefined;
          }
        | {
            id: string;
            type: "LearningActivity";
            awardedBy: {
              id: string;
              type: "AwardingProcess";
              awardingBody: {
                id: string;
                type: "Organisation";
                location: {
                  id: string;
                  type: "Location";
                  address: {
                    id: string;
                    type: "Address";
                    countryCode: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                    fullAddress: {
                      id: string;
                      type: "Note";
                      noteLiteral: {
                        en: string[];
                      };
                    };
                  }[];
                  description: {
                    en: string[];
                  };
                }[];
                legalName: {
                  en: string[];
                };
                registration: {
                  id: string;
                  type: "LegalIdentifier";
                  notation: string;
                  spatial: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                };
              }[];
              awardingDate?: undefined;
            };
            description: {
              en: string[];
            };
            title: {
              en: string[];
            };
            specifiedBy: {
              id: string;
              type: "LearningActivitySpecification";
              title: {
                en: string[];
              };
              dcType: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
              }[];
              language: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
                notation: string;
              }[];
              creditPoint?: undefined;
              learningOutcome?: undefined;
              learningOutcomeSummary?: undefined;
              learningSetting?: undefined;
            };
            provenBy?: undefined;
          }
      )[];
    };
    issuer: {
      id: string;
      type: "Organisation";
      location: {
        id: string;
        type: "Location";
        address: {
          id: string;
          type: "Address";
          countryCode: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            notation: string;
            prefLabel: {
              en: string;
            };
          };
        };
      }[];
      identifier: {
        id: string;
        type: "Identifier";
        schemeName: string;
        notation: string;
      };
      legalName: {
        en: string;
      };
    };
    issuanceDate: string;
    issued: string;
    validFrom: string;
    credentialProfiles: {
      id: string;
      type: "Concept";
      inScheme: {
        id: string;
        type: "ConceptScheme";
      };
      prefLabel: {
        en: string[];
      };
    }[];
    displayParameter: {
      id: string;
      type: "DisplayParameter";
      language: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      }[];
      description: {
        en: string[];
      };
      individualDisplay: {
        id: string;
        type: "IndividualDisplay";
        language: {
          id: string;
          type: "Concept";
          inScheme: {
            id: string;
            type: "ConceptScheme";
          };
          prefLabel: {
            en: string[];
          };
          notation: string;
        };
        displayDetail: {
          id: string;
          type: "DisplayDetail";
          image: {
            id: string;
            type: "MediaObject";
            content: string;
            contentEncoding: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            contentType: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
              notation: string;
            };
          };
          page: number;
        }[];
      }[];
      primaryLanguage: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      };
      title: {
        en: string[];
      };
    };
  };
  readonly transcriptOfRecordsGeneric: {
    "@context": [string, string];
    id: string;
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ];
    credentialSchema: (
      | {
          id: string;
          type: "ShaclValidator2017";
        }
      | {
          id: string;
          type: "JsonSchema";
        }
    )[];
    credentialSubject: {
      id: string;
      type: "Person";
      identifier: {
        id: string;
        type: "Identifier";
        notation: string;
        schemeName: string;
      }[];
      givenName: {
        en: string[];
      };
      familyName: {
        en: string[];
      };
      fullName: {
        en: string[];
      };
      hasClaim: {
        id: string;
        type: "LearningAchievement";
        awardedBy: {
          id: string;
          type: "AwardingProcess";
          awardingBody: {
            id: string;
            type: "Organisation";
            location: {
              id: string;
              type: "Location";
              address: {
                id: string;
                type: "Address";
                countryCode: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
                fullAddress: {
                  id: string;
                  type: "Note";
                  noteLiteral: {
                    en: string[];
                  };
                };
              }[];
              description: {
                en: string[];
              };
            }[];
            legalName: {
              en: string[];
            };
            registration: {
              id: string;
              type: "LegalIdentifier";
              notation: string;
              spatial: {
                id: string;
                type: "Concept";
                inScheme: {
                  id: string;
                  type: "ConceptScheme";
                };
                prefLabel: {
                  en: string[];
                };
                notation: string;
              };
            };
          }[];
        };
        title: {
          en: string[];
        };
        hasPart: {
          id: string;
          type: "LearningAchievement";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          title: {
            en: string[];
          };
          provenBy: {
            id: string;
            type: "LearningAssessment";
            awardedBy: {
              id: string;
              type: "AwardingProcess";
              awardingBody: {
                id: string;
                type: "Organisation";
                location: {
                  id: string;
                  type: "Location";
                  address: {
                    id: string;
                    type: "Address";
                    countryCode: {
                      id: string;
                      type: "Concept";
                      inScheme: {
                        id: string;
                        type: "ConceptScheme";
                      };
                      prefLabel: {
                        en: string[];
                      };
                      notation: string;
                    };
                    fullAddress: {
                      id: string;
                      type: "Note";
                      noteLiteral: {
                        en: string[];
                      };
                    };
                  }[];
                  description: {
                    en: string[];
                  };
                }[];
                legalName: {
                  en: string[];
                };
                registration: {
                  id: string;
                  type: "LegalIdentifier";
                  notation: string;
                  spatial: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                };
              }[];
            };
            title: {
              en: string[];
            };
            grade: {
              id: string;
              type: "Note";
              noteLiteral: {
                en: string[];
              };
            };
            specifiedBy: {
              id: string;
              type: "LearningAssessmentSpecification";
              title: {
                en: string[];
              };
            };
          }[];
          specifiedBy: {
            id: string;
            type: "LearningAchievementSpecification";
            title: {
              en: string[];
            };
            volumeOfLearning: string;
          };
        }[];
        influencedBy: {
          id: string;
          type: "LearningActivity";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          title: {
            en: string[];
          };
          specifiedBy: {
            id: string;
            type: "LearningActivitySpecification";
            title: {
              en: string[];
            };
          };
          temporal: {
            id: string;
            type: "PeriodOfTime";
            endDate: string;
            startDate: string;
          }[];
        }[];
        provenBy: {
          id: string;
          type: "LearningAssessment";
          awardedBy: {
            id: string;
            type: "AwardingProcess";
            awardingBody: {
              id: string;
              type: "Organisation";
              location: {
                id: string;
                type: "Location";
                address: {
                  id: string;
                  type: "Address";
                  countryCode: {
                    id: string;
                    type: "Concept";
                    inScheme: {
                      id: string;
                      type: "ConceptScheme";
                    };
                    prefLabel: {
                      en: string[];
                    };
                    notation: string;
                  };
                  fullAddress: {
                    id: string;
                    type: "Note";
                    noteLiteral: {
                      en: string[];
                    };
                  };
                }[];
                description: {
                  en: string[];
                };
              }[];
              legalName: {
                en: string[];
              };
              registration: {
                id: string;
                type: "LegalIdentifier";
                notation: string;
                spatial: {
                  id: string;
                  type: "Concept";
                  inScheme: {
                    id: string;
                    type: "ConceptScheme";
                  };
                  prefLabel: {
                    en: string[];
                  };
                  notation: string;
                };
              };
            }[];
          };
          title: {
            en: string[];
          };
          grade: {
            id: string;
            type: "Note";
            noteLiteral: {
              en: string[];
            };
          };
          specifiedBy: {
            id: string;
            type: "LearningAssessmentSpecification";
            title: {
              en: string[];
            };
          };
        }[];
        specifiedBy: {
          id: string;
          type: "LearningAchievementSpecification";
          title: {
            en: string[];
          };
          creditPoint: {
            id: string;
            type: "CreditPoint";
            framework: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            point: string;
          }[];
          volumeOfLearning: string;
        };
      }[];
    };
    issuer: {
      id: string;
      type: "Organisation";
      location: {
        id: string;
        type: "Location";
        address: {
          id: string;
          type: "Address";
          countryCode: {
            id: string;
            type: "Concept";
            inScheme: {
              id: string;
              type: "ConceptScheme";
            };
            notation: string;
            prefLabel: {
              en: string;
            };
          };
        };
      }[];
      identifier: {
        id: string;
        type: "Identifier";
        schemeName: string;
        notation: string;
      };
      legalName: {
        en: string;
      };
    };
    issuanceDate: string;
    issued: string;
    validFrom: string;
    credentialProfiles: {
      id: string;
      type: "Concept";
      inScheme: {
        id: string;
        type: "ConceptScheme";
      };
      prefLabel: {
        en: string[];
      };
    }[];
    displayParameter: {
      id: string;
      type: "DisplayParameter";
      language: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      }[];
      description: {
        en: string[];
      };
      individualDisplay: {
        id: string;
        type: "IndividualDisplay";
        language: {
          id: string;
          type: "Concept";
          inScheme: {
            id: string;
            type: "ConceptScheme";
          };
          prefLabel: {
            en: string[];
          };
          notation: string;
        };
        displayDetail: {
          id: string;
          type: "DisplayDetail";
          image: {
            id: string;
            type: "MediaObject";
            content: string;
            contentEncoding: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
            };
            contentType: {
              id: string;
              type: "Concept";
              inScheme: {
                id: string;
                type: "ConceptScheme";
              };
              prefLabel: {
                en: string[];
              };
              notation: string;
            };
          };
          page: number;
        }[];
      }[];
      primaryLanguage: {
        id: string;
        type: "Concept";
        inScheme: {
          id: string;
          type: "ConceptScheme";
        };
        prefLabel: {
          en: string[];
        };
        notation: string;
      };
      title: {
        en: string[];
      };
    };
  };
};
/**
 * Schema for EDC credential based on ELM 3.2
 */
export type EuropassEDCCredential = EBSIVerifiableAttestation &
  EuropeanDigitalCredentialType;
export type URIType = string;
export type ManyIdentifierOrLegalIdentifierType =
  | IdentifierOrLegalIdentifierType
  | IdentifierOrLegalIdentifierType[];
export type IdentifierOrLegalIdentifierType =
  | IdentifierType
  | LegalIdentifierType;
export type ManyConceptType = ConceptType | ConceptType[];
export type StringType = string;
export type LangStringType = ManyLangStringType;
export type IRIType = string;
export type DateTimeType = string;
export type ManyMediaObjectType = MediaObjectType | MediaObjectType[];
export type IntegerType = number;
export type ManyIndividualDisplayType =
  | IndividualDisplayType
  | IndividualDisplayType[];
export type ManyDisplayDetailType = DisplayDetailType | DisplayDetailType[];
export type PositiveIntegerType = number;
export type CredentialSubjectType = AgentType | PersonType | OrganisationType;
export type ManyLocationType = LocationType | LocationType[];
export type ManyAddressType = AddressType | AddressType[];
export type ManyGeometryType = GeometryType | GeometryType[];
export type ManyContactPointType = ContactPointType | ContactPointType[];
export type ManyNoteType = NoteType | NoteType[];
export type ManyPhoneType = PhoneType | PhoneType[];
export type ManyMailboxType = MailboxType | MailboxType[];
export type EmailType = {
  [k: string]: unknown | undefined;
};
export type EmailType1 = string;
export type ManyWebResourceType = WebResourceType | WebResourceType[];
export type ManyGroupType = GroupType | GroupType[];
export type ManyAgentOrPersonOrOrganisationType =
  | CredentialSubjectType
  | CredentialSubjectType[];
export type ManyOrganisationType = OrganisationType | OrganisationType[];
export type ManyAccreditationType = AccreditationType | AccreditationType[];
export type DurationType = string;
export type ManyCreditPointType = CreditPointType | CreditPointType[];
export type ManyLearningOutcomeType =
  | LearningOutcomeType
  | LearningOutcomeType[];
export type ManyLearningActivitySpecificationType =
  | LearningActivitySpecificationType
  | LearningActivitySpecificationType[];
export type ManyStringType = StringType | StringType[];
export type ManyLearningAchievementSpecificationOrQualificationType =
  | LearningAchievementSpecificationOrQualificationType
  | LearningAchievementSpecificationOrQualificationType[];
export type LearningAchievementSpecificationOrQualificationType =
  | LearningAchievementSpecificationType
  | QualificationType;
export type ManyLearningAssessmentSpecificationType =
  | LearningAssessmentSpecificationType
  | LearningAssessmentSpecificationType[];
export type ManyLearningEntitlementSpecificationType =
  | LearningEntitlementSpecificationType
  | LearningEntitlementSpecificationType[];
export type SingleConceptType = ConceptType | [ConceptType];
export type ManyAwardingOpportunityType =
  | AwardingOpportunityType
  | AwardingOpportunityType[];
export type ManyQualificationType = QualificationType | QualificationType[];
export type BooleanType = boolean;
export type ManyLegalIdentifierType =
  | LegalIdentifierType
  | LegalIdentifierType[];
export type ManyPersonType = PersonType | PersonType[];
export type ManyEuropeanDigitalCredentialType =
  | EuropeanDigitalCredentialType
  | EuropeanDigitalCredentialType[];
export type ManyClaimNodeType = ClaimNodeType | ClaimNodeType[];
export type ClaimNodeType =
  | LearningAchievementType
  | LearningActivityType
  | LearningAssessmentType
  | LearningEntitlementType
  | ClaimTypeNodeType;
export type ManyPriceDetailType = PriceDetailType | PriceDetailType[];
export type DecimalType = number;
export type ManyGrantType = GrantType | GrantType[];
export type ManyLearningOpportunityType =
  | LearningOpportunityType
  | LearningOpportunityType[];
export type ManyDateTimeType = DateTimeType | DateTimeType[];
export type ManyHTMLType = HTMLType | HTMLType[];
export type HTMLType = string;
export type ManyLearningAssessmentType =
  | LearningAssessmentType
  | LearningAssessmentType[];
export type ManyResultCategoryType = ResultCategoryType | ResultCategoryType[];
export type ManyLearningAchievementType =
  | LearningAchievementType
  | LearningAchievementType[];
export type ManyLearningActivityType =
  | LearningActivityType
  | LearningActivityType[];
export type ManyPeriodOfTimeType = PeriodOfTimeType | PeriodOfTimeType[];
export type PercentageIntegerType = number;
export type ManyLearningEntitlementType =
  | LearningEntitlementType
  | LearningEntitlementType[];
export type ManyProofType = ProofType | ProofType[];
export type ManyEvidenceType = EvidenceType | EvidenceType[];
export type ManyTermsOfUseType = TermsOfUseType | TermsOfUseType[];
export type ManyCredentialSchemaType =
  | CredentialSchemaType
  | CredentialSchemaType[];
export type ManyCredentialStatusType =
  | CredentialStatusType
  | CredentialStatusType[];
/**
 * The schema defines a generic structure for any EBSI-related Verifiable Credentials according to the VCDM v2.0
 */
export interface EBSIVerifiableAttestation {
  /**
   * Semantic context for the issued credential. First element MUST be https://www.w3.org/ns/credentials/v2
   *
   * @minItems 1
   */
  "@context": [string, ...string[]];
  /**
   * Globally unique identifier for the issued credential. It can be a UUID or another globally unique identifier.
   */
  id: string;
  /**
   * Full type chain, used to identify the credential base types
   */
  type: string[];
  /**
   * DID of the credential issuer
   */
  issuer:
    | string
    | {
        /**
         * DID of the credential issuer
         */
        id: string;
        [k: string]: unknown | undefined;
      };
  /**
   * Defines the earliest point when the credential becomes valid.
   */
  validFrom: string;
  /**
   * Defines the latest point when the credential ceases to be valid.
   */
  validUntil?: string;
  credentialSubject: CredentialSubject | CredentialSubject[];
  /**
   * Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension
   */
  credentialStatus?: CredentialStatus | CredentialStatus[];
  /**
   * One or more schemas that validate the Verifiable Credential.
   */
  credentialSchema: CredentialSchema | CredentialSchema[];
  termsOfUse?: TermsOfUse | TermsOfUse[];
  evidence?: Evidence | Evidence[];
  relatedResource?: (
    | {
        /**
         * Digest value of Subresource Integrity
         */
        digestSRI: string;
        [k: string]: unknown | undefined;
      }
    | {
        /**
         * Digest value of multihash encoded in multibase.
         */
        digestMultibase: string;
        [k: string]: unknown | undefined;
      }
  )[];
  [k: string]: unknown | undefined;
}
/**
 * Defines information about the subject that is defined by the type chain
 */
export interface CredentialSubject {
  /**
   * Defines the DID of the subject that is described by the issued credential
   */
  id?: string;
  [k: string]: unknown | undefined;
}
/**
 * Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension
 */
export interface CredentialStatus {
  /**
   * Exact identity for the credential status
   */
  id: string;
  /**
   * Defines the revocation type extension
   */
  type: string;
  [k: string]: unknown | undefined;
}
/**
 * Contains information about the credential schema on which the issued credential is based
 */
export interface CredentialSchema {
  /**
   * References the credential schema stored on the Trusted Schemas Registry (TSR)
   */
  id: string;
  /**
   * Defines credential schema type
   */
  type: string;
  [k: string]: unknown | undefined;
}
/**
 * Contains the terms under which the issued credential was issued
 */
export interface TermsOfUse {
  /**
   * Contains a URL that points to where more information about this instance of terms of use can be found.
   */
  id?: string;
  /**
   * Defines the type extension
   */
  type: string;
  [k: string]: unknown | undefined;
}
export interface Evidence {
  /**
   * If present, it MUST contain a URL that points to where more information about this instance of evidence can be found.
   */
  id?: string;
  type: string | string[];
  [k: string]: unknown | undefined;
}
export interface EuropeanDigitalCredentialType {
  id?: URIType;
  /**
   * @minItems 3
   */
  type?: [
    (
      | "VerifiableCredential"
      | "VerifiableAttestation"
      | "EuropeanDigitalCredential"
    ),
    (
      | "VerifiableCredential"
      | "VerifiableAttestation"
      | "EuropeanDigitalCredential"
    ),
    (
      | "VerifiableCredential"
      | "VerifiableAttestation"
      | "EuropeanDigitalCredential"
    ),
    ...(
      | "VerifiableCredential"
      | "VerifiableAttestation"
      | "EuropeanDigitalCredential"
    )[],
  ];
  identifier?: ManyIdentifierOrLegalIdentifierType;
  credentialProfiles: ManyConceptType;
  attachment?: ManyMediaObjectType;
  displayParameter: DisplayParameterType;
  issuer: CredentialSubjectType | URIType;
  credentialSubject: CredentialSubjectType;
  issuanceDate?: DateTimeType;
  issued: DateTimeType;
  validFrom: DateTimeType;
  expirationDate?: ManyDateTimeType;
  validUntil?: DateTimeType;
  proof?: ManyProofType;
  evidence?: ManyEvidenceType;
  termsOfUse?: ManyTermsOfUseType;
  credentialSchema: ManyCredentialSchemaType;
  credentialStatus?: ManyCredentialStatusType;
  holder?: ManyAgentOrPersonOrOrganisationType;
  [k: string]: unknown | undefined;
}
export interface IdentifierType {
  id?: URIType;
  type?: "Identifier";
  dcType?: ManyConceptType;
  notation: StringType;
  schemeAgency?: LangStringType;
  creator?: IRIType;
  dateIssued?: DateTimeType;
  schemeName?: StringType;
  schemeVersion?: StringType;
  schemeId?: URIType;
}
export interface ConceptType {
  id?: URIType;
  type?: "Concept";
  prefLabel?: ManyLangStringType;
  notation?: StringType;
  inScheme?: ConceptSchemeType;
  definition?: ManyLangStringType;
}
export interface ManyLangStringType {
  [k: string]: unknown | undefined;
}
export interface ConceptSchemeType {
  id?: URIType;
  type?: "ConceptScheme";
}
export interface LegalIdentifierType {
  id?: URIType;
  type?: "LegalIdentifier";
  dcType?: ManyConceptType;
  notation: StringType;
  schemeAgency?: LangStringType;
  creator?: IRIType;
  dateIssued?: DateTimeType;
  schemeName?: StringType;
  schemeVersion?: StringType;
  schemeId?: URIType;
  spatial: ConceptType;
}
export interface MediaObjectType {
  id?: URIType;
  type?: "MediaObject";
  title?: ManyLangStringType;
  description?: ManyLangStringType;
  contentType: ConceptType;
  attachmentType?: ConceptType;
  contentEncoding: ConceptType;
  contentSize?: IntegerType;
  content: StringType;
  contentURL?: URIType;
}
export interface DisplayParameterType {
  id?: URIType;
  type?: "DisplayParameter";
  title: ManyLangStringType;
  description?: ManyLangStringType;
  language: ManyConceptType;
  primaryLanguage: ConceptType;
  summaryDisplay?: StringType;
  individualDisplay: ManyIndividualDisplayType;
}
export interface IndividualDisplayType {
  id?: URIType;
  type?: "IndividualDisplay";
  language: ConceptType;
  displayDetail: ManyDisplayDetailType;
}
export interface DisplayDetailType {
  id?: URIType;
  type?: "DisplayDetail";
  image: MediaObjectType;
  page: PositiveIntegerType;
}
export interface AgentType {
  id?: URIType;
  type?: "Agent";
  identifier?: ManyIdentifierOrLegalIdentifierType;
  altLabel?: ManyLangStringType;
  prefLabel?: ManyLangStringType;
  location?: ManyLocationType;
  contactPoint?: ManyContactPointType;
  additionalNote?: ManyNoteType;
  groupMemberOf?: ManyGroupType;
  dateModified?: DateTimeType;
}
export interface LocationType {
  id?: URIType;
  type?: "Location";
  identifier?: IdentifierOrLegalIdentifierType;
  description?: ManyLangStringType;
  address: ManyAddressType;
  geographicName?: ManyAddressType;
  spatialCode?: ManyConceptType;
  geometry?: ManyGeometryType;
}
export interface AddressType {
  id?: URIType;
  type?: "Address";
  identifier?: IdentifierOrLegalIdentifierType;
  fullAddress?: NoteType;
  countryCode: ConceptType;
}
export interface NoteType {
  id?: URIType;
  type?: "Note";
  noteLiteral: ManyLangStringType;
  subject?: ConceptType;
  noteFormat?: ConceptType;
}
export interface GeometryType {
  id?: URIType;
  type?: "Geometry";
  longitude?: StringType;
  latitude?: StringType;
}
export interface ContactPointType {
  id?: URIType;
  type?: "ContactPoint";
  additionalNote?: ManyNoteType;
  description?: ManyLangStringType;
  address?: ManyAddressType;
  phone?: ManyPhoneType;
  emailAddress?: ManyMailboxType;
  contactForm?: ManyWebResourceType;
}
export interface PhoneType {
  id?: URIType;
  type?: "Phone";
  phoneNumber?: StringType;
  countryDialing?: StringType;
  areaDialing?: StringType;
  dialNumber?: StringType;
}
export interface MailboxType {
  id?: EmailType & EmailType1;
  type?: "Mailbox";
}
export interface WebResourceType {
  id?: URIType;
  type?: "WebResource";
  title?: ManyLangStringType;
  language?: ConceptType;
  contentURL: URIType;
}
export interface GroupType {
  id?: URIType;
  type?: "Group";
  prefLabel: ManyLangStringType;
  altLabel?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  location?: ManyLocationType;
  contactPoint?: ManyContactPointType;
  member?: ManyAgentOrPersonOrOrganisationType;
}
export interface PersonType {
  id?: URIType;
  type?: "Person";
  identifier?: ManyIdentifierOrLegalIdentifierType;
  location?: LocationType;
  nationalID?: LegalIdentifierType;
  fullName?: LangStringType;
  givenName?: LangStringType;
  familyName?: LangStringType;
  birthName?: ManyLangStringType;
  patronymicName?: ManyLangStringType;
  memberOf?: ManyOrganisationType;
  dateOfBirth?: DateTimeType;
  placeOfBirth?: LocationType;
  citizenshipCountry?: ManyConceptType;
  gender?: ConceptType;
  contactPoint?: ManyContactPointType;
  groupMemberOf?: ManyGroupType;
  dateModified?: DateTimeType;
  hasCredential?: ManyEuropeanDigitalCredentialType;
  hasClaim?: ManyClaimNodeType;
}
export interface OrganisationType {
  id?: URIType;
  type?: "Organisation";
  dcType?: ManyConceptType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  altLabel?: ManyLangStringType;
  homepage?: ManyWebResourceType;
  additionalNote?: ManyNoteType;
  location: ManyLocationType;
  accreditation?: ManyAccreditationType;
  eIDASIdentifier?: LegalIdentifierType;
  registration?: LegalIdentifierType;
  legalName: ManyLangStringType;
  vatIdentifier?: ManyLegalIdentifierType;
  taxIdentifier?: ManyLegalIdentifierType;
  logo?: MediaObjectType;
  hasSubOrganization?: ManyOrganisationType;
  subOrganizationOf?: OrganisationType;
  hasMember?: ManyPersonType;
  groupMemberOf?: ManyGroupType;
  contactPoint?: ManyContactPointType;
  dateModified?: DateTimeType;
}
export interface AccreditationType {
  id?: URIType;
  type?: "Accreditation";
  dcType: ConceptType;
  identifier?: IdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  homepage?: ManyWebResourceType;
  dateIssued?: DateTimeType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  decision?: ConceptType;
  report?: WebResourceType;
  organisation?: ManyOrganisationType;
  limitQualification?: QualificationType;
  limitField?: ManyConceptType;
  limitEQFLevel?: ManyConceptType;
  limitJurisdiction?: ManyConceptType;
  limitCredentialType?: ManyConceptType;
  accreditingAgent: OrganisationType;
  reviewDate?: DateTimeType;
  expiryDate?: DateTimeType;
  landingPage?: ManyWebResourceType;
  status?: StringType;
  dateModified?: DateTimeType;
}
export interface QualificationType {
  id?: URIType;
  type?: "Qualification";
  dcType?: ManyConceptType;
  identifier?: IdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  homepage?: ManyWebResourceType;
  altLabel?: ManyLangStringType;
  category?: ManyLangStringType;
  dateModified?: DateTimeType;
  language?: ManyConceptType;
  volumeOfLearning?: DurationType;
  mode?: ManyConceptType;
  learningOutcomeSummary?: NoteType;
  thematicArea?: ManyConceptType;
  educationSubject?: ManyConceptType;
  creditPoint?: ManyCreditPointType;
  educationLevel?: ManyConceptType;
  learningSetting?: ConceptType;
  maximumDuration?: DurationType;
  targetGroup?: ManyConceptType;
  entryRequirement?: NoteType;
  learningOutcome?: ManyLearningOutcomeType;
  influencedBy?: ManyLearningActivitySpecificationType;
  provenBy?: ManyLearningAssessmentSpecificationType;
  entitlesTo?: ManyLearningEntitlementSpecificationType;
  awardingOpportunity?: ManyAwardingOpportunityType;
  hasPart?: ManyQualificationType;
  isPartOf?: ManyQualificationType;
  specialisationOf?: ManyQualificationType;
  generalisationOf?: ManyQualificationType;
  isPartialQualification?: BooleanType;
  eqfLevel?: ConceptType;
  nqfLevel?: ManyConceptType;
  accreditation?: ManyAccreditationType;
  qualificationCode?: ManyConceptType;
  status?: StringType;
}
export interface CreditPointType {
  id?: URIType;
  type?: "CreditPoint";
  framework: ConceptType;
  point: StringType;
}
export interface LearningOutcomeType {
  id?: URIType;
  type?: "LearningOutcome";
  dcType?: ConceptType;
  identifier?: IdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  additionalNote?: ManyNoteType;
  reusabilityLevel?: ConceptType;
  relatedSkill?: ManyConceptType;
  relatedESCOSkill?: ManyConceptType;
}
export interface LearningActivitySpecificationType {
  id?: URIType;
  type?: "LearningActivitySpecification";
  dcType?: ManyConceptType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  homepage?: ManyWebResourceType;
  altLabel?: ManyLangStringType;
  category?: ManyLangStringType;
  dateModified?: DateTimeType;
  language?: ManyConceptType;
  volumeOfLearning?: DurationType;
  contactHour?: ManyStringType;
  mode?: ManyConceptType;
  influences?: ManyLearningAchievementSpecificationOrQualificationType;
  hasPart?: ManyLearningActivitySpecificationType;
  isPartOf?: ManyLearningActivitySpecificationType;
  specialisationOf?: ManyLearningActivitySpecificationType;
  generalisationOf?: ManyLearningActivitySpecificationType;
  status?: StringType;
}
export interface LearningAchievementSpecificationType {
  id?: URIType;
  type?: "LearningAchievementSpecification";
  dcType?: ManyConceptType;
  identifier?: IdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  homepage?: ManyWebResourceType;
  altLabel?: ManyLangStringType;
  category?: ManyLangStringType;
  dateModified?: DateTimeType;
  language?: ManyConceptType;
  volumeOfLearning?: DurationType;
  mode?: ManyConceptType;
  learningOutcomeSummary?: NoteType;
  thematicArea?: ManyConceptType;
  educationSubject?: ManyConceptType;
  creditPoint?: ManyCreditPointType;
  educationLevel?: ManyConceptType;
  learningSetting?: ConceptType;
  maximumDuration?: DurationType;
  targetGroup?: ManyConceptType;
  entryRequirement?: NoteType;
  learningOutcome?: ManyLearningOutcomeType;
  influencedBy?: ManyLearningActivitySpecificationType;
  provenBy?: ManyLearningAssessmentSpecificationType;
  entitlesTo?: ManyLearningEntitlementSpecificationType;
  awardingOpportunity?: ManyAwardingOpportunityType;
  hasPart?: ManyLearningAchievementSpecificationOrQualificationType;
  isPartOf?: ManyLearningAchievementSpecificationOrQualificationType;
  specialisationOf?: ManyLearningAchievementSpecificationOrQualificationType;
  generalisationOf?: ManyLearningAchievementSpecificationOrQualificationType;
  status?: StringType;
}
export interface LearningAssessmentSpecificationType {
  id?: URIType;
  type?: "LearningAssessmentSpecification";
  dcType?: ConceptType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  homepage?: ManyWebResourceType;
  altLabel?: ManyLangStringType;
  category?: ManyLangStringType;
  dateModified?: DateTimeType;
  language?: ManyConceptType;
  mode?: ManyConceptType;
  gradingScheme?: GradingSchemeType;
  proves?: ManyLearningAchievementSpecificationOrQualificationType;
  hasPart?: ManyLearningAssessmentSpecificationType;
  isPartOf?: ManyLearningAssessmentSpecificationType;
  specialisationOf?: ManyLearningAssessmentSpecificationType;
  generalisationOf?: ManyLearningAssessmentSpecificationType;
  status?: StringType;
}
export interface GradingSchemeType {
  id?: URIType;
  type?: "GradingScheme";
  identifier?: ManyIdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  supplementaryDocument?: ManyWebResourceType;
}
export interface LearningEntitlementSpecificationType {
  id?: URIType;
  type?: "LearningEntitlementSpecification";
  dcType: SingleConceptType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  homepage?: ManyWebResourceType;
  altLabel?: ManyLangStringType;
  category?: ManyLangStringType;
  dateModified?: DateTimeType;
  entitlementStatus: ConceptType;
  limitOrganisation?: ManyOrganisationType;
  limitJurisdiction?: ManyConceptType;
  limitOccupation?: ManyConceptType;
  limitNationalOccupation?: ManyConceptType;
  entitledBy?: ManyLearningAchievementSpecificationOrQualificationType;
  hasPart?: ManyLearningEntitlementSpecificationType;
  isPartOf?: ManyLearningEntitlementSpecificationType;
  specialisationOf?: ManyLearningEntitlementSpecificationType;
  generalisationOf?: ManyLearningEntitlementSpecificationType;
  status?: StringType;
}
export interface AwardingOpportunityType {
  id?: URIType;
  type?: "AwardingOpportunity";
  identifier?: ManyIdentifierOrLegalIdentifierType;
  location?: LocationType;
  temporal?: PeriodOfTimeType;
  awardingBody: ManyAgentOrPersonOrOrganisationType;
  learningAchievementSpecification?: LearningAchievementSpecificationOrQualificationType;
}
export interface PeriodOfTimeType {
  id?: URIType;
  type?: "PeriodOfTime";
  startDate?: DateTimeType;
  endDate?: DateTimeType;
  prefLabel?: ManyLangStringType;
}
export interface LearningAchievementType {
  id?: URIType;
  type?: "LearningAchievement";
  dcType?: ManyConceptType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  identifier?: IdentifierOrLegalIdentifierType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  learningOpportunity?: LearningOpportunityType;
  creditReceived?: ManyCreditPointType;
  provenBy?: ManyLearningAssessmentType;
  influencedBy?: ManyLearningActivityType;
  awardedBy: AwardingProcessType;
  entitlesTo?: ManyLearningEntitlementType;
  specifiedBy?: LearningAchievementSpecificationOrQualificationType;
  hasPart?: ManyLearningAchievementType;
  isPartOf?: ManyLearningAchievementType;
}
export interface LearningOpportunityType {
  id?: URIType;
  type?: "LearningOpportunity";
  dcType?: ManyConceptType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  homepage?: ManyWebResourceType;
  supplementaryDocument?: ManyWebResourceType;
  temporal?: PeriodOfTimeType;
  duration?: DurationType;
  mode?: ManyConceptType;
  learningSchedule?: ConceptType;
  scheduleInformation?: NoteType;
  admissionProcedure?: NoteType;
  priceDetail?: ManyPriceDetailType;
  providedBy?: OrganisationType;
  grant?: ManyGrantType;
  location?: ManyLocationType;
  learningAchievementSpecification?: LearningAchievementSpecificationOrQualificationType;
  learningActivitySpecification?: LearningActivitySpecificationType;
  hasPart?: ManyLearningOpportunityType;
  isPartOf?: ManyLearningOpportunityType;
  bannerImage?: MediaObjectType;
  applicationDeadline?: ManyDateTimeType;
  defaultLanguage?: ConceptType;
  descriptionHtml?: ManyHTMLType;
  dateModified?: DateTimeType;
  status?: StringType;
}
export interface PriceDetailType {
  id?: URIType;
  type?: "PriceDetail";
  identifier?: ManyIdentifierOrLegalIdentifierType;
  prefLabel?: ManyLangStringType;
  description?: ManyLangStringType;
  additionalNote?: ManyNoteType;
  amount?: AmountType;
}
export interface AmountType {
  id?: URIType;
  type?: "Amount";
  unit: ConceptType;
  value: DecimalType;
}
export interface GrantType {
  id?: URIType;
  type?: "Grant";
  dcType?: ConceptType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  supplementaryDocument?: ManyWebResourceType;
  contentURL?: URIType;
}
export interface LearningAssessmentType {
  id?: URIType;
  type?: "LearningAssessment";
  dcType?: ManyConceptType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  dateIssued?: DateTimeType;
  location?: LocationType;
  grade: NoteType;
  gradeStatus?: ConceptType;
  shortenedGrading?: ShortenedGradingType;
  resultDistribution?: ResultDistributionType;
  idVerification?: ConceptType;
  awardedBy: AwardingProcessType;
  assessedBy?: ManyAgentOrPersonOrOrganisationType;
  proves?: ManyLearningAchievementType;
  hasPart?: ManyLearningAssessmentType;
  isPartOf?: ManyLearningAssessmentType;
  specifiedBy?: ManyLearningAssessmentSpecificationType;
}
export interface ShortenedGradingType {
  id?: URIType;
  type?: "ShortenedGrading";
  percentageLower: IntegerType;
  percentageEqual: IntegerType;
  percentageHigher: IntegerType;
}
export interface ResultDistributionType {
  id?: URIType;
  type?: "ResultDistribution";
  description?: ManyLangStringType;
  resultCategory?: ManyResultCategoryType;
}
export interface ResultCategoryType {
  id?: URIType;
  type?: "ResultCategory";
  label: StringType;
  score?: StringType;
  maximumScore?: StringType;
  minimumScore?: StringType;
  count: PositiveIntegerType;
}
export interface AwardingProcessType {
  id?: URIType;
  type?: "AwardingProcess";
  identifier?: ManyIdentifierOrLegalIdentifierType;
  description?: ManyLangStringType;
  location?: LocationType;
  additionalNote?: ManyNoteType;
  used?: ManyLearningAssessmentType;
  awards?: ManyClaimNodeType;
  awardingBody: ManyAgentOrPersonOrOrganisationType;
  awardingDate?: DateTimeType;
  educationalSystemNote?: ConceptType;
}
export interface LearningActivityType {
  id?: URIType;
  type?: "LearningActivity";
  dcType?: ManyConceptType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  temporal?: ManyPeriodOfTimeType;
  location?: ManyLocationType;
  learningOpportunity?: LearningOpportunityType;
  workload?: DurationType;
  directedBy?: ManyAgentOrPersonOrOrganisationType;
  awardedBy: AwardingProcessType;
  influences?: ManyLearningAchievementType;
  specifiedBy?: LearningActivitySpecificationType;
  hasPart?: ManyLearningActivityType;
  isPartOf?: ManyLearningActivityType;
  levelOfCompletion?: PercentageIntegerType;
}
export interface LearningEntitlementType {
  id?: URIType;
  type?: "LearningEntitlement";
  dcType?: ManyConceptType;
  title: ManyLangStringType;
  description?: ManyLangStringType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  dateIssued?: DateTimeType;
  expiryDate?: DateTimeType;
  awardedBy: AwardingProcessType;
  entitledBy?: ManyLearningAchievementType;
  hasPart?: ManyLearningEntitlementType;
  isPartOf?: ManyLearningEntitlementType;
  specifiedBy?: ManyLearningEntitlementSpecificationType;
}
export interface ClaimTypeNodeType {
  id?: URIType;
  type?: "ClaimTypeNode";
  title: ManyLangStringType;
  description?: ManyLangStringType;
  identifier?: ManyIdentifierOrLegalIdentifierType;
  additionalNote?: ManyNoteType;
  supplementaryDocument?: ManyWebResourceType;
  awardedBy: AwardingProcessType;
}
export interface ProofType {
  id?: URIType;
  type?: "Proof";
}
export interface EvidenceType {
  id?: URIType;
  type?: "Evidence";
  evidenceStatement?: StringType;
  evidenceTarget?: CredentialSubjectType;
  embeddedEvidence?: ManyMediaObjectType;
  accreditation?: AccreditationType;
  dcType?: ConceptType;
}
export interface TermsOfUseType {
  id?: URIType;
  type?: "TermsOfUse";
}
export interface CredentialSchemaType {
  id?: URIType;
  type?: "ShaclValidator2017" | "JsonSchema";
}
export interface CredentialStatusType {
  id?: URIType;
  type?: "CredentialStatus" | "TrustedCredentialStatus2021";
}
