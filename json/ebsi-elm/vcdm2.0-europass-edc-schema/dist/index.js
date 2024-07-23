export const metadata = {
  vcdm: "2.0",
  id: {
    base16:
      "0x4d40d34533797f62a8a03d7c4a4cd7827d289fadf1bfa582ec0ecfedbe55a6e0",
    multibase_base58btc: "z6CZj2KLNFkFqeDrJ9h27Rgc2RhszhFRHJ5QTJ3W8p6B1",
  },
  verification: "Documents",
  context: "Education and lifelong learning",
};
export const schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Europass EDC credential",
  description: "Schema for EDC credential based on ELM 3.2",
  type: "object",
  allOf: [
    {
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
            { $ref: "#/allOf/0/%24defs/credentialSubject" },
            {
              type: "array",
              items: { $ref: "#/allOf/0/%24defs/credentialSubject" },
            },
          ],
        },
        credentialStatus: {
          description:
            "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension",
          anyOf: [
            { $ref: "#/allOf/0/%24defs/credentialStatus" },
            {
              type: "array",
              items: { $ref: "#/allOf/0/%24defs/credentialStatus" },
            },
          ],
        },
        credentialSchema: {
          description:
            "One or more schemas that validate the Verifiable Credential.",
          anyOf: [
            { $ref: "#/allOf/0/%24defs/credentialSchema" },
            {
              type: "array",
              items: { $ref: "#/allOf/0/%24defs/credentialSchema" },
            },
          ],
        },
        termsOfUse: {
          anyOf: [
            { $ref: "#/allOf/0/%24defs/termsOfUse" },
            { type: "array", items: { $ref: "#/allOf/0/%24defs/termsOfUse" } },
          ],
        },
        evidence: {
          anyOf: [
            { $ref: "#/allOf/0/%24defs/evidence" },
            { type: "array", items: { $ref: "#/allOf/0/%24defs/evidence" } },
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
                    description:
                      "Digest value of multihash encoded in multibase.",
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
            type: {
              description: "Defines credential schema type",
              type: "string",
            },
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
    },
    { $ref: "#/$defs/EuropeanDigitalCredentialType" },
  ],
  $defs: {
    CredentialSubjectType: { $ref: "#/$defs/AgentOrPersonOrOrganisationType" },
    IntegerType: { type: "integer" },
    PositiveIntegerType: { type: "integer", minimum: 0 },
    PercentageIntegerType: { type: "integer", minimum: 0, maximum: 100 },
    DecimalType: { type: "number" },
    BooleanType: { type: "boolean" },
    IRIType: { type: "string" },
    URIType: { type: "string", format: "uri" },
    "Many!HTMLType": {
      anyOf: [
        { $ref: "#/$defs/HTMLType" },
        { type: "array", items: { $ref: "#/$defs/HTMLType" } },
      ],
    },
    HTMLType: { type: "string" },
    DateTimeType: { type: "string", format: "date-time" },
    EmailType: {
      type: "string",
      anyOf: [
        { format: "email" },
        {
          format: "uri",
          pattern: "^mailto:[^@]*[^\\.]@[^\\.]($|[^@]*[^\\.]$)",
        },
      ],
    },
    DurationType: { type: "string", format: "duration" },
    "Many!PeriodOfTimeType": {
      anyOf: [
        { $ref: "#/$defs/PeriodOfTimeType" },
        { type: "array", items: { $ref: "#/$defs/PeriodOfTimeType" } },
      ],
    },
    PeriodOfTimeType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "PeriodOfTime" },
        startDate: { $ref: "#/$defs/DateTimeType" },
        endDate: { $ref: "#/$defs/DateTimeType" },
        prefLabel: { $ref: "#/$defs/Many!LangStringType" },
      },
      required: [],
    },
    "Many!StringType": {
      anyOf: [
        { $ref: "#/$defs/StringType" },
        { type: "array", items: { $ref: "#/$defs/StringType" } },
      ],
    },
    StringType: { type: "string" },
    GenericIdType: { $ref: "#/$defs/URIType" },
    LiteralType: { $ref: "#/$defs/StringType" },
    "Many!AgentType": {
      anyOf: [
        { $ref: "#/$defs/AgentType" },
        { type: "array", items: { $ref: "#/$defs/AgentType" } },
      ],
    },
    AgentType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Agent" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        prefLabel: { $ref: "#/$defs/Many!LangStringType" },
        location: { $ref: "#/$defs/Many!LocationType" },
        contactPoint: { $ref: "#/$defs/Many!ContactPointType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        groupMemberOf: { $ref: "#/$defs/Many!GroupType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
      },
      required: [],
    },
    "Many!PersonType": {
      anyOf: [
        { $ref: "#/$defs/PersonType" },
        { type: "array", items: { $ref: "#/$defs/PersonType" } },
      ],
    },
    PersonType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Person" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        location: { $ref: "#/$defs/LocationType" },
        nationalID: { $ref: "#/$defs/LegalIdentifierType" },
        fullName: { $ref: "#/$defs/LangStringType" },
        givenName: { $ref: "#/$defs/LangStringType" },
        familyName: { $ref: "#/$defs/LangStringType" },
        birthName: { $ref: "#/$defs/Many!LangStringType" },
        patronymicName: { $ref: "#/$defs/Many!LangStringType" },
        memberOf: { $ref: "#/$defs/Many!OrganisationType" },
        dateOfBirth: { $ref: "#/$defs/DateTimeType" },
        placeOfBirth: { $ref: "#/$defs/LocationType" },
        citizenshipCountry: { $ref: "#/$defs/Many!ConceptType" },
        gender: { $ref: "#/$defs/ConceptType" },
        contactPoint: { $ref: "#/$defs/Many!ContactPointType" },
        groupMemberOf: { $ref: "#/$defs/Many!GroupType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
        hasCredential: { $ref: "#/$defs/Many!EuropeanDigitalCredentialType" },
        hasClaim: { $ref: "#/$defs/Many!ClaimNodeType" },
      },
      required: [],
    },
    "Many!EuropeanDigitalCredentialType": {
      anyOf: [
        { $ref: "#/$defs/EuropeanDigitalCredentialType" },
        {
          type: "array",
          items: { $ref: "#/$defs/EuropeanDigitalCredentialType" },
        },
      ],
    },
    "Many!ClaimNodeType": {
      anyOf: [
        { $ref: "#/$defs/ClaimNodeType" },
        { type: "array", items: { $ref: "#/$defs/ClaimNodeType" } },
      ],
    },
    ClaimNodeType: {
      anyOf: [
        { $ref: "#/$defs/LearningAchievementType" },
        { $ref: "#/$defs/LearningActivityType" },
        { $ref: "#/$defs/LearningAssessmentType" },
        { $ref: "#/$defs/LearningEntitlementType" },
        { $ref: "#/$defs/ClaimTypeNodeType" },
      ],
    },
    "Many!OrganisationType": {
      anyOf: [
        { $ref: "#/$defs/OrganisationType" },
        { type: "array", items: { $ref: "#/$defs/OrganisationType" } },
      ],
    },
    OrganisationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Organisation" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        location: { $ref: "#/$defs/Many!LocationType" },
        accreditation: { $ref: "#/$defs/Many!AccreditationType" },
        eIDASIdentifier: { $ref: "#/$defs/LegalIdentifierType" },
        registration: { $ref: "#/$defs/LegalIdentifierType" },
        legalName: { $ref: "#/$defs/Many!LangStringType" },
        vatIdentifier: { $ref: "#/$defs/Many!LegalIdentifierType" },
        taxIdentifier: { $ref: "#/$defs/Many!LegalIdentifierType" },
        logo: { $ref: "#/$defs/MediaObjectType" },
        hasSubOrganization: { $ref: "#/$defs/Many!OrganisationType" },
        subOrganizationOf: { $ref: "#/$defs/OrganisationType" },
        hasMember: { $ref: "#/$defs/Many!PersonType" },
        groupMemberOf: { $ref: "#/$defs/Many!GroupType" },
        contactPoint: { $ref: "#/$defs/Many!ContactPointType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
      },
      required: ["legalName", "location"],
    },
    MediaObjectType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "MediaObject" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        contentType: { $ref: "#/$defs/ConceptType" },
        attachmentType: { $ref: "#/$defs/ConceptType" },
        contentEncoding: { $ref: "#/$defs/ConceptType" },
        contentSize: { $ref: "#/$defs/IntegerType" },
        content: { $ref: "#/$defs/StringType" },
        contentURL: { $ref: "#/$defs/URIType" },
      },
      required: ["contentType", "contentEncoding", "content"],
    },
    "Many!AccreditationType": {
      anyOf: [
        { $ref: "#/$defs/AccreditationType" },
        { type: "array", items: { $ref: "#/$defs/AccreditationType" } },
      ],
    },
    "Many!IssuerNodeType": {
      anyOf: [
        { $ref: "#/$defs/IssuerNodeType" },
        { type: "array", items: { $ref: "#/$defs/IssuerNodeType" } },
      ],
    },
    IssuerNodeType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "IssuerNode" },
        eidasLegalIdentifier: { $ref: "#/$defs/LegalIdentifierType" },
      },
      required: ["eidasLegalIdentifier"],
    },
    AccreditationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Accreditation" },
        dcType: { $ref: "#/$defs/ConceptType" },
        identifier: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        dateIssued: { $ref: "#/$defs/DateTimeType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        decision: { $ref: "#/$defs/ConceptType" },
        report: { $ref: "#/$defs/WebResourceType" },
        organisation: { $ref: "#/$defs/Many!OrganisationType" },
        limitQualification: { $ref: "#/$defs/QualificationType" },
        limitField: { $ref: "#/$defs/Many!ConceptType" },
        limitEQFLevel: { $ref: "#/$defs/Many!ConceptType" },
        limitJurisdiction: { $ref: "#/$defs/Many!ConceptType" },
        limitCredentialType: { $ref: "#/$defs/Many!ConceptType" },
        accreditingAgent: { $ref: "#/$defs/OrganisationType" },
        reviewDate: { $ref: "#/$defs/DateTimeType" },
        expiryDate: { $ref: "#/$defs/DateTimeType" },
        landingPage: { $ref: "#/$defs/Many!WebResourceType" },
        status: { $ref: "#/$defs/StringType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
      },
      required: ["title", "accreditingAgent", "dcType"],
    },
    "Many!QualificationType": {
      anyOf: [
        { $ref: "#/$defs/QualificationType" },
        { type: "array", items: { $ref: "#/$defs/QualificationType" } },
      ],
    },
    QualificationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Qualification" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        identifier: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        category: { $ref: "#/$defs/Many!LangStringType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
        language: { $ref: "#/$defs/Many!ConceptType" },
        volumeOfLearning: { $ref: "#/$defs/DurationType" },
        mode: { $ref: "#/$defs/Many!ConceptType" },
        learningOutcomeSummary: { $ref: "#/$defs/NoteType" },
        thematicArea: { $ref: "#/$defs/Many!ConceptType" },
        educationSubject: { $ref: "#/$defs/Many!ConceptType" },
        creditPoint: { $ref: "#/$defs/Many!CreditPointType" },
        educationLevel: { $ref: "#/$defs/Many!ConceptType" },
        learningSetting: { $ref: "#/$defs/ConceptType" },
        maximumDuration: { $ref: "#/$defs/DurationType" },
        targetGroup: { $ref: "#/$defs/Many!ConceptType" },
        entryRequirement: { $ref: "#/$defs/NoteType" },
        learningOutcome: { $ref: "#/$defs/Many!LearningOutcomeType" },
        influencedBy: {
          $ref: "#/$defs/Many!LearningActivitySpecificationType",
        },
        provenBy: { $ref: "#/$defs/Many!LearningAssessmentSpecificationType" },
        entitlesTo: {
          $ref: "#/$defs/Many!LearningEntitlementSpecificationType",
        },
        awardingOpportunity: { $ref: "#/$defs/Many!AwardingOpportunityType" },
        hasPart: { $ref: "#/$defs/Many!QualificationType" },
        isPartOf: { $ref: "#/$defs/Many!QualificationType" },
        specialisationOf: { $ref: "#/$defs/Many!QualificationType" },
        generalisationOf: { $ref: "#/$defs/Many!QualificationType" },
        isPartialQualification: { $ref: "#/$defs/BooleanType" },
        eqfLevel: { $ref: "#/$defs/ConceptType" },
        nqfLevel: { $ref: "#/$defs/Many!ConceptType" },
        accreditation: { $ref: "#/$defs/Many!AccreditationType" },
        qualificationCode: { $ref: "#/$defs/Many!ConceptType" },
        status: { $ref: "#/$defs/StringType" },
      },
      required: ["title"],
    },
    "Many!LearningOutcomeType": {
      anyOf: [
        { $ref: "#/$defs/LearningOutcomeType" },
        { type: "array", items: { $ref: "#/$defs/LearningOutcomeType" } },
      ],
    },
    LearningOutcomeType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningOutcome" },
        dcType: { $ref: "#/$defs/ConceptType" },
        identifier: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        reusabilityLevel: { $ref: "#/$defs/ConceptType" },
        relatedSkill: { $ref: "#/$defs/Many!ConceptType" },
        relatedESCOSkill: { $ref: "#/$defs/Many!ConceptType" },
      },
      required: ["title"],
    },
    "Many!ContactPointType": {
      anyOf: [
        { $ref: "#/$defs/ContactPointType" },
        { type: "array", items: { $ref: "#/$defs/ContactPointType" } },
      ],
    },
    ContactPointType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "ContactPoint" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        address: { $ref: "#/$defs/Many!AddressType" },
        phone: { $ref: "#/$defs/Many!PhoneType" },
        emailAddress: { $ref: "#/$defs/Many!MailboxType" },
        contactForm: { $ref: "#/$defs/Many!WebResourceType" },
      },
      required: [],
    },
    "Many!NoteType": {
      anyOf: [
        { $ref: "#/$defs/NoteType" },
        { type: "array", items: { $ref: "#/$defs/NoteType" } },
      ],
    },
    NoteType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Note" },
        noteLiteral: { $ref: "#/$defs/Many!LangStringType" },
        subject: { $ref: "#/$defs/ConceptType" },
        noteFormat: { $ref: "#/$defs/ConceptType" },
      },
      required: ["noteLiteral"],
    },
    "Many!AddressType": {
      anyOf: [
        { $ref: "#/$defs/AddressType" },
        { type: "array", items: { $ref: "#/$defs/AddressType" } },
      ],
    },
    AddressType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Address" },
        identifier: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        fullAddress: { $ref: "#/$defs/NoteType" },
        countryCode: { $ref: "#/$defs/ConceptType" },
      },
      required: ["countryCode"],
    },
    "Many!PhoneType": {
      anyOf: [
        { $ref: "#/$defs/PhoneType" },
        { type: "array", items: { $ref: "#/$defs/PhoneType" } },
      ],
    },
    PhoneType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Phone" },
        phoneNumber: { $ref: "#/$defs/StringType" },
        countryDialing: { $ref: "#/$defs/StringType" },
        areaDialing: { $ref: "#/$defs/StringType" },
        dialNumber: { $ref: "#/$defs/StringType" },
      },
      required: [],
    },
    "Many!MailboxType": {
      anyOf: [
        { $ref: "#/$defs/MailboxType" },
        { type: "array", items: { $ref: "#/$defs/MailboxType" } },
      ],
    },
    MailboxType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/EmailType" },
        type: { const: "Mailbox" },
      },
      required: [],
    },
    "Many!WebResourceType": {
      anyOf: [
        { $ref: "#/$defs/WebResourceType" },
        { type: "array", items: { $ref: "#/$defs/WebResourceType" } },
      ],
    },
    WebResourceType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "WebResource" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        language: { $ref: "#/$defs/ConceptType" },
        contentURL: { $ref: "#/$defs/URIType" },
      },
      required: ["contentURL"],
    },
    "Many!ConceptType": {
      anyOf: [
        { $ref: "#/$defs/ConceptType" },
        { type: "array", items: { $ref: "#/$defs/ConceptType" } },
      ],
    },
    "Single!ConceptType": {
      anyOf: [
        { $ref: "#/$defs/ConceptType" },
        {
          type: "array",
          items: { $ref: "#/$defs/ConceptType" },
          minItems: 1,
          maxItems: 1,
        },
      ],
    },
    ConceptType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Concept" },
        prefLabel: { $ref: "#/$defs/Many!LangStringType" },
        notation: { $ref: "#/$defs/StringType" },
        inScheme: { $ref: "#/$defs/ConceptSchemeType" },
        definition: { $ref: "#/$defs/Many!LangStringType" },
      },
      required: [],
    },
    ConceptSchemeType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "ConceptScheme" },
      },
      required: [],
    },
    "Many!LocationType": {
      anyOf: [
        { $ref: "#/$defs/LocationType" },
        { type: "array", items: { $ref: "#/$defs/LocationType" } },
      ],
    },
    LocationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Location" },
        identifier: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        address: { $ref: "#/$defs/Many!AddressType" },
        geographicName: { $ref: "#/$defs/Many!AddressType" },
        spatialCode: { $ref: "#/$defs/Many!ConceptType" },
        geometry: { $ref: "#/$defs/Many!GeometryType" },
      },
      required: ["address"],
    },
    "Many!GeometryType": {
      anyOf: [
        { $ref: "#/$defs/GeometryType" },
        { type: "array", items: { $ref: "#/$defs/GeometryType" } },
      ],
    },
    GeometryType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Geometry" },
        longitude: { $ref: "#/$defs/StringType" },
        latitude: { $ref: "#/$defs/StringType" },
      },
      required: [],
    },
    "Many!GroupType": {
      anyOf: [
        { $ref: "#/$defs/GroupType" },
        { type: "array", items: { $ref: "#/$defs/GroupType" } },
      ],
    },
    GroupType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Group" },
        prefLabel: { $ref: "#/$defs/Many!LangStringType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        location: { $ref: "#/$defs/Many!LocationType" },
        contactPoint: { $ref: "#/$defs/Many!ContactPointType" },
        member: { $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType" },
      },
      required: ["prefLabel"],
    },
    "Many!AgentOrPersonOrOrganisationType": {
      anyOf: [
        { $ref: "#/$defs/AgentOrPersonOrOrganisationType" },
        {
          type: "array",
          items: { $ref: "#/$defs/AgentOrPersonOrOrganisationType" },
        },
      ],
    },
    AgentOrPersonOrOrganisationType: {
      anyOf: [
        { $ref: "#/$defs/AgentType" },
        { $ref: "#/$defs/PersonType" },
        { $ref: "#/$defs/OrganisationType" },
      ],
    },
    LearningAchievementSpecificationOrSpecificationType: {
      anyOf: [
        { $ref: "#/$defs/LearningAchievementSpecificationType" },
        { $ref: "#/$defs/QualificationType" },
      ],
    },
    IdentifierOrLegalIdentifierType: {
      anyOf: [
        { $ref: "#/$defs/IdentifierType" },
        { $ref: "#/$defs/LegalIdentifierType" },
      ],
    },
    "Many!IdentifierType": {
      anyOf: [
        { $ref: "#/$defs/IdentifierType" },
        { type: "array", items: { $ref: "#/$defs/IdentifierType" } },
      ],
    },
    IdentifierType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Identifier" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        notation: { $ref: "#/$defs/StringType" },
        schemeAgency: { $ref: "#/$defs/LangStringType" },
        creator: { $ref: "#/$defs/IRIType" },
        dateIssued: { $ref: "#/$defs/DateTimeType" },
        schemeName: { $ref: "#/$defs/StringType" },
        schemeVersion: { $ref: "#/$defs/StringType" },
        schemeId: { $ref: "#/$defs/URIType" },
      },
      required: ["notation"],
    },
    "Many!LegalIdentifierType": {
      anyOf: [
        { $ref: "#/$defs/LegalIdentifierType" },
        { type: "array", items: { $ref: "#/$defs/LegalIdentifierType" } },
      ],
    },
    LegalIdentifierType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LegalIdentifier" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        notation: { $ref: "#/$defs/StringType" },
        schemeAgency: { $ref: "#/$defs/LangStringType" },
        creator: { $ref: "#/$defs/IRIType" },
        dateIssued: { $ref: "#/$defs/DateTimeType" },
        schemeName: { $ref: "#/$defs/StringType" },
        schemeVersion: { $ref: "#/$defs/StringType" },
        schemeId: { $ref: "#/$defs/URIType" },
        spatial: { $ref: "#/$defs/ConceptType" },
      },
      required: ["notation", "spatial"],
    },
    "Many!CreditPointType": {
      anyOf: [
        { $ref: "#/$defs/CreditPointType" },
        { type: "array", items: { $ref: "#/$defs/CreditPointType" } },
      ],
    },
    CreditPointType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "CreditPoint" },
        framework: { $ref: "#/$defs/ConceptType" },
        point: { $ref: "#/$defs/StringType" },
      },
      required: ["framework", "point"],
    },
    AmountType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Amount" },
        unit: { $ref: "#/$defs/ConceptType" },
        value: { $ref: "#/$defs/DecimalType" },
      },
      required: ["unit", "value"],
    },
    "Many!LangStringType": {
      type: "object",
      propertyNames: {
        pattern:
          "^(aa|ab|ae|af|ak|am|an|ar|as|av|ay|az|ba|be|bg|bh|bi|bm|bn|bo|br|bs|ca|ce|ch|co|cr|cs|cu|cv|cy|da|de|dv|dz|ee|el|en|eo|es|et|eu|fa|ff|fi|fj|fo|fr|fy|ga|gd|gl|gn|gu|gv|ha|he|hi|ho|hr|ht|hu|hy|hz|ia|id|ie|ig|ii|ik|in|io|is|it|iu|iw|ja|ji|jv|jw|ka|kg|ki|kj|kk|kl|km|kn|ko|kr|ks|ku|kv|kw|ky|la|lb|lg|li|ln|lo|lt|lu|lv|mg|mh|mi|mk|ml|mn|mo|mr|ms|mt|my|na|nb|nd|ne|ng|nl|nn|no|nr|nv|ny|oc|oj|om|or|os|pa|pi|pl|ps|pt|qu|rm|rn|ro|ru|rw|sa|sc|sd|se|sg|sh|si|sk|sl|sm|sn|so|sq|sr|ss|st|su|sv|sw|ta|te|tg|th|ti|tk|tl|tn|to|tr|ts|tt|tw|ty|ug|uk|ur|uz|ve|vi|vo|wa|wo|xh|yi|yo|za|zh|zu)$",
      },
      minProperties: 1,
    },
    LangStringType: {
      allOf: [
        { $ref: "#/$defs/Many!LangStringType" },
        { type: "object", maxProperties: 1 },
      ],
    },
    "Many!LearningAchievementType": {
      anyOf: [
        { $ref: "#/$defs/LearningAchievementType" },
        { type: "array", items: { $ref: "#/$defs/LearningAchievementType" } },
      ],
    },
    LearningAchievementType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningAchievement" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        identifier: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        learningOpportunity: { $ref: "#/$defs/LearningOpportunityType" },
        creditReceived: { $ref: "#/$defs/Many!CreditPointType" },
        provenBy: { $ref: "#/$defs/Many!LearningAssessmentType" },
        influencedBy: { $ref: "#/$defs/Many!LearningActivityType" },
        awardedBy: { $ref: "#/$defs/AwardingProcessType" },
        entitlesTo: { $ref: "#/$defs/Many!LearningEntitlementType" },
        specifiedBy: {
          $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType",
        },
        hasPart: { $ref: "#/$defs/Many!LearningAchievementType" },
        isPartOf: { $ref: "#/$defs/Many!LearningAchievementType" },
      },
      required: ["title", "awardedBy"],
    },
    "Many!LearningAchievementSpecificationType": {
      anyOf: [
        { $ref: "#/$defs/LearningAchievementSpecificationType" },
        {
          type: "array",
          items: { $ref: "#/$defs/LearningAchievementSpecificationType" },
        },
      ],
    },
    LearningAchievementSpecificationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningAchievementSpecification" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        identifier: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        category: { $ref: "#/$defs/Many!LangStringType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
        language: { $ref: "#/$defs/Many!ConceptType" },
        volumeOfLearning: { $ref: "#/$defs/DurationType" },
        mode: { $ref: "#/$defs/Many!ConceptType" },
        learningOutcomeSummary: { $ref: "#/$defs/NoteType" },
        thematicArea: { $ref: "#/$defs/Many!ConceptType" },
        educationSubject: { $ref: "#/$defs/Many!ConceptType" },
        creditPoint: { $ref: "#/$defs/Many!CreditPointType" },
        educationLevel: { $ref: "#/$defs/Many!ConceptType" },
        learningSetting: { $ref: "#/$defs/ConceptType" },
        maximumDuration: { $ref: "#/$defs/DurationType" },
        targetGroup: { $ref: "#/$defs/Many!ConceptType" },
        entryRequirement: { $ref: "#/$defs/NoteType" },
        learningOutcome: { $ref: "#/$defs/Many!LearningOutcomeType" },
        influencedBy: {
          $ref: "#/$defs/Many!LearningActivitySpecificationType",
        },
        provenBy: { $ref: "#/$defs/Many!LearningAssessmentSpecificationType" },
        entitlesTo: {
          $ref: "#/$defs/Many!LearningEntitlementSpecificationType",
        },
        awardingOpportunity: { $ref: "#/$defs/Many!AwardingOpportunityType" },
        hasPart: {
          $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType",
        },
        isPartOf: {
          $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType",
        },
        specialisationOf: {
          $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType",
        },
        generalisationOf: {
          $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType",
        },
        status: { $ref: "#/$defs/StringType" },
      },
      required: ["title"],
    },
    "Many!LearningActivityType": {
      anyOf: [
        { $ref: "#/$defs/LearningActivityType" },
        { type: "array", items: { $ref: "#/$defs/LearningActivityType" } },
      ],
    },
    LearningActivityType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningActivity" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        temporal: { $ref: "#/$defs/Many!PeriodOfTimeType" },
        location: { $ref: "#/$defs/Many!LocationType" },
        learningOpportunity: { $ref: "#/$defs/LearningOpportunityType" },
        workload: { $ref: "#/$defs/DurationType" },
        directedBy: { $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType" },
        awardedBy: { $ref: "#/$defs/AwardingProcessType" },
        influences: { $ref: "#/$defs/Many!LearningAchievementType" },
        specifiedBy: { $ref: "#/$defs/LearningActivitySpecificationType" },
        hasPart: { $ref: "#/$defs/Many!LearningActivityType" },
        isPartOf: { $ref: "#/$defs/Many!LearningActivityType" },
        levelOfCompletion: { $ref: "#/$defs/PercentageIntegerType" },
      },
      required: ["title", "awardedBy"],
    },
    "Many!LearningActivitySpecificationType": {
      anyOf: [
        { $ref: "#/$defs/LearningActivitySpecificationType" },
        {
          type: "array",
          items: { $ref: "#/$defs/LearningActivitySpecificationType" },
        },
      ],
    },
    LearningActivitySpecificationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningActivitySpecification" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        category: { $ref: "#/$defs/Many!LangStringType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
        language: { $ref: "#/$defs/Many!ConceptType" },
        volumeOfLearning: { $ref: "#/$defs/DurationType" },
        contactHour: { $ref: "#/$defs/Many!StringType" },
        mode: { $ref: "#/$defs/Many!ConceptType" },
        influences: {
          $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType",
        },
        hasPart: { $ref: "#/$defs/Many!LearningActivitySpecificationType" },
        isPartOf: { $ref: "#/$defs/Many!LearningActivitySpecificationType" },
        specialisationOf: {
          $ref: "#/$defs/Many!LearningActivitySpecificationType",
        },
        generalisationOf: {
          $ref: "#/$defs/Many!LearningActivitySpecificationType",
        },
        status: { $ref: "#/$defs/StringType" },
      },
      required: ["title"],
    },
    "Many!LearningAssessmentType": {
      anyOf: [
        { $ref: "#/$defs/LearningAssessmentType" },
        { type: "array", items: { $ref: "#/$defs/LearningAssessmentType" } },
      ],
    },
    LearningAssessmentType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningAssessment" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        dateIssued: { $ref: "#/$defs/DateTimeType" },
        location: { $ref: "#/$defs/LocationType" },
        grade: { $ref: "#/$defs/NoteType" },
        gradeStatus: { $ref: "#/$defs/ConceptType" },
        shortenedGrading: { $ref: "#/$defs/ShortenedGradingType" },
        resultDistribution: { $ref: "#/$defs/ResultDistributionType" },
        idVerification: { $ref: "#/$defs/ConceptType" },
        awardedBy: { $ref: "#/$defs/AwardingProcessType" },
        assessedBy: { $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType" },
        proves: { $ref: "#/$defs/Many!LearningAchievementType" },
        hasPart: { $ref: "#/$defs/Many!LearningAssessmentType" },
        isPartOf: { $ref: "#/$defs/Many!LearningAssessmentType" },
        specifiedBy: {
          $ref: "#/$defs/Many!LearningAssessmentSpecificationType",
        },
      },
      required: ["title", "grade", "awardedBy"],
    },
    "Many!LearningAssessmentSpecificationType": {
      anyOf: [
        { $ref: "#/$defs/LearningAssessmentSpecificationType" },
        {
          type: "array",
          items: { $ref: "#/$defs/LearningAssessmentSpecificationType" },
        },
      ],
    },
    LearningAssessmentSpecificationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningAssessmentSpecification" },
        dcType: { $ref: "#/$defs/ConceptType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        category: { $ref: "#/$defs/Many!LangStringType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
        language: { $ref: "#/$defs/Many!ConceptType" },
        mode: { $ref: "#/$defs/Many!ConceptType" },
        gradingScheme: { $ref: "#/$defs/GradingSchemeType" },
        proves: {
          $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType",
        },
        hasPart: { $ref: "#/$defs/Many!LearningAssessmentSpecificationType" },
        isPartOf: { $ref: "#/$defs/Many!LearningAssessmentSpecificationType" },
        specialisationOf: {
          $ref: "#/$defs/Many!LearningAssessmentSpecificationType",
        },
        generalisationOf: {
          $ref: "#/$defs/Many!LearningAssessmentSpecificationType",
        },
        status: { $ref: "#/$defs/StringType" },
      },
      required: ["title"],
    },
    "Many!LearningEntitlementType": {
      anyOf: [
        { $ref: "#/$defs/LearningEntitlementType" },
        { type: "array", items: { $ref: "#/$defs/LearningEntitlementType" } },
      ],
    },
    LearningEntitlementType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningEntitlement" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        dateIssued: { $ref: "#/$defs/DateTimeType" },
        expiryDate: { $ref: "#/$defs/DateTimeType" },
        awardedBy: { $ref: "#/$defs/AwardingProcessType" },
        entitledBy: { $ref: "#/$defs/Many!LearningAchievementType" },
        hasPart: { $ref: "#/$defs/Many!LearningEntitlementType" },
        isPartOf: { $ref: "#/$defs/Many!LearningEntitlementType" },
        specifiedBy: {
          $ref: "#/$defs/Many!LearningEntitlementSpecificationType",
        },
      },
      required: ["title", "awardedBy"],
    },
    "Many!LearningEntitlementSpecificationType": {
      anyOf: [
        { $ref: "#/$defs/LearningEntitlementSpecificationType" },
        {
          type: "array",
          items: { $ref: "#/$defs/LearningEntitlementSpecificationType" },
        },
      ],
    },
    LearningEntitlementSpecificationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningEntitlementSpecification" },
        dcType: { $ref: "#/$defs/Single!ConceptType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        altLabel: { $ref: "#/$defs/Many!LangStringType" },
        category: { $ref: "#/$defs/Many!LangStringType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
        entitlementStatus: { $ref: "#/$defs/ConceptType" },
        limitOrganisation: { $ref: "#/$defs/Many!OrganisationType" },
        limitJurisdiction: { $ref: "#/$defs/Many!ConceptType" },
        limitOccupation: { $ref: "#/$defs/Many!ConceptType" },
        limitNationalOccupation: { $ref: "#/$defs/Many!ConceptType" },
        entitledBy: {
          $ref: "#/$defs/Many!LearningAchievementSpecificationOrQualificationType",
        },
        hasPart: { $ref: "#/$defs/Many!LearningEntitlementSpecificationType" },
        isPartOf: { $ref: "#/$defs/Many!LearningEntitlementSpecificationType" },
        specialisationOf: {
          $ref: "#/$defs/Many!LearningEntitlementSpecificationType",
        },
        generalisationOf: {
          $ref: "#/$defs/Many!LearningEntitlementSpecificationType",
        },
        status: { $ref: "#/$defs/StringType" },
      },
      required: ["title", "entitlementStatus", "dcType"],
    },
    "Many!LearningOpportunityType": {
      anyOf: [
        { $ref: "#/$defs/LearningOpportunityType" },
        { type: "array", items: { $ref: "#/$defs/LearningOpportunityType" } },
      ],
    },
    LearningOpportunityType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "LearningOpportunity" },
        dcType: { $ref: "#/$defs/Many!ConceptType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        homepage: { $ref: "#/$defs/Many!WebResourceType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        temporal: { $ref: "#/$defs/PeriodOfTimeType" },
        duration: { $ref: "#/$defs/DurationType" },
        mode: { $ref: "#/$defs/Many!ConceptType" },
        learningSchedule: { $ref: "#/$defs/ConceptType" },
        scheduleInformation: { $ref: "#/$defs/NoteType" },
        admissionProcedure: { $ref: "#/$defs/NoteType" },
        priceDetail: { $ref: "#/$defs/Many!PriceDetailType" },
        providedBy: { $ref: "#/$defs/OrganisationType" },
        grant: { $ref: "#/$defs/Many!GrantType" },
        location: { $ref: "#/$defs/Many!LocationType" },
        learningAchievementSpecification: {
          $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType",
        },
        learningActivitySpecification: {
          $ref: "#/$defs/LearningActivitySpecificationType",
        },
        hasPart: { $ref: "#/$defs/Many!LearningOpportunityType" },
        isPartOf: { $ref: "#/$defs/Many!LearningOpportunityType" },
        bannerImage: { $ref: "#/$defs/MediaObjectType" },
        applicationDeadline: { $ref: "#/$defs/Many!DateTimeType" },
        defaultLanguage: { $ref: "#/$defs/ConceptType" },
        descriptionHtml: { $ref: "#/$defs/Many!HTMLType" },
        dateModified: { $ref: "#/$defs/DateTimeType" },
        status: { $ref: "#/$defs/StringType" },
      },
      required: ["title"],
    },
    "Many!PriceDetailType": {
      anyOf: [
        { $ref: "#/$defs/PriceDetailType" },
        { type: "array", items: { $ref: "#/$defs/PriceDetailType" } },
      ],
    },
    PriceDetailType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "PriceDetail" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        prefLabel: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        amount: { $ref: "#/$defs/AmountType" },
      },
      required: [],
    },
    "Many!ResultCategoryType": {
      anyOf: [
        { $ref: "#/$defs/ResultCategoryType" },
        { type: "array", items: { $ref: "#/$defs/ResultCategoryType" } },
      ],
    },
    ResultCategoryType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "ResultCategory" },
        label: { $ref: "#/$defs/StringType" },
        score: { $ref: "#/$defs/StringType" },
        maximumScore: { $ref: "#/$defs/StringType" },
        minimumScore: { $ref: "#/$defs/StringType" },
        count: { $ref: "#/$defs/PositiveIntegerType" },
      },
      required: ["label", "count"],
    },
    "Many!ResultDistributionType": {
      anyOf: [
        { $ref: "#/$defs/ResultDistributionType" },
        { type: "array", items: { $ref: "#/$defs/ResultDistributionType" } },
      ],
    },
    ResultDistributionType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "ResultDistribution" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        resultCategory: { $ref: "#/$defs/Many!ResultCategoryType" },
      },
      required: [],
    },
    "Many!ShortenedGradingType": {
      anyOf: [
        { $ref: "#/$defs/ShortenedGradingType" },
        { type: "array", items: { $ref: "#/$defs/ShortenedGradingType" } },
      ],
    },
    ShortenedGradingType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "ShortenedGrading" },
        percentageLower: { $ref: "#/$defs/IntegerType" },
        percentageEqual: { $ref: "#/$defs/IntegerType" },
        percentageHigher: { $ref: "#/$defs/IntegerType" },
      },
      required: ["percentageLower", "percentageEqual", "percentageHigher"],
    },
    "Many!VerificationCheckType": {
      anyOf: [
        { $ref: "#/$defs/VerificationCheckType" },
        { type: "array", items: { $ref: "#/$defs/VerificationCheckType" } },
      ],
    },
    VerificationCheckType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "VerificationCheck" },
        dcType: { $ref: "#/$defs/ConceptType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        verificationStatus: { $ref: "#/$defs/ConceptType" },
        elmSubject: { $ref: "#/$defs/EuropeanDigitalCredentialType" },
      },
      required: ["verificationStatus", "subject", "dcType"],
    },
    "Many!EvidenceType": {
      anyOf: [
        { $ref: "#/$defs/EvidenceType" },
        { type: "array", items: { $ref: "#/$defs/EvidenceType" } },
      ],
    },
    EvidenceType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Evidence" },
        evidenceStatement: { $ref: "#/$defs/StringType" },
        evidenceTarget: { $ref: "#/$defs/AgentOrPersonOrOrganisationType" },
        embeddedEvidence: { $ref: "#/$defs/Many!MediaObjectType" },
        accreditation: { $ref: "#/$defs/AccreditationType" },
        dcType: { $ref: "#/$defs/ConceptType" },
      },
      required: [],
    },
    "Many!TermsOfUseType": {
      anyOf: [
        { $ref: "#/$defs/TermsOfUseType" },
        { type: "array", items: { $ref: "#/$defs/TermsOfUseType" } },
      ],
    },
    TermsOfUseType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "TermsOfUse" },
      },
      required: [],
    },
    "Many!ProofType": {
      anyOf: [
        { $ref: "#/$defs/ProofType" },
        { type: "array", items: { $ref: "#/$defs/ProofType" } },
      ],
    },
    ProofType: {
      type: "object",
      additionalProperties: false,
      properties: { id: { $ref: "#/$defs/URIType" }, type: { const: "Proof" } },
      required: [],
    },
    "Many!CredentialStatusType": {
      anyOf: [
        { $ref: "#/$defs/CredentialStatusType" },
        { type: "array", items: { $ref: "#/$defs/CredentialStatusType" } },
      ],
    },
    CredentialStatusType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: {
          type: "string",
          enum: ["CredentialStatus", "TrustedCredentialStatus2021"],
        },
      },
      required: [],
    },
    "Many!CredentialSchemaType": {
      anyOf: [
        { $ref: "#/$defs/CredentialSchemaType" },
        { type: "array", items: { $ref: "#/$defs/CredentialSchemaType" } },
      ],
    },
    CredentialSchemaType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { type: "string", enum: ["ShaclValidator2017", "JsonSchema"] },
      },
      required: [],
    },
    "Many!AmountType": {
      anyOf: [
        { $ref: "#/$defs/AmountType" },
        { type: "array", items: { $ref: "#/$defs/AmountType" } },
      ],
    },
    "Many!AwardingProcessType": {
      anyOf: [
        { $ref: "#/$defs/AwardingProcessType" },
        { type: "array", items: { $ref: "#/$defs/AwardingProcessType" } },
      ],
    },
    AwardingProcessType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "AwardingProcess" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        location: { $ref: "#/$defs/LocationType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        used: { $ref: "#/$defs/Many!LearningAssessmentType" },
        awards: { $ref: "#/$defs/Many!ClaimNodeType" },
        awardingBody: { $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType" },
        awardingDate: { $ref: "#/$defs/DateTimeType" },
        educationalSystemNote: { $ref: "#/$defs/ConceptType" },
      },
      required: ["awardingBody"],
    },
    "Many!DisplayParameterType": {
      anyOf: [
        { $ref: "#/$defs/DisplayParameterType" },
        { type: "array", items: { $ref: "#/$defs/DisplayParameterType" } },
      ],
    },
    DisplayParameterType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "DisplayParameter" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        language: { $ref: "#/$defs/Many!ConceptType" },
        primaryLanguage: { $ref: "#/$defs/ConceptType" },
        summaryDisplay: { $ref: "#/$defs/StringType" },
        individualDisplay: { $ref: "#/$defs/Many!IndividualDisplayType" },
      },
      required: ["title", "language", "primaryLanguage", "individualDisplay"],
    },
    "Many!IndividualDisplayType": {
      anyOf: [
        { $ref: "#/$defs/IndividualDisplayType" },
        { type: "array", items: { $ref: "#/$defs/IndividualDisplayType" } },
      ],
    },
    IndividualDisplayType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "IndividualDisplay" },
        language: { $ref: "#/$defs/ConceptType" },
        displayDetail: { $ref: "#/$defs/Many!DisplayDetailType" },
      },
      required: ["language", "displayDetail"],
    },
    "Many!DisplayDetailType": {
      anyOf: [
        { $ref: "#/$defs/DisplayDetailType" },
        { type: "array", items: { $ref: "#/$defs/DisplayDetailType" } },
      ],
    },
    DisplayDetailType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "DisplayDetail" },
        image: { $ref: "#/$defs/MediaObjectType" },
        page: { $ref: "#/$defs/PositiveIntegerType" },
      },
      required: ["image", "page"],
    },
    "Many!EuropeanDigitalPresentationType": {
      anyOf: [
        { $ref: "#/$defs/EuropeanDigitalPresentationType" },
        {
          type: "array",
          items: { $ref: "#/$defs/EuropeanDigitalPresentationType" },
        },
      ],
    },
    EuropeanDigitalPresentationType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "EuropeanDigitalPresentation" },
        verifiableCredential: {
          $ref: "#/$defs/Many!EuropeanDigitalCredentialType",
        },
        verificationCheck: { $ref: "#/$defs/Many!VerificationCheckType" },
        holder: { $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType" },
        proof: { $ref: "#/$defs/Many!ProofType" },
      },
      required: [],
    },
    "Many!GradingSchemeType": {
      anyOf: [
        { $ref: "#/$defs/GradingSchemeType" },
        { type: "array", items: { $ref: "#/$defs/GradingSchemeType" } },
      ],
    },
    GradingSchemeType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "GradingScheme" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
      },
      required: ["title"],
    },
    "Many!GrantType": {
      anyOf: [
        { $ref: "#/$defs/GrantType" },
        { type: "array", items: { $ref: "#/$defs/GrantType" } },
      ],
    },
    GrantType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "Grant" },
        dcType: { $ref: "#/$defs/ConceptType" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        contentURL: { $ref: "#/$defs/URIType" },
      },
      required: ["title"],
    },
    "Many!ClaimTypeNodeType": {
      anyOf: [
        { $ref: "#/$defs/ClaimTypeNodeType" },
        { type: "array", items: { $ref: "#/$defs/ClaimTypeNodeType" } },
      ],
    },
    ClaimTypeNodeType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "ClaimTypeNode" },
        title: { $ref: "#/$defs/Many!LangStringType" },
        description: { $ref: "#/$defs/Many!LangStringType" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        additionalNote: { $ref: "#/$defs/Many!NoteType" },
        supplementaryDocument: { $ref: "#/$defs/Many!WebResourceType" },
        awardedBy: { $ref: "#/$defs/AwardingProcessType" },
      },
      required: ["title", "awardedBy"],
    },
    EuropeanDigitalCredentialType: {
      type: "object",
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "VerifiableCredential",
              "VerifiableAttestation",
              "EuropeanDigitalCredential",
            ],
          },
          minItems: 3,
          uniqueItems: true,
        },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        credentialProfiles: { $ref: "#/$defs/Many!ConceptType" },
        attachment: { $ref: "#/$defs/Many!MediaObjectType" },
        displayParameter: { $ref: "#/$defs/DisplayParameterType" },
        issuer: {
          anyOf: [
            { $ref: "#/$defs/AgentOrPersonOrOrganisationType" },
            { $ref: "#/$defs/URIType" },
          ],
        },
        credentialSubject: { $ref: "#/$defs/AgentOrPersonOrOrganisationType" },
        issuanceDate: { $ref: "#/$defs/DateTimeType" },
        issued: { $ref: "#/$defs/DateTimeType" },
        validFrom: { $ref: "#/$defs/DateTimeType" },
        expirationDate: { $ref: "#/$defs/Many!DateTimeType" },
        validUntil: { $ref: "#/$defs/DateTimeType" },
        proof: { $ref: "#/$defs/Many!ProofType" },
        evidence: { $ref: "#/$defs/Many!EvidenceType" },
        termsOfUse: { $ref: "#/$defs/Many!TermsOfUseType" },
        credentialSchema: { $ref: "#/$defs/Many!CredentialSchemaType" },
        credentialStatus: { $ref: "#/$defs/Many!CredentialStatusType" },
        holder: { $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType" },
      },
      required: [
        "credentialProfiles",
        "displayParameter",
        "issuer",
        "credentialSubject",
        "issued",
        "validFrom",
        "credentialSchema",
      ],
    },
    "Many!IdentifierOrLegalIdentifierType": {
      anyOf: [
        { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        {
          type: "array",
          items: { $ref: "#/$defs/IdentifierOrLegalIdentifierType" },
        },
      ],
    },
    "Many!MediaObjectType": {
      anyOf: [
        { $ref: "#/$defs/MediaObjectType" },
        { type: "array", items: { $ref: "#/$defs/MediaObjectType" } },
      ],
    },
    "Many!DateTimeType": {
      anyOf: [
        { $ref: "#/$defs/DateTimeType" },
        { type: "array", items: { $ref: "#/$defs/DateTimeType" } },
      ],
    },
    "Many!LearningAchievementSpecificationOrQualificationType": {
      anyOf: [
        { $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType" },
        {
          type: "array",
          items: {
            $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType",
          },
        },
      ],
    },
    LearningAchievementSpecificationOrQualificationType: {
      anyOf: [
        { $ref: "#/$defs/LearningAchievementSpecificationType" },
        { $ref: "#/$defs/QualificationType" },
      ],
    },
    "Many!AwardingOpportunityType": {
      anyOf: [
        { $ref: "#/$defs/AwardingOpportunityType" },
        { type: "array", items: { $ref: "#/$defs/AwardingOpportunityType" } },
      ],
    },
    AwardingOpportunityType: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { $ref: "#/$defs/URIType" },
        type: { const: "AwardingOpportunity" },
        identifier: { $ref: "#/$defs/Many!IdentifierOrLegalIdentifierType" },
        location: { $ref: "#/$defs/LocationType" },
        temporal: { $ref: "#/$defs/PeriodOfTimeType" },
        awardingBody: { $ref: "#/$defs/Many!AgentOrPersonOrOrganisationType" },
        learningAchievementSpecification: {
          $ref: "#/$defs/LearningAchievementSpecificationOrQualificationType",
        },
      },
      required: ["awardingBody"],
    },
  },
};
export const examples = {
  bengalesHighSchoolDiploma: {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "http://data.europa.eu/snb/model/context/edc-ap",
    ],
    id: "urn:credential:87ddce4d-de74-4838-b7a4-1f14d9c614ec",
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ],
    credentialSchema: [
      {
        id: "http://data.europa.eu/snb/model/ap/edc-generic-full",
        type: "ShaclValidator2017",
      },
      {
        id: "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/0x7ff3bc76bd5e37b3d29721b8698646a722a24a4f4ab0a0ba63d4bbbe0ef9758d",
        type: "JsonSchema",
      },
    ],
    credentialSubject: {
      id: "did:key:afsdlkj34134",
      type: "Person",
      identifier: [
        {
          id: "urn:epass:identifier:2",
          type: "Identifier",
          notation: "5547554",
          schemeName: "Student ID",
        },
      ],
      givenName: { en: ["David"] },
      familyName: { en: ["Smith"] },
      fullName: { en: ["David Smith"] },
      hasClaim: [
        {
          id: "urn:epass:learningAchievement:6",
          type: "LearningAchievement",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          title: {
            en: [
              "Higher  Education Entrance Qualification - German International ABITUR School",
            ],
          },
          entitlesTo: [
            {
              id: "urn:epass:entitlement:1",
              type: "LearningEntitlement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              description: {
                en: [
                  "The owner completed the Higher Education Entrace Qualification for admission to Higher Education instititutions",
                ],
              },
              title: { en: ["Passed the German International Abitur"] },
              specifiedBy: {
                id: "urn:epass:learningEntitlementSpec:1",
                type: "LearningEntitlementSpecification",
                title: { en: ["Passed the German International Abitur"] },
                dcType: [
                  {
                    id: "http://data.europa.eu/snb/entitlement/64aad92881",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/snb/entitlement/25831c2",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["learning opportunity"] },
                  },
                ],
                entitlementStatus: {
                  id: "http://data.europa.eu/snb/entitlement-status/b7015a8a8c",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/entitlement-status/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["actual"] },
                },
              },
            },
          ],
          hasPart: [
            {
              id: "urn:epass:learningAchievement:1",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              description: {
                en: [
                  "Individual results achieved during the Qualilification phase Q",
                ],
              },
              title: { en: ["History"] },
              provenBy: [
                {
                  id: "urn:epass:learningAssessment:1",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["History semester 3"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:1",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["History semester 3"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:2",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["History semester 1"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:2",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["History semester 1"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:3",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["History semester 2"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:3",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["History semester 2"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:4",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["History semester 4"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:4",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["History semester 4"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:1",
                type: "LearningAchievementSpecification",
                additionalNote: [
                  {
                    id: "urn:epass:note:3",
                    type: "Note",
                    noteLiteral: {
                      en: [
                        "ISCED 0232: Literature and linguistics. Currently no specific code for native language(?) (Aktuell kein spezifischer code für Muttersprache(?))",
                      ],
                    },
                    subject: {
                      id: "urn:epass:concept:dbd7241e-e450-4160-84a3-cc4be281a773",
                      type: "Concept",
                      inScheme: {
                        id: "urn:epass:conceptScheme:66cfdba4-db7f-4257-bd24-3ea52844d50d",
                        type: "ConceptScheme",
                      },
                      prefLabel: { en: ["More Information"] },
                    },
                  },
                ],
                title: { en: ["History"] },
              },
            },
            {
              id: "urn:epass:learningAchievement:2",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              description: {
                en: [
                  "Individual results achieved during the Qualilification phase Q",
                ],
              },
              title: { en: ["Art"] },
              provenBy: [
                {
                  id: "urn:epass:learningAssessment:5",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Art semester 1"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:5",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Art semester 1"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:6",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Art semester 2"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:6",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Art semester 2"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:7",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Art semester 3"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:7",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Art semester 3"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:8",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Art semester 4"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:8",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Art semester 4"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:2",
                type: "LearningAchievementSpecification",
                additionalNote: [
                  {
                    id: "urn:epass:note:4",
                    type: "Note",
                    noteLiteral: {
                      en: [
                        "ISCED 0232: Literature and linguistics. Currently no specific code for native language(?) (Aktuell kein spezifischer code für Muttersprache(?))",
                      ],
                    },
                    subject: {
                      id: "urn:epass:concept:49166b48-abb0-4d47-a63d-095f0bab0c4d",
                      type: "Concept",
                      inScheme: {
                        id: "urn:epass:conceptScheme:abb415ab-8d9b-4974-8a5c-0e8cdaa22ee1",
                        type: "ConceptScheme",
                      },
                      prefLabel: { en: ["More Information"] },
                    },
                  },
                ],
                title: { en: ["Art"] },
              },
            },
            {
              id: "urn:epass:learningAchievement:3",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              description: {
                en: [
                  "Individual results achieved during the Qualilification phase Q",
                ],
              },
              title: { en: ["Religion"] },
              provenBy: [
                {
                  id: "urn:epass:learningAssessment:9",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Religion semester 1"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:9",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Religion semester 1"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:10",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Religion semester 2"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:10",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Religion semester 2"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:11",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Religion semester 4"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:11",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Religion semester 4"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:12",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Religion semester 3"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:12",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Religion semester 3"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:3",
                type: "LearningAchievementSpecification",
                additionalNote: [
                  {
                    id: "urn:epass:note:5",
                    type: "Note",
                    noteLiteral: {
                      en: [
                        "ISCED 0232: Literature and linguistics. Currently no specific code for native language(?) (Aktuell kein spezifischer code für Muttersprache(?))",
                      ],
                    },
                    subject: {
                      id: "urn:epass:concept:f2ec5f98-5cbc-4ef2-a166-772070f955c4",
                      type: "Concept",
                      inScheme: {
                        id: "urn:epass:conceptScheme:1e6dba61-3cbd-4d32-80d9-a59a860b56f6",
                        type: "ConceptScheme",
                      },
                      prefLabel: { en: ["More Information"] },
                    },
                  },
                ],
                title: { en: ["History"] },
              },
            },
            {
              id: "urn:epass:learningAchievement:4",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              description: {
                en: [
                  "Individual results achieved during the Qualilification phase Q",
                ],
              },
              title: { en: ["English"] },
              provenBy: [
                {
                  id: "urn:epass:learningAssessment:13",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["English semester 1"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:13",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["English semester 1"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:14",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["English semester 2"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:14",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["English semester 2"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:15",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["English semester 3"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:15",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["English semester 3"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:16",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["English semester 4"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:16",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["English semester 4"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:4",
                type: "LearningAchievementSpecification",
                additionalNote: [
                  {
                    id: "urn:epass:note:6",
                    type: "Note",
                    noteLiteral: {
                      en: [
                        "ISCED 0232: Literature and linguistics. Currently no specific code for native language(?) (Aktuell kein spezifischer code für Muttersprache(?))",
                      ],
                    },
                    subject: {
                      id: "urn:epass:concept:7570d85a-516c-42f7-acdf-e372482ef498",
                      type: "Concept",
                      inScheme: {
                        id: "urn:epass:conceptScheme:e9ecb7a8-7078-4748-ad02-a8b7209902db",
                        type: "ConceptScheme",
                      },
                      prefLabel: { en: ["More Information"] },
                    },
                  },
                ],
                title: { en: ["English"] },
              },
            },
            {
              id: "urn:epass:learningAchievement:5",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              description: {
                en: [
                  "Individual results achieved during the Qualilification phase Q",
                ],
              },
              title: { en: ["German"] },
              provenBy: [
                {
                  id: "urn:epass:learningAssessment:17",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["German semester 1"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:17",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["German semester 1"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:18",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["German semester 2"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:18",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["German semester 2"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:19",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["German semester 3"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:19",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["German semester 3"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:20",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["German semester 4"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:20",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["German semester 4"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:5",
                type: "LearningAchievementSpecification",
                additionalNote: [
                  {
                    id: "urn:epass:note:7",
                    type: "Note",
                    noteLiteral: {
                      en: [
                        "ISCED 0232: Literature and linguistics. Currently no specific code for native language(?) (Aktuell kein spezifischer code für Muttersprache(?))",
                      ],
                    },
                    subject: {
                      id: "urn:epass:concept:fe5c7749-eb18-4298-9e59-d622e50023cf",
                      type: "Concept",
                      inScheme: {
                        id: "urn:epass:conceptScheme:e0820f5a-4f18-48bd-9352-b61d83456c91",
                        type: "ConceptScheme",
                      },
                      prefLabel: { en: ["More Information"] },
                    },
                  },
                ],
                title: { en: ["German"] },
              },
            },
          ],
          provenBy: [
            {
              id: "urn:epass:learningAssessment:23",
              type: "LearningAssessment",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Overall Qualification Q+A"] },
              grade: {
                id: "urn:epass:note:2",
                type: "Note",
                noteLiteral: { en: ["Excellent (5)"] },
              },
              hasPart: [
                {
                  id: "urn:epass:learningAssessment:21",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: [" Qualification Phase (Q) results"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:21",
                    type: "LearningAssessmentSpecification",
                    title: { en: [" Qualification Phase (Q) results"] },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:22",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Final Examination results (A)"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:22",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Final Examination results (A)"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAssessmentSpec:23",
                type: "LearningAssessmentSpecification",
                title: { en: ["Overall Diploma Assessment"] },
                gradingScheme: {
                  id: "urn:epass:gradingScheme:1",
                  type: "GradingScheme",
                  description: {
                    en: [
                      "The Germany national grading scheme for High school consists of  six grade levels with\\n                                    numerical equivalents: sehr gut \\u2013 1 (very good); gut \\u2013 2 (good);\\n                                    befriedigend \\u2013 3 (satisfatory); ausrcichend \\u2013 4 (addequate);\\n                                    mangelhalft  \\u2013 5 (unsatisfactory- fail); ungenügend \\u2013 6\\n                                    (insufficient- fail). The minimum passing grade is ausrcichend \\u2013\\n                                    4. /n Equivalents in points: 15, 14, 13 \\u2013 1 (very good); 12, 11,\\n                                    10 \\u2013 2 (good); 09, 08, 07\\u2013 3 (satisfatory); 06, 05, 04\\u2013 4\\n                                    (addequate); 03, 02, 01\\u2013 5 (unsatisfactory- fail); 0\\u2013 6\\n                                    (insufficient- fail).",
                    ],
                  },
                  title: { en: ["Grading scheme in Germany"] },
                },
              },
            },
          ],
          specifiedBy: {
            id: "urn:epass:qualification:1",
            type: "Qualification",
            title: { en: ["German International Abitur"] },
            creditPoint: [
              {
                id: "urn:epass:creditPoint:1",
                type: "CreditPoint",
                framework: {
                  id: "http://data.europa.eu/snb/education-credit/6fcec5c5af",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/education-credit/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["European Credit Transfer System"] },
                },
                point: "0",
              },
            ],
            maximumDuration: "P21D",
            volumeOfLearning: "P60D",
            nqfLevel: [
              {
                id: "http://data.europa.eu/snb/qdr/c_bd9f8e42",
                type: "Concept",
                inScheme: {
                  id: "http://data.europa.eu/snb/qdr/25831c2",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["DQR Level 5"] },
              },
            ],
            eqfLevel: {
              id: "http://data.europa.eu/snb/eqf/4",
              type: "Concept",
              inScheme: {
                id: "http://data.europa.eu/snb/eqf/25831c2",
                type: "ConceptScheme",
              },
              prefLabel: { en: ["Level 4"] },
            },
            isPartialQualification: true,
          },
        },
      ],
    },
    issuanceDate: "2024-03-26T16:03:32+01:00",
    issuer: {
      id: "did:ebsi:org:12345689",
      type: "Organisation",
      location: [
        {
          id: "urn:epass:certificateLocation:1",
          type: "Location",
          address: {
            id: "urn:epass:certificateAddress:1",
            type: "Address",
            countryCode: {
              id: "http://publications.europa.eu/resource/authority/country/ESP",
              type: "Concept",
              inScheme: {
                id: "http://publications.europa.eu/resource/authority/country",
                type: "ConceptScheme",
              },
              notation: "country",
              prefLabel: { en: "Spain" },
            },
          },
        },
      ],
      identifier: {
        id: "urn:epass:identifier:2",
        type: "Identifier",
        schemeName: "University Aliance ID",
        notation: "73737373",
      },
      legalName: { en: "ORGANIZACION TEST" },
    },
    issued: "2024-03-26T16:03:32+01:00",
    validFrom: "2020-07-20T00:00:00+02:00",
    credentialProfiles: [
      {
        id: "http://data.europa.eu/snb/credential/e34929035b",
        type: "Concept",
        inScheme: {
          id: "http://data.europa.eu/snb/credential/25831c2",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["Generic"] },
      },
    ],
    displayParameter: {
      id: "urn:epass:displayParameter:1",
      type: "DisplayParameter",
      language: [
        {
          id: "http://publications.europa.eu/resource/authority/language/ENG",
          type: "Concept",
          inScheme: {
            id: "http://publications.europa.eu/resource/authority/language",
            type: "ConceptScheme",
          },
          prefLabel: { en: ["English"] },
          notation: "language",
        },
      ],
      description: {
        en: [
          "EBSI Example (not 100% complete) - https://github.com/Knowledge-Innovation-Centre/ESBI-JSON-schemas/blob/main/examples%20of%20credentials/German%20example/Bengales_highSchoolDiploma_v1.json",
        ],
      },
      individualDisplay: [
        {
          id: "urn:epass:individualDisplay:f36142e4-9ce0-4aca-b80f-2a3762daee76",
          type: "IndividualDisplay",
          language: {
            id: "http://publications.europa.eu/resource/authority/language/ENG",
            type: "Concept",
            inScheme: {
              id: "http://publications.europa.eu/resource/authority/language",
              type: "ConceptScheme",
            },
            prefLabel: { en: ["English"] },
            notation: "language",
          },
          displayDetail: [
            {
              id: "urn:epass:displayDetail:059df8bd-e802-49fc-8e92-2568d0333432",
              type: "DisplayDetail",
              image: {
                id: "urn:epass:mediaObject:77eeb2c5-01c8-4962-9217-e49a108e0a76",
                type: "MediaObject",
                content:
                  "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCARjAxoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiobq7trG2e5u7iK3gTG6WZwirk4GSeByQKgsdY0zVGddP1G0u2QAuLedZCuemcE4oAu0UUUAFFFFABRRRQAUUUUAFFZjeI9DS7Nq2s6cLkP5ZhN0m8PnG3Gc5zxitOgAooqhe63pOmTLDf6pZWsrLuCT3CRsV6ZwT04P5UAX6KjgnhuoEnt5UlhkG5JI2DKw9QR1qSgAooooAKKzG8R6Gl2bVtZ04XIfyzCbpN4fONuM5znjFadABRRRQAUUUUAFFFFABRRWbdeIdEsbl7a81jT7edMboprlEZcjIyCcjgg0AaVFIrBlDKQVIyCOhpaACiiigAooooAKKKKACiobq7trG2e5u7iK3gTG6WZwirk4GSeByQKgsdY0zVGddP1G0u2QAuLedZCuemcE4oAu0UUUAFFFFABRWZbeI9DvLhLe11nTp53OFjiukZmPsAcmtOgAooooAKKhuru2sbZ7m7uIreBMbpZnCKuTgZJ4HJAqCx1jTNUZ10/UbS7ZAC4t51kK56ZwTigC7RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRR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igAooooAKKKKACiiigAooooAKKKKACqd9pOm6p5f9oafaXfl52faIVk25xnGQcZwPyq5RQBBaWVrp9uLeytobaBSSI4YwijPXgcVPRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUF5dxWNnNdTkiOJC7YGScdgO5qeqGtWkt7pFxBAFM2A8YY4DMpDAE9gSMUANhudVd0aXTbeOFiM/6WWkUH1XZtyPZj+NMk1K7mvZ7bTbOKf7OQs0k85iQOQG2jCsScEE8Ac9c5p8OsRTSJF9lv0lYgFXtJAFPfL428eoJHpmsp7G3stRvmvE1TZcTedHJaSXBUgqoIKxHggg9RyMc9cAF6fX1g0SXUHtZA8EqwzW+fmVt4U4Iznrkeox0zVXW7zWE0h5VtIID58AXF4wfBkUEHCYHYEAkYJ545Lmzi/sFxY212POu4ZWE3mNI2JY8sd5LY2r36AVoa9BLcaPKkEZkkVo5Qi9W2OrED3IWgBt7dTQ6X5uoWVux+0RIIo5i68yIA2Sg5BOcY7Dn0o+IBdXGqaXZrZ2tzayO7NHPMVDsEPDDYwIGc9+cccZqzqk39paNm2huCRdW/yvA6NxKhJ2sAcAc56cH0qa/ikfWtJkWNmRGl3sBkLlCBk9qAItOmkXVpLOfTrS2kitYyj28pcbNzALyi4AwfzpRql9dNM+nafFPbxO0fmS3PlmRlJDbAFbIBBGSRyPTmpEikHieaby28o2cah8cEh3OM+vIrHtrG001JLW8j1gOssjK1tJdNG6sxYEeWSFODyDjnPbmgDVfWhJa2L2duZZr0lY45X8sIQCW3nBxjBHAPP51etJLx1b7ZbwwuD8ohmMgI+pVf5VmyQ6bbaTbwy2F2bYsXUCKSWSNySdxK5cMSTz707RWma4uwn2z+zwEEBvFYSbvm343/Pt+5jdznd2xQA3X7i+guNJFkkbeZd7XDztGG/duQDhTkcZ/AcekWt3FxEuiyzWwNx9vA8mGTeCTHIBhiF9skgY5q3rccm2xuUieVbW6WWRY13Nt2spIA5ON2cDnimX7G9k0eeCKYot7ubdEyFR5cgyQQCBkjr6j1oAlg1C6XUI7O/tIoHmRmheGcyK23GQcqpB5z0PAPNPuJ9TWd1tbC3kiXGHmujGW4zwAjfTkjp+NR38Uj61pMixsyI0u9gMhcoQMntWbLFb/wBp3/8Aa2mz3rtIDa5tWmj8vYuAvBVDu3Zzj1zjFAEmr6ncXHhpLzT0KSNcRI6ySmNkImCsuVB53Aqe2M9eh2rVrp4ibuGGKTPCxSmQY9clV/lXN2en3ieCXtjaeXcJdyzC3jXaMC6aTaoOOCBx2ORXSWt1HeRGSNZlUHGJoXiP5MAfxoAnooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopCcAk549Bmuan+IHhu21D+z57y4jvMgeQ1jOHOeny7M1UYSl8KuTKUY/E7HTUVgp408PtdJbSX5tpn4VbuCS33fTzFWt7rRKMo/ErDUk9mFFFFSMKKKKACiqGsa3p2gWQvNUultoC4jDsCcsegwAT2P5VeVldFdGDKwyCDkEU7O1xXV7C0VHcTpbQPM6yMqDJEcbOx+iqCT+ArJ8P8AijTfE32o6aZmW1cJI0kRT5jngZ54xz9aajJpyS0QOSTt1NqiisrUvEmkaTcpa3l4q3MgysEaNJIR67EBOPwpKLk7JA2lqzVorGtfFmhXt5DZW+oxtdzMVS3KsJMhSxyhGVGATkgVs0Si47qwKSezCiiikMKKq6lqVppGnzX9/OsFrCMySMCcc46Dk8kU+zvLfULOG7tJVlt5kDxuvRgehp2dr9BXV7E9FFYNr4v0q98QnQ4PtRvlQu6SWzx7FAzk7gD3H501GUr2WwOSW5vUUUVIwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvJfDijxF8bdY1XG6DTlaND23ACIfnhzXpeuakukaFf6i2MW0DyAHuQOB+JwK4X4Maa0Hhi61SXJlv7kncerKnA/8eL11UfcpTn8vv3Oer71SMPmdxrui2mv6PcadeRq8cqEAkZKN2YehBrhPg1r11qOi3ulXcjSNpzqImY5IRs4X8Cp/MV3HiPWItB8O32pysB5ERKZ/ifoo/EkCvMfhp/xSfgLWvFN7Gdk2PJQ8bwmQv5u+PwqqUXLDyT7q3qTUdq0Wuzv6Hqt9q9jp0kUVzPiaXPlworSSPjrhFBY/gKrW/ibSLrU002K7zevG0nkGJ1ZVBIO4EfL06HBrD+H2nTtpR8Rao3m6tqw855G/giP3EX0XGDj39qyvA7Ra58QvFXiKLDQhktIHHRgAASP++FP41Hsorm/u/mX7ST5fP8jsrLxJpGoarLpdpepLexJ5jxBWBVcgZyRjuPzqWbXNNt9at9Hmu0TULiMyRQkHLKM85xjseM9jXG6qPsPxt0SdRtW+sJIXI7lQ5/ov5V0M1jFq/jCzvvKUx6QkiibHLyuANoPoq5J92HcGlKnBWfRq/wA/+HGpyd11Tt/XyK/iHVfCt7d2/h/W8TzzTqIrd4JOXzgEEDHfrnHWunASKMABURR06AAV504/t743ov3oNEs8n08xh/P5x/3zUvia+m8TeNrbwXbSMljGn2jVGQ4LpwRHkdAcrn/eHpVOjflin0u/IlVbXlbrZeZ0Go+MtJtdKu7uC580QxSNHIsTmKR1UnasmNhPHQGsz4Vaa1h4FtppAfOvpHunJ6nJwP8Ax1Qfxqh8VpIYvClloFqiLNf3MUFvCowAqkdB6A7R+Nd7Y2kdhYW1nCMRW8SxJ9FAA/lSlaNHT7T/AC/4ccbyq69F+ZPXk/g7Vo9M+KXiSy1vMWoX0+LaSXoVDMVQE9ipTHrtA9K9TnuYbYRmZwgkdY1z3YnAFcl4/wDA0PivT/tFtiLV7dc28o43452MfT0PY/jSw8oq8J7S0uFaMnaUd10Ni70GGbxZYa8RGrWttNE7H7xLFdv4AeZ+dPsvFGialqbadY6lDc3SoXZISWAUYySRx3HesD4YeJbzxD4addRJa8spfIkkbq4wCCffsfpnvXN+CYm8U+MfFGqMG+xTTiJpBx5kQJxGD6EBS3sMfxcX7F+8qj+H/Mn2vwuH2j0Kw8VaHqmqy6ZY6lDPeRKWaNMngHBw2MH8DRD4r0K51w6LDqUMmoDP7lcnkdRnGMjB4zng1wOmwNr/AMWNd+ygw2llAtkZIvl8tBgMqkdGJVgPQFu4FXbS1h1D4z7LaJI7TQdPEaLGuFDsOB+Uh/75puhBX32uCrTdvWx0virXfDVnaPp3iF8w3ICmEwSMJO4AKjrnHeptY1jTvBnh9XFnObeCPbFBbQlsADueij3J/OuW8ZD+3PiX4X0IfNFbE3s47YByAf8Avgj/AIFV34r3kkXg8afBzcalcx2yKOpydx/9BA/GlGkm6cX11YSqNc8uxoeBvEc/iHSPtN6JUupWaUR/ZnSOOMnCKrlQr8AHIJ61g+Ebm3uvGPi/xVdzRxWsUos45nYBQiYDHJ/3UP411uozReFvBc7xEBNPstsfuVXCj8TiuT+GWjqPB9ne6gmIFd7iOOTozknMzD1AAC+mCe4w1y8k5rRPT9RPm5oxerWv6HZ6L4j0jxEkz6TepciBgsm0EFSenBA9Dz7VqV538KY2vIdd8Quu06pfsyDH8Ckkfq5H4V6JWFaChUcV0NqU3OCkwooorI0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDi/iRaa7rHh6TR9F0uW4NwymWbzokUKDnHzMDnIHbGKXwzJrWh+GLDSz4Vu/OtogjH7Vb7GbqTkPnkknpXZ0Vsq3uezsrb9f8zL2Xv8APfU4a/8ACWreL72CTxNcQ2+mQPvj0yzctvPrJIQMntwOnTFaXjPw1Jrfgq40bTRFC4VPIj+6nyEEL7DAx+VdPRS9tO6a6bD9lGzT6nH6LB4ku9Dt9L1PTYNNiggWGR1uRI84UYwoXhAccnJOCQPUVfhv4e1rQdIa21KGK0/fvM6I6u0zMAATjhVAA4ByT6Ywe6opus2nGysxKkk077HHeKfDOpaz4t0DULG4W2jshN50/BZQcABQepPzc9B+h6y2torO2jt4F2xoMAZyfqT3J6k96loqJVJSiovoWoJNtdTgfDHh7XrDxR4guruCOCG/vPNF0JQzPErMVRV7ZyMk446DPIhOheIdC+I+o67p2mRanaahEEINysTRH5eue2V7A8H2r0SitPrErttLVWM/YxslfZ3POdc8MeIb7xloOtG3trz7NuaVPP8ALihb+EDIJIBwcgZJz0GAPQbaOWK3RJ5vOlHLvt2gk88DsPT27nrUtFROq5pJ9C4U1Ftrqcz400nWNYsbCHRZYYbiG8S5MszEKuwMQCACTltvam3GqeLDZmCD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UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9k=",
                contentEncoding: {
                  id: "http://data.europa.eu/snb/encoding/6146cde7dd",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/encoding/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["base64"] },
                },
                contentType: {
                  id: "http://publications.europa.eu/resource/authority/file-type/JPEG",
                  type: "Concept",
                  inScheme: {
                    id: "http://publications.europa.eu/resource/authority/file-type",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["JPEG"] },
                  notation: "file-type",
                },
              },
              page: 1,
            },
          ],
        },
      ],
      primaryLanguage: {
        id: "http://publications.europa.eu/resource/authority/language/ENG",
        type: "Concept",
        inScheme: {
          id: "http://publications.europa.eu/resource/authority/language",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["English"] },
        notation: "language",
      },
      title: { en: ["Bengales_highSchoolDiploma"] },
    },
  },
  digiCompGeneric: {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "http://data.europa.eu/snb/model/context/edc-ap",
    ],
    id: "urn:credential:dffc6c22-1421-4df2-b0e4-2b9d17aa0a6b",
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ],
    credentialSchema: [
      {
        id: "http://data.europa.eu/snb/model/ap/edc-generic-full",
        type: "ShaclValidator2017",
      },
      {
        id: "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/0x7ff3bc76bd5e37b3d29721b8698646a722a24a4f4ab0a0ba63d4bbbe0ef9758d",
        type: "JsonSchema",
      },
    ],
    credentialSubject: {
      id: "did:key:afsdlkj34134",
      type: "Person",
      identifier: [
        {
          id: "urn:epass:identifier:2",
          type: "Identifier",
          notation: "545465468",
          schemeName: "Student ID",
        },
      ],
      givenName: { en: ["David"] },
      familyName: { en: ["Smith"] },
      fullName: { en: ["David Smith"] },
      hasClaim: [
        {
          id: "urn:epass:learningAchievement:2",
          type: "LearningAchievement",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          title: { en: ["TITLE OF PROGRAMME"] },
          hasPart: [
            {
              id: "urn:epass:learningAchievement:1",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Topic #1"] },
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:1",
                type: "LearningAchievementSpecification",
                title: { en: ["Topic #1"] },
                learningOutcome: [
                  {
                    id: "urn:epass:learningOutcome:1",
                    type: "LearningOutcome",
                    relatedSkill: [
                      {
                        id: "http://data.europa.eu/snb/dcf/860966ekgo",
                        type: "Concept",
                        inScheme: {
                          id: "https://publications.europa.eu/resource/authority/snb/dcf/25831c2",
                          type: "ConceptScheme",
                        },
                        prefLabel: {
                          en: ["5.4 Identifying digital competence gaps"],
                        },
                      },
                    ],
                    title: { en: ["Name of DigiComp Competence"] },
                  },
                ],
              },
            },
            {
              id: "urn:epass:learningAchievement:1",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Topic #1"] },
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:1",
                type: "LearningAchievementSpecification",
                title: { en: ["Topic #1"] },
                learningOutcome: [
                  {
                    id: "urn:epass:learningOutcome:1",
                    type: "LearningOutcome",
                    relatedSkill: [
                      {
                        id: "http://data.europa.eu/snb/dcf/860966ekgo",
                        type: "Concept",
                        inScheme: {
                          id: "https://publications.europa.eu/resource/authority/snb/dcf/25831c2",
                          type: "ConceptScheme",
                        },
                        prefLabel: {
                          en: ["5.4 Identifying digital competence gaps"],
                        },
                      },
                    ],
                    title: { en: ["Name of DigiComp Competence"] },
                  },
                ],
              },
            },
          ],
          provenBy: [
            {
              id: "urn:epass:learningAssessment:1",
              type: "LearningAssessment",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Overall Diploma Assessment"] },
              grade: {
                id: "urn:epass:note:2",
                type: "Note",
                noteLiteral: { en: ["10"] },
              },
              specifiedBy: {
                id: "urn:epass:learningAssessmentSpec:1",
                type: "LearningAssessmentSpecification",
                title: { en: ["Overall Diploma Assessment"] },
              },
            },
          ],
          specifiedBy: {
            id: "urn:epass:qualification:1",
            type: "Qualification",
            title: { en: ["Title of Achievement"] },
            learningOutcome: [
              {
                id: "urn:epass:learningOutcome:2",
                type: "LearningOutcome",
                relatedSkill: [
                  {
                    id: "https://publications.europa.eu/resource/authority/snb/dcf/860966ekgo",
                    type: "Concept",
                    inScheme: {
                      id: "https://publications.europa.eu/resource/authority/snb/dcf/25831c2",
                      type: "ConceptScheme",
                    },
                    prefLabel: {
                      en: ["5.4 Identifying digital competence gaps"],
                    },
                  },
                ],
                title: { en: ["Name of DigiComp Competence"] },
              },
              {
                id: "urn:epass:learningOutcome:3",
                type: "LearningOutcome",
                relatedSkill: [
                  {
                    id: "http://data.europa.eu/snb/dcf/34v10n662m",
                    type: "Concept",
                    inScheme: {
                      id: "https://publications.europa.eu/resource/authority/snb/dcf/25831c2",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["3.1 Proficiency Level Foundation 2"] },
                  },
                ],
                title: { en: ["Name of DigiComp Competence 2"] },
              },
            ],
            learningOutcomeSummary: {
              id: "urn:epass:note:3",
              type: "Note",
              noteLiteral: {
                en: [
                  "- Description of DigiCompCompetence\n- Description of DigiCompCompetence 2",
                ],
              },
            },
            eqfLevel: {
              id: "http://data.europa.eu/snb/eqf/5",
              type: "Concept",
              inScheme: {
                id: "http://data.europa.eu/snb/eqf/25831c2",
                type: "ConceptScheme",
              },
              prefLabel: { en: ["Level 5"] },
            },
          },
        },
      ],
    },
    issuer: {
      id: "did:ebsi:org:12345689",
      type: "Organisation",
      location: [
        {
          id: "urn:epass:certificateLocation:1",
          type: "Location",
          address: {
            id: "urn:epass:certificateAddress:1",
            type: "Address",
            countryCode: {
              id: "http://publications.europa.eu/resource/authority/country/ESP",
              type: "Concept",
              inScheme: {
                id: "http://publications.europa.eu/resource/authority/country",
                type: "ConceptScheme",
              },
              notation: "country",
              prefLabel: { en: "Spain" },
            },
          },
        },
      ],
      identifier: {
        id: "urn:epass:identifier:2",
        type: "Identifier",
        schemeName: "University Aliance ID",
        notation: "73737373",
      },
      legalName: { en: "ORGANIZACION TEST" },
    },
    issuanceDate: "2024-03-26T16:06:50+01:00",
    issued: "2024-03-26T16:06:50+01:00",
    validFrom: "2019-09-20T00:00:00+02:00",
    credentialProfiles: [
      {
        id: "http://data.europa.eu/snb/credential/e34929035b",
        type: "Concept",
        inScheme: {
          id: "http://data.europa.eu/snb/credential/25831c2",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["Generic"] },
      },
    ],
    displayParameter: {
      id: "urn:epass:displayParameter:1",
      type: "DisplayParameter",
      language: [
        {
          id: "http://publications.europa.eu/resource/authority/language/ENG",
          type: "Concept",
          inScheme: {
            id: "http://publications.europa.eu/resource/authority/language",
            type: "ConceptScheme",
          },
          prefLabel: { en: ["English"] },
          notation: "language",
        },
      ],
      description: {
        en: [
          "EBSI Example https://github.com/Knowledge-Innovation-Centre/ESBI-JSON-schemas/blob/main/examples%20of%20credentials/DigiComp%20Generic.json",
        ],
      },
      individualDisplay: [
        {
          id: "urn:epass:individualDisplay:c05743e7-9f9d-4e0b-899b-7ae6514c7a02",
          type: "IndividualDisplay",
          language: {
            id: "http://publications.europa.eu/resource/authority/language/ENG",
            type: "Concept",
            inScheme: {
              id: "http://publications.europa.eu/resource/authority/language",
              type: "ConceptScheme",
            },
            prefLabel: { en: ["English"] },
            notation: "language",
          },
          displayDetail: [
            {
              id: "urn:epass:displayDetail:2804bbf5-ab29-4972-9202-71af0f85316b",
              type: "DisplayDetail",
              image: {
                id: "urn:epass:mediaObject:a5ca8b31-515c-4e5e-b47c-04ec79bdbe7e",
                type: "MediaObject",
                content:
                  "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCARjAxoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorMtvEeh3lwlva6zp087nCxxXSMzH2AOTQBp0UUUAFFFQ3V3bWNs9zd3EVvAmN0szhFXJwMk8DkgUATUVSsdY0zVGddP1G0u2QAuLedZCuemcE4q7QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUVTvtW03S/L/tDULS08zOz7RMse7GM4yRnGR+dS2l7a6hbi4srmG5gYkCSGQOpx15HFAE9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXzv8Wf+SgXf/XKL/wBAFfRFfO/xZ/5KBd/9cov/AEAUASWHwt8TXWlW2p2U1mUuIVmjRZ2V8MAQOVAzz61BpnjHxV4J1c2l9JcSLEwE1ndsWGP9knOOOhHH1r3Hwh/yJeh/9eEP/oAr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eHvHNyl7bGW0e5NwiklRNEzbsAj2ypI7ivoDQ/DGj+G1nXSLP7MJypk/eu+7GcfeJx1NT6tomma7ai21OyiuYhyoccqfUEcj8KAPMIE+D81qs7RiIkZMbyXO9T6YBP6ZrT8DP4IvPFUo8N6TPFNbQM/2qSWTBBIUgKzH16kCtT/hUvhLzN32SfH9z7Q2P55/Wui0bwzovh8N/Zenw27MNrOMs5HoWOTj8aAPBvil/wAlG1X/ALY/+ikr6Hsf+Qfbf9cl/kKw9V8BeGda1KXUNQ03zrqXG+Tz5FzgADgMB0ArokRY41jQYVQAB6AUAeRfHPpoP/bx/wC061vAumnWPg9LpykB7hLiNCegYk4/XFdjrvhbRvEvkf2vZ/afs+7yv3rpt3Yz90jPQdataTo9hoWnpYabB5FshJVN7Ngk5PLEmgD538H65J4J8X+ff20gVA1vcxYw6gnnAPcEA167dfFrwpBa+ZBdzXMpHEMcDq2fcsAP1rd1zwfoPiJxJqWnxyzAYEyko+PqpGfxrHtvhV4StphIbCSYg5CyzsR+QIz+NAHaUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAyWKOaMxyxrIjdVYZB/Cs3/hGNA8zzP7D0zf/AHvskefzxWrRQA2ONIo1jjRURRgKowB+FOoooAKKKKACiiigAooooAKKKKACiiigAooooAoXuiaTqcyzX+l2V1Kq7Q89ukjBeuMkdOT+dW4IIbWBILeJIoYxtSONQqqPQAdKkooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqC8u4rGzmupyRHEhdsDJOOwHc1PVDWrSW90i4ggCmbAeMMcBmUhgCewJGKAGw3Oqu6NLptvHCxGf9LLSKD6rs25Hsx/GmSaldzXs9tptnFP8AZyFmknnMSByA20YViTggngDnrnNPh1iKaRIvst+krEAq9pIAp75fG3j1BI9M1lPY29lqN814mqbLibzo5LSS4KkFVBBWI8EEHqORjnrgAvT6+sGiS6g9rIHglWGa3z8ytvCnBGc9cj1GOmaq63eawmkPKtpBAfPgC4vGD4Migg4TA7AgEjBPPHJc2cX9guLG2ux513DKwm8xpGxLHljvJbG1e/QCtDXoJbjR5UgjMkitHKEXq2x1Yge5C0ANvbqaHS/N1Cyt2P2iJBFHMXXmRAGyUHIJzjHYc+lHxALq41TS7NbO1ubWR3Zo55iodgh4YbGBAznvzjjjNWdUm/tLRs20NwSLq3+V4HRuJUJO1gDgDnPTg+lTX8Uj61pMixsyI0u9gMhcoQMntQBFp00i6tJZz6daW0kVrGUe3lLjZuYBeUXAGD+dKNUvrppn07T4p7eJ2j8yW58syMpIbYArZAIIySOR6c1IkUg8TzTeW3lGzjUPjgkO5xn15FY9tY2mmpJa3kesB1lkZWtpLpo3VmLAjyyQpweQcc57c0Aar60JLWxeztzLNekrHHK/lhCAS284OMYI4B5/Or1pJeOrfbLeGFwflEMxkBH1Kr/Ks2SHTbbSbeGWwuzbFi6gRSSyRuSTuJXLhiSefenaK0zXF2E+2f2eAggN4rCTd82/G/59v3Mbuc7u2KAG6/cX0FxpIskjbzLva4edow37tyAcKcjjP4Dj0i1u4uIl0WWa2BuPt4HkwybwSY5AMMQvtkkDHNW9bjk22NykTyra3SyyLGu5tu1lJAHJxuzgc8Uy/Y3smjzwRTFFvdzbomQqPLkGSCAQMkdfUetAEsGoXS6hHZ39pFA8yM0LwzmRW24yDlVIPOeh4B5p9xPqazutrYW8kS4w810Yy3GeAEb6ckdPxqO/ikfWtJkWNmRGl3sBkLlCBk9qzZYrf+07/wDtbTZ712kBtc2rTR+XsXAXgqh3bs5x65xigCTV9TuLjw0l5p6FJGuIkdZJTGyETBWXKg87gVPbGevQ7Vq108RN3DDFJnhYpTIMeuSq/wAq5uz0+8TwS9sbTy7hLuWYW8a7RgXTSbVBxwQOOxyK6S1uo7yIyRrMqg4xNC8R/JgD+NAE9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFITgEnPHoM1zU/xA8N22of2fPeXEd5kDyGsZw5z0+XZmqjCUvhVyZSjH4nY6aisFPGnh9rpLaS/NtM/Crdw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ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//9k=",
                contentEncoding: {
                  id: "http://data.europa.eu/snb/encoding/6146cde7dd",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/encoding/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["base64"] },
                },
                contentType: {
                  id: "http://publications.europa.eu/resource/authority/file-type/JPEG",
                  type: "Concept",
                  inScheme: {
                    id: "http://publications.europa.eu/resource/authority/file-type",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["JPEG"] },
                  notation: "file-type",
                },
              },
              page: 1,
            },
          ],
        },
      ],
      primaryLanguage: {
        id: "http://publications.europa.eu/resource/authority/language/ENG",
        type: "Concept",
        inScheme: {
          id: "http://publications.europa.eu/resource/authority/language",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["English"] },
        notation: "language",
      },
      title: { en: ["DigiComp Generic"] },
    },
  },
  diplomaRntuoCredential: {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "http://data.europa.eu/snb/model/context/edc-ap",
    ],
    id: "urn:credential:bfe82763-0eff-4cca-bc51-7988054d69ab",
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ],
    credentialSchema: [
      {
        id: "http://data.europa.eu/snb/model/ap/edc-generic-full",
        type: "ShaclValidator2017",
      },
      {
        id: "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/0x7ff3bc76bd5e37b3d29721b8698646a722a24a4f4ab0a0ba63d4bbbe0ef9758d",
        type: "JsonSchema",
      },
    ],
    expirationDate: "2023-03-04T00:00:00+01:00",
    credentialSubject: {
      id: "did:key:afsdlkj34134",
      type: "Person",
      identifier: [
        {
          id: "urn:epass:identifier:2",
          type: "Identifier",
          notation: "75541452",
          schemeName: "Student ID",
        },
      ],
      givenName: { en: ["David"] },
      familyName: { en: ["Smith"] },
      fullName: { en: ["David Smith"] },
      hasClaim: [
        {
          id: "urn:epass:learningAchievement:1",
          type: "LearningAchievement",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/ESP",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Spain"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["The University Address"] },
                        },
                      },
                    ],
                    description: { en: ["Address"] },
                  },
                ],
                legalName: {
                  en: [
                    "Universidad Pontificia Comillas (Universidad de la Iglesia Católica)",
                  ],
                },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "1234567",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/ESP",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Spain"] },
                    notation: "country",
                  },
                },
              },
            ],
            awardingDate: "2019-09-11T00:00:00+02:00",
          },
          title: {
            en: [
              "Máster Universitario en Asuntos Internacionales: Economía, Política y Derecho por la Universidad Pontificia Comillas",
            ],
          },
          specifiedBy: {
            id: "urn:epass:learningAchievementSpec:1",
            type: "LearningAchievementSpecification",
            title: {
              en: [
                "Máster Universitario en Asuntos Internacionales: Economía, Política y Derecho por la Universidad Pontificia Comillas",
              ],
            },
          },
        },
      ],
    },
    issuer: {
      id: "did:ebsi:org:12345689",
      type: "Organisation",
      location: [
        {
          id: "urn:epass:certificateLocation:1",
          type: "Location",
          address: {
            id: "urn:epass:certificateAddress:1",
            type: "Address",
            countryCode: {
              id: "http://publications.europa.eu/resource/authority/country/ESP",
              type: "Concept",
              inScheme: {
                id: "http://publications.europa.eu/resource/authority/country",
                type: "ConceptScheme",
              },
              notation: "country",
              prefLabel: { en: "Spain" },
            },
          },
        },
      ],
      identifier: {
        id: "urn:epass:identifier:2",
        type: "Identifier",
        schemeName: "University Aliance ID",
        notation: "73737373",
      },
      legalName: { en: "ORGANIZACION TEST" },
    },
    issuanceDate: "2024-03-26T16:01:37+01:00",
    issued: "2024-03-26T16:01:37+01:00",
    validUntil: "2023-03-04T00:00:00+01:00",
    validFrom: "2022-03-04T00:00:00+01:00",
    credentialProfiles: [
      {
        id: "http://data.europa.eu/snb/credential/e34929035b",
        type: "Concept",
        inScheme: {
          id: "http://data.europa.eu/snb/credential/25831c2",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["Generic"] },
      },
    ],
    displayParameter: {
      id: "urn:epass:displayParameter:1",
      type: "DisplayParameter",
      language: [
        {
          id: "http://publications.europa.eu/resource/authority/language/ENG",
          type: "Concept",
          inScheme: {
            id: "http://publications.europa.eu/resource/authority/language",
            type: "ConceptScheme",
          },
          prefLabel: { en: ["English"] },
          notation: "language",
        },
      ],
      description: {
        en: [
          "EBSI example based on https://github.com/Knowledge-Innovation-Centre/ESBI-JSON-schemas/blob/main/examples%20of%20credentials/Spanish%20example/diploma-rntuo-credential.json",
        ],
      },
      individualDisplay: [
        {
          id: "urn:epass:individualDisplay:20a3ed7c-1557-4ef9-89ad-9a2424b9f551",
          type: "IndividualDisplay",
          language: {
            id: "http://publications.europa.eu/resource/authority/language/ENG",
            type: "Concept",
            inScheme: {
              id: "http://publications.europa.eu/resource/authority/language",
              type: "ConceptScheme",
            },
            prefLabel: { en: ["English"] },
            notation: "language",
          },
          displayDetail: [
            {
              id: "urn:epass:displayDetail:39198ec8-3675-4d02-8dc7-9d506c87d422",
              type: "DisplayDetail",
              image: {
                id: "urn:epass:mediaObject:88b3d4e3-b1e7-4387-b4c1-601a783cd910",
                type: "MediaObject",
                content:
                  "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCARjAxoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKZLLHBC800iRxRqWd3YBVUckknoKAH0Vn2eu6PqM/kWOq2N1Njd5cFwjtj1wDWhQAUUUUAFFVr3ULLTYRNf3lvaxFtoeeVUUt1xknrwfypLHUrDU42ksL22u41O1mglWQA+hINAFqiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiori5gtLd7i5mjhhQZeSVgqqPcngUAS0VRsda0rU5WisNTsruRV3MkE6yED1IB6VeoAKKKKACiiigAooooAKKKhuru2sbZ7m7uIreBMbpZnCKuTgZJ4HJAoAmoqlY6xpmqM66fqNpdsgBcW86yFc9M4JxV2gAooooAKKzbrxDoljcvbXmsafbzpjdFNcojLkZGQTkcEGtFWDKGUgqRkEdDQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfL/jj/keNa/6+3/nXRyfCbxdZQ+fay2sr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trayNENRJul53GPzOcf8B6fhX0LofhPRPDck0mk2X2dpgBIfNd8gdPvE+tV9e8D6B4knFxqFlm4Ax50blGI98dfxoA828b614Hbwy9l4dsLGW8l2/vobTa0KAgklioOTjH480fBD/kMat/17p/6FXotp8PvDFlptzYR6YphuQFmZpGLuAQwG7OQMgHAx0q3ofhHQ/Dc0suk2P2d5lCufNd8gc/xMaAPC/il/yUbVf+2P/opK+iLH/kH23/XJf5CsLVfAXhnWtSl1DUNN866lxvk8+Rc4AA4DAdAK6JEWONY0GFUAAegFADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqhe6JpOpzLNf6XZXUqrtDz26SMF64yR05P51fooAjgghtYEgt4kihjG1I41Cqo9AB0qSiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACoLy7isbOa6nJEcSF2wMk47AdzU9UNatJb3SLiCAKZsB4wxwGZSGAJ7AkYoAbDc6q7o0um28cLEZ/0stIoPquzbkezH8aZJqV3Nez22m2cU/2chZpJ5zEgcgNtGFYk4IJ4A565zT4dYimkSL7LfpKxAKvaSAKe+Xxt49QSPTNZT2NvZajfNeJqmy4m86OS0kuCpBVQQViPBBB6jkY564AL0+vrBokuoPayB4JVhmt8/MrbwpwRnPXI9Rjpmqut3msJpDyraQQHz4AuLxg+DIoIOEwOwIBIwTzxyXNnF/YLixtrseddwysJvMaRsSx5Y7yWxtXv0ArQ16CW40eVIIzJIrRyhF6tsdWIHuQtADb26mh0vzdQsrdj9oiQRRzF15kQBslByCc4x2HPpR8QC6uNU0uzWztbm1kd2aOeYqHYIeGGxgQM578444zVnVJv7S0bNtDcEi6t/leB0biVCTtYA4A5z04PpU1/FI+taTIsbMiNLvYDIXKEDJ7UARadNIurSWc+nWltJFaxlHt5S42bmAXlFwBg/nSjVL66aZ9O0+Ke3ido/MlufLMjKSG2AK2QCCMkjkenNSJFIPE803lt5Rs41D44JDucZ9eRWPbWNppqSWt5HrAdZZGVraS6aN1ZiwI8skKcHkHHOe3NAGq+tCS1sXs7cyzXpKxxyv5YQgEtvODjGCOAefzq9aSXjq32y3hhcH5RDMZAR9Sq/yrNkh0220m3hlsLs2xYuoEUkskbkk7iVy4Yknn3p2itM1xdhPtn9ngIIDeKwk3fNvxv+fb9zG7nO7tigBuv3F9BcaSLJI28y72uHnaMN+7cgHCnI4z+A49ItbuLiJdFlmtgbj7eB5MMm8EmOQDDEL7ZJAxzVvW45NtjcpE8q2t0ssixrubbtZSQBycbs4HPFMv2N7Jo88EUxRb3c26JkKjy5BkggEDJHX1HrQBLBqF0uoR2d/aRQPMjNC8M5kVtuMg5VSDznoeAeafcT6ms7ra2FvJEuMPNdGMtxngBG+nJHT8ajv4pH1rSZFjZkRpd7AZC5QgZPas2WK3/tO//tbTZ712kBtc2rTR+XsXAXgqh3bs5x65xigCTV9TuLjw0l5p6FJGuIkdZJTGyETBWXKg87gVPbGevQ7Vq108RN3DDFJnhYpTIMeuSq/yrm7PT7xPBL2xtPLuEu5ZhbxrtGBdNJtUHHBA47HIrpLW6jvIjJGsyqDjE0LxH8mAP40AT0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUhOASc8egzXNT/ABA8N22of2fPeXEd5kDyGsZw5z0+XZmqjCUvhVyZSjH4nY6aisFPGnh9rpLaS/NtM/CrdwSW+76eYq1vdaJRlH4lYaknswoooqRhRRRQAUVQ1jW9O0CyF5ql0ttAXEYdgTlj0GACex/KrysrorowZWGQQcginZ2uK6vYWio7idLaB5nWRlQZIjjZ2P0VQSfwFZPh/wAUab4m+1HTTMy2rhJGkiKfMc8DPPGOfrTUZNOSWiBySduptUUVlal4k0jSblLW8vFW5kGVgjRpJCPXYgJx+FJRcnZIG0tWatFY1r4s0K9vIbK31GNruZiqW5VhJkKWOUIyowCckCtmiUXHdWBST2YUUUUhhRVXUtStNI0+a/v51gtYRmSRgTjnHQcnkin2d5b6hZw3dpKstvMgeN16MD0NOztfoK6vYnoorBtfF+lXviE6HB9qN8qF3SS2ePYoGcncAe4/Omoyley2ByS3N6iiipGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV5L4cUeIvjbrGq43QacrRoe24ARD88Oa9L1zUl0jQr/UWxi2geQA9yBwPxOBXC/BjTWg8MXWqS5Mt/ck7j1ZU4H/jxeuqj7lKc/l9+5z1feqRh8zuNd0W01/R7jTryNXjlQgEjJRuzD0INcJ8GteutR0W90q7kaRtOdREzHJCNnC/gVP5iu48R6xFoPh2+1OVgPIiJTP8AE/RR+JIFeY/DT/ik/AWteKb2M7JseSh43hMhfzd8fhVUouWHkn3VvUmo7Votdnf0PVb7V7HTpIormfE0ufLhRWkkfHXCKCx/AVWt/E2kXWpppsV3m9eNpPIMTqyqCQdwI+Xp0ODWH8PtOnbSj4i1RvN1bVh5zyN/BEfuIvouMHHv7VleB2i1z4heKvEUWGhDJaQOOjAAAkf98KfxqPZRXN/d/Mv2kny+f5HZWXiTSNQ1WXS7S9SW9iTzHiCsCq5AzkjHcfnUs2uabb61b6PNdomoXEZkihIOWUZ5zjHY8Z7GuN1UfYfjbok6jat9YSQuR3Khz/RfyroZrGLV/GFnfeUpj0hJFE2OXlcAbQfRVyT7sO4NKVOCs+jV/n/w41OTuuqdv6+RX8Q6r4Vvbu38P63ieeadRFbvBJy+cAggY79c46104CRRgAKiKOnQACvOnH9vfG9F+9Bolnk+nmMP5/OP++al8TX03ibxtbeC7aRksY0+0aoyHBdOCI8joDlc/wC8PSqdG/LFPpd+RKq2vK3Wy8zoNR8ZaTa6Vd3cFz5ohikaORYnMUjqpO1ZMbCeOgNZnwq01rDwLbTSA+dfSPdOT1OTgf8Ajqg/jVD4rSQxeFLLQLVEWa/uYoLeFRgBVI6D0B2j8a72xtI7CwtrOEYit4liT6KAB/KlK0aOn2n+X/DjjeVXXovzJ68n8HatHpnxS8SWWt5i1C+nxbSS9CoZiqAnsVKY9doHpXqc9zDbCMzOEEjrGue7E4ArkvH/AIGh8V6f9otsRavbrm3lHG/HOxj6eh7H8aWHlFXhPaWlwrRk7SjuuhsXegwzeLLDXiI1a1tponY/eJYrt/ADzPzp9l4o0TUtTbTrHUobm6VC7JCSwCjGSSOO471gfDDxLeeIfDTrqJLXllL5EkjdXGAQT79j9M965vwTE3inxj4o1Rg32KacRNIOPMiBOIwfQgKW9hj+Li/Yv3lUfw/5k+1+Fw+0ehWHirQ9U1WXTLHUoZ7yJSzRpk8A4OGxg/gaIfFehXOuHRYdShk1AZ/crk8jqM4xkYPGc8GuB02Btf8Aixrv2UGG0soFsjJF8vloMBlUjoxKsB6At3Aq7aWsOofGfZbRJHaaDp4jRY1wodhwPykP/fNN0IK++1wVabt62Ol8Va74as7R9O8QvmG5AUwmCRhJ3ABUdc471NrGsad4M8Pq4s5zbwR7YoLaEtgAdz0Ue5P51y3jIf258S/C+hD5orYm9nHbAOQD/wB8Ef8AAqu/Fe8ki8HjT4ObjUrmO2RR1OTuP/oIH40o0k3Ti+urCVRrnl2NDwN4jn8Q6R9pvRKl1KzSiP7M6Rxxk4RVcqFfgA5BPWsHwjc2914x8X+KruaOK1ilFnHM7AKETAY5P+6h/Gut1GaLwt4LneIgJp9ltj9yq4UficVyfwy0dR4Ps73UExArvcRxydGck5mYeoAAX0wT3GGuXknNaJ6fqJ83NGL1a1/Q7PRfEekeIkmfSb1LkQMFk2ggqT04IHoefatSvO/hTG15DrviF12nVL9mQY/gUkj9XI/CvRKwrQUKjiuhtSm5wUmFFFFZGgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAcX8SLTXdY8PSaPouly3BuGUyzedEihQc4+Zgc5A7YxS+GZNa0PwxYaWfCt351tEEY/arfYzdSch88kk9K7OitlW9z2dlbfr/mZey9/nvqcNf+EtW8X3sEnia4ht9MgffHplm5befWSQgZPbgdOmK0vGfhqTW/BVxo2miKFwqeRH91PkIIX2GBj8q6eil7ad0102H7KNmn1OP0WDxJd6Hb6XqemwabFBAsMjrciR5woxhQvCA45OScEgeoq/Dfw9rWg6Q1tqUMVp+/eZ0R1dpmYAAnHCqABwDkn0xg91RTdZtONlZiVJJp32OO8U+GdS1nxboGoWNwttHZCbzp+Cyg4ACg9Sfm56D9D1ltbRWdtHbwLtjQYAzk/UnuT1J71LRUSqSlFRfQtQSba6nA+GPD2vWHijxBdXcEcEN/eeaLoShmeJWYqir2zkZJxx0GeRCdC8Q6F8R9R13TtMi1O01CIIQblYmiPy9c9sr2B4PtXolFafWJXbaWqsZ+xjZK+zuec654Y8Q33jLQdaNvbXn2bc0qef5cULfwgZBJAODkDJOegwB6DbRyxW6JPN50o5d9u0Enngdh6e3c9aloqJ1XNJPoXCmottdTmfGmk6xrFjYQ6LLDDcQ3iXJlmYhV2BiAQASctt7U241TxYbMwQeHIlvmXaLg3iG3Vv72Pvkd8ba6iihVLJJpOwnDVtPc47RvC114T8C31lYH7Zq08ckhcELvmZcDBYjAHHX0J71P4E0Cfwv4Kgs5YP8ATiHmmjVhzIei5zjoFGc44rqqKcq0pJp9XcI0oxaa6Kxx3w58PX+haLdS6tEI9Tvrp5513K2PQZBI9T1/iqp4U0DXrHXtdur2GO2S+v8AzzOsod5I1JKooHQc8k844xnkd5RTdeTcm/tCVGKUV2OCTw/ry/E3VdXWCJLS5tkggvDKCYVwu7anJLZU4zgc556VL4w0PWtS8U+HLqxs47qz0+RpXEk4jAfIwW6kgbQeAe9dxRTVeXMpWWit+Fg9irNX3d/1OM8d6NrWq+Dk0jTlN3c3E6C5kLKgCZLE4J6bguAMnHrWxrOm3CeC7vStIQGYWRtrdSwX+HaOe3FbdFT7V2S7O4/Zq7ffQ5bwLpGpaP4fsrS/iS1FvCYxbJIH3MW3M7MOMk9AOnPJzx1NFFRObnJyfUqMVFKKCiiipKCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApkiM+Nsrpj+6Bz+YNPooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaPIk/wCfqb8k/wDiamooAh8iT/n6m/JP/iaPIk/5+pvyT/4mpqKAIfIk/wCfqb8k/wDiaVInVgTPIw9CFwfyFS0UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQA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bSTzRwuCsqx7R5ikYKkkEgH2wferYAAwBgCgDmPst1qWm6vaW5uhaPCq2hvgwbzfmLD5/n2fc+9z97tipr+8k1nT/wCzobG8iuJyqzCaBkWFcjed5G1sDONpOTjtyOhooAzI4pB4ouZjG3lGyhUPjgkPISM+vI/OizikXXtUkaNhG6w7WI4bAbOD3rTooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z",
                contentEncoding: {
                  id: "http://data.europa.eu/snb/encoding/6146cde7dd",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/encoding/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["base64"] },
                },
                contentType: {
                  id: "http://publications.europa.eu/resource/authority/file-type/JPEG",
                  type: "Concept",
                  inScheme: {
                    id: "http://publications.europa.eu/resource/authority/file-type",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["JPEG"] },
                  notation: "file-type",
                },
              },
              page: 1,
            },
          ],
        },
      ],
      primaryLanguage: {
        id: "http://publications.europa.eu/resource/authority/language/ENG",
        type: "Concept",
        inScheme: {
          id: "http://publications.europa.eu/resource/authority/language",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["English"] },
        notation: "language",
      },
      title: { en: ["Diploma rntuo credential"] },
    },
  },
  franciscoCruzArgudoCertificateOfCompletion: {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "http://data.europa.eu/snb/model/context/edc-ap",
    ],
    id: "urn:credential:3ae39825-4b47-4bd6-9579-5d19316dd6c9",
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ],
    credentialSchema: [
      {
        id: "http://data.europa.eu/snb/model/ap/edc-generic-full",
        type: "ShaclValidator2017",
      },
      {
        id: "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/0x7ff3bc76bd5e37b3d29721b8698646a722a24a4f4ab0a0ba63d4bbbe0ef9758d",
        type: "JsonSchema",
      },
    ],
    credentialSubject: {
      id: "did:key:afsdlkj34134",
      type: "Person",
      identifier: [
        {
          id: "urn:epass:identifier:2",
          type: "Identifier",
          notation: "5412254",
          schemeName: "Student Identifier",
        },
      ],
      givenName: { en: ["David"] },
      familyName: { en: ["Smith"] },
      fullName: { en: ["David Smith"] },
      hasClaim: [
        {
          id: "urn:epass:learningAchievement:1",
          type: "LearningAchievement",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          description: {
            en: ["has attended the Europass Digital Credentials Live Webinar"],
          },
          title: { en: ["Certificate of Completion"] },
          specifiedBy: {
            id: "urn:epass:learningAchievementSpec:1",
            type: "LearningAchievementSpecification",
            title: { en: ["Certificate of Completion"] },
          },
        },
        {
          id: "urn:epass:activity:1",
          type: "LearningActivity",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          title: {
            en: ["Watching presentations and EDC demo during the webinar"],
          },
          directedBy: [
            {
              id: "urn:epass:org:1",
              type: "Organisation",
              location: [
                {
                  id: "urn:epass:location:1",
                  type: "Location",
                  address: [
                    {
                      id: "urn:epass:address:1",
                      type: "Address",
                      countryCode: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                      fullAddress: {
                        id: "urn:epass:note:1",
                        type: "Note",
                        noteLiteral: { en: ["Here"] },
                      },
                    },
                  ],
                  description: { en: ["The Address"] },
                },
              ],
              legalName: { en: ["University of Life"] },
              registration: {
                id: "urn:epass:legalIdentifier:2",
                type: "LegalIdentifier",
                notation: "987654321",
                spatial: {
                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                  type: "Concept",
                  inScheme: {
                    id: "http://publications.europa.eu/resource/authority/country",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["Belgium"] },
                  notation: "country",
                },
              },
            },
          ],
          specifiedBy: {
            id: "urn:epass:learningActivitySpec:1",
            type: "LearningActivitySpecification",
            title: {
              en: ["Watching presentations and EDC demo during the webinar"],
            },
            dcType: [
              {
                id: "http://data.europa.eu/snb/learning-activity/efff75e10a",
                type: "Concept",
                inScheme: {
                  id: "http://data.europa.eu/snb/learning-activity/25831c2",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["workshop, seminar or conference"] },
              },
            ],
            language: [
              {
                id: "http://publications.europa.eu/resource/authority/language/ENG",
                type: "Concept",
                inScheme: {
                  id: "http://publications.europa.eu/resource/authority/language",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["English"] },
                notation: "language",
              },
            ],
            mode: [
              {
                id: "http://data.europa.eu/snb/learning-assessment/920fbb3cbe",
                type: "Concept",
                inScheme: {
                  id: "http://data.europa.eu/snb/learning-assessment/25831c2",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["Online"] },
              },
            ],
          },
          workload: "PT1H",
        },
      ],
    },
    issuer: {
      id: "did:ebsi:org:12345689",
      type: "Organisation",
      location: [
        {
          id: "urn:epass:certificateLocation:1",
          type: "Location",
          address: {
            id: "urn:epass:certificateAddress:1",
            type: "Address",
            countryCode: {
              id: "http://publications.europa.eu/resource/authority/country/ESP",
              type: "Concept",
              inScheme: {
                id: "http://publications.europa.eu/resource/authority/country",
                type: "ConceptScheme",
              },
              notation: "country",
              prefLabel: { en: "Spain" },
            },
          },
        },
      ],
      identifier: {
        id: "urn:epass:identifier:2",
        type: "Identifier",
        schemeName: "University Aliance ID",
        notation: "73737373",
      },
      legalName: { en: "ORGANIZACION TEST" },
    },
    issuanceDate: "2024-03-26T15:59:52+01:00",
    issued: "2024-03-26T15:59:52+01:00",
    validFrom: "2021-03-24T00:00:00+01:00",
    credentialProfiles: [
      {
        id: "http://data.europa.eu/snb/credential/e34929035b",
        type: "Concept",
        inScheme: {
          id: "http://data.europa.eu/snb/credential/25831c2",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["Generic"] },
      },
    ],
    displayParameter: {
      id: "urn:epass:displayParameter:1",
      type: "DisplayParameter",
      language: [
        {
          id: "http://publications.europa.eu/resource/authority/language/ENG",
          type: "Concept",
          inScheme: {
            id: "http://publications.europa.eu/resource/authority/language",
            type: "ConceptScheme",
          },
          prefLabel: { en: ["English"] },
          notation: "language",
        },
      ],
      description: {
        en: [
          "Spanish ESBI Example - https://github.com/Knowledge-Innovation-Centre/ESBI-JSON-schemas/blob/main/examples%20of%20credentials/Spanish%20example/Francisco%20Cruz%20Argudo_Certificate%20of%20Completion_review.json",
        ],
      },
      individualDisplay: [
        {
          id: "urn:epass:individualDisplay:41a0cf23-d38a-4b9c-ad47-57e0819cd6ba",
          type: "IndividualDisplay",
          language: {
            id: "http://publications.europa.eu/resource/authority/language/ENG",
            type: "Concept",
            inScheme: {
              id: "http://publications.europa.eu/resource/authority/language",
              type: "ConceptScheme",
            },
            prefLabel: { en: ["English"] },
            notation: "language",
          },
          displayDetail: [
            {
              id: "urn:epass:displayDetail:d0149365-decb-4e36-9565-9ec8e2b65bf6",
              type: "DisplayDetail",
              image: {
                id: "urn:epass:mediaObject:82e59a32-f90e-4531-aa46-84a4e7bc3f35",
                type: "MediaObject",
                content:
                  "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCARjAxoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiobq7trG2e5u7iK3gTG6WZwirk4GSeByQKAJqKpWOsaZqjOun6jaXbIAXFvOshXPTOCcVdoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKzJvEeh29y1tPrOnRTo21onukVgfQgnOa06ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooqG6u7axtnubu4it4ExulmcIq5OBkngckCgCaiqVjrGmaozrp+o2l2yAFxbzrIVz0zgnFWZ7iG1haa4mjiiXq8jBQPxNAElFZUXibQJ50gi1zTZJnYIkaXcZZmPAAGeTTovEeh3FyttDrOnSTs21YkukLFvQAHOaANOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKgur21sYvNvLmG3j6b5pAg/M1UtfEOiX1yltaaxp9xO+dsUVyjs2Bk4AOegJoA0qKKKACiiigAooooAK5f4jf8k/1j/rkv8A6GtdRXL/ABG/5J/rH/XJf/Q1oA8B8M+Gb3xXqb2FhJAk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oAKKKKACiiigAooooAKKKKACiiigAooooAKKKqalqVnpGny31/OsNtEMu7fy9z7UAW6K8d1X42y+eyaRpUflA8SXTElv+ArjH5mqln8bdVjlH2/SbOWPuIS0Zx+JagD22iqml38eq6TaahEjJHcwrMqt1AYZwfzq3QAUUUUAFFFFABRRRQAUUUUAUrzR9L1Bt17ptnct6zQK5/UUtnpGmac26y060tj6wQKn8hVys7xBdTWPhvVbu2fZPBZyyxtgHayoSDg8HkUAaNFeQfDXxt4h8QeKjZapqHn2/wBnd9nkxr8wIwcqoPevX6ACiiigAori/HHj/wD4Qy6s4f7M+2faEZ8+f5e3BA/unPWt3wxrf/CR+HbTVvs/2f7QGPlb9+3DFeuBnp6UAa9FcH8SdV8U6YNM/wCEaW6bzPN+0eRaibps25ypx1atnwNeaxf+FoJ9dEwvy7hxNCImwGOPlAHb2oA6OiiigDH13wto3iX7P/a9n9p+z7vK/eum3djP3SM/dHX0rH/4Vb4N/wCgN/5NTf8AxddhRQBzel+AvDOi6lFqGn6b5N1DnZJ58jYyCp4LEdCa6SiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvF/jZq0ralp+kKxEKQ/aXUdGYkqM/QKf++q9orxP42aZKms6fqgU+TLB5BYdAysTz9Q36GgDf8AhL4VsYfD8eu3FvHNeXLN5TOoPlIpK8ehJBOfpXol7p9lqVuYL61huYj1SVAw/WuD+EfiG0vPDEejtKq3tmzjyycF0LFgw9cZI/D3r0GaeG2haaeVIokGWd2Cqo9yaAMLX9YsfA/hPz0h/dW6LBbQbj8xxhVye2Bn6A15FYax4/8AHd/P/Z1/PGsfLiCXyI4wegyOT+prrfjHIL7wfpd5ayCW0a5DB15BDI20/Tr+dJ8EZ4DoWpwAr9oW5DsO+0qAP1DUAconjLxn4H1wWeszS3IXDPBcv5gdD3V+T68569RXruqaul/8P7/VtPmdFk02WaGRTtZD5ZI5HQg/qK8v+Nk8D+Id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UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUhGQQc8+hxXkIS81P4xT6Haazq8elWyb5401GbsgyAS2R87AfnWtKl7S+trK5nUqcltN9D1+iuQ1rw5qdlYTXvh7W9TjvIVLrb3Nw1xFLjnaRJkgnoDmp/Ani9PGGhfamjWK7hby7iNegbGQR7H/ABHah0vc54u6BVPe5XozqKKKKyNAooooAKKwvFulavrGjLbaLqh066EyuZgSMqM5XI59D+GO9bUSukSK773CgM2Mbj64qmlyp3Em72sPoqvfiA2E/wBpd0gCFpGSRkYKOSQykEfga4b4RxXEvh271W5lmka9umMfmyM5Ea8AZJz13VUad4Od9iXO01Hueg0UV53o+pXfjbxhrtvLqV1Z6bpUghitrSUxNKcsC7MPmx8nQEdR+JCm5JvognPlaXVnolFcZ/ZurWHjrSbeLWL6fSGhmneCaTcQyALgvjcy5kU4JPIrs6U4qNrO9xxle90FFFFQUFFZniGxv9S0C7s9MvTZXsqgRXAJGw5BPI5GRkZHTNS6XBcafotrDqN4Li4ghAmuG43EDljn+ZquVct7k3d7WL1FZ+j6zaa7ZveWJZ7YStEkpGBJtOCy+ozkZ9q4fw5C158WdckiubuSw02JYkSW4eUCVgAfvE+jirjSb5r6WJlUta2tz0iiiisjQKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCOeaO2t5Z5W2xxIXc+gAya8u+EEEmpXviDxLOv7y7uDGp9Mnew/8AHk/Kuk+J+rrpPgS/w4Wa6Atoxnru+9/47upPhzHZ6T8PdNL3MCCRDPI5kAGWJPJ9hgfhXXBOOHlL+Z2/U5pPmrJdlc625uI7S1muZW2xxIZHPoAMmvIvgjmC18QX87CK1zFljwo2hy35Aj863PFuvXPiyB/DXhJDd+edl5fr/qIU7rv6EnvjPGQMk8R+KNCHhD4PXmm6dudsJ9omAwXLOodj7EcfSrpR5afs5bza+S7k1JXnzraKZr6FqF742lm1Lzp7PQUkMdrFC5jkuSODIzj5gueAAR3z0qjoNxf3fxR1ezTUbuTSdKt1jSJpmYeY+D8xJ+Yglxk5PA9Kv+HNd0u38IaXZaPcW91drZptgR8lDtG5pAOVAOSc/QZJArC+ENwktjqF08jXN/qF48s7jGUQDgv6EsWw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iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==",
                contentEncoding: {
                  id: "http://data.europa.eu/snb/encoding/6146cde7dd",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/encoding/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["base64"] },
                },
                contentType: {
                  id: "http://publications.europa.eu/resource/authority/file-type/JPEG",
                  type: "Concept",
                  inScheme: {
                    id: "http://publications.europa.eu/resource/authority/file-type",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["JPEG"] },
                  notation: "file-type",
                },
              },
              page: 1,
            },
          ],
        },
      ],
      primaryLanguage: {
        id: "http://publications.europa.eu/resource/authority/language/ENG",
        type: "Concept",
        inScheme: {
          id: "http://publications.europa.eu/resource/authority/language",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["English"] },
        notation: "language",
      },
      title: { en: ["Francisco  Cruz Argudo_Certificate of Completion"] },
    },
    identifier: [
      {
        id: "urn:epass:identifier:3",
        type: "Identifier",
        notation: '"urn:schac:personalwalletID:xxxxxxxxxx',
        schemeName: "Europass Wallet",
      },
    ],
  },
  microcredentialDataAndSoftwareBusiness: {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "http://data.europa.eu/snb/model/context/edc-ap",
    ],
    id: "urn:credential:e6a70ac8-6bf2-4c89-ba53-243b3e0424fd",
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ],
    credentialSchema: [
      {
        id: "http://data.europa.eu/snb/model/ap/edc-generic-full",
        type: "ShaclValidator2017",
      },
      {
        id: "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/0x7ff3bc76bd5e37b3d29721b8698646a722a24a4f4ab0a0ba63d4bbbe0ef9758d",
        type: "JsonSchema",
      },
    ],
    credentialSubject: {
      id: "did:key:afsdlkj34134",
      type: "Person",
      identifier: [
        {
          id: "urn:epass:identifier:5",
          type: "Identifier",
          notation: "557552654",
          schemeName: "Student ID",
        },
      ],
      givenName: { en: ["David"] },
      familyName: { en: ["Smith"] },
      fullName: { en: ["David Smith"] },
      hasClaim: [
        {
          id: "urn:epass:learningAchievement:1",
          type: "LearningAchievement",
          awardedBy: {
            id: "urn:epass:awardingProcess:2",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
            awardingDate: "2020-07-20T00:00:00+02:00",
          },
          title: { en: ["Data and software business"] },
          provenBy: [
            {
              id: "urn:epass:learningAssessment:4",
              type: "LearningAssessment",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Overall grade"] },
              grade: {
                id: "urn:epass:note:2",
                type: "Note",
                noteLiteral: { en: ["Excellent (5)"] },
              },
              hasPart: [
                {
                  id: "urn:epass:learningAssessment:1",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["individual assignment 1"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:1",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["individual assignment 1"] },
                    gradingScheme: {
                      id: "urn:epass:gradingScheme:1",
                      type: "GradingScheme",
                      description: {
                        en: [
                          "The Finnish national grading scheme consists of five grades with numerical equivalents: 5 (outstanding); 4 (very good); 3 (good); 2 (sufficient); 1 (insufficient - fail). The minimum passing grade is 2.",
                        ],
                      },
                      identifier: [
                        {
                          id: "urn:epass:identifier:1",
                          type: "Identifier",
                          notation: "123",
                        },
                      ],
                      title: { en: ["General grading scheme in Finland"] },
                    },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:2",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Project assignment"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:2",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Project assignment"] },
                    gradingScheme: {
                      id: "urn:epass:gradingScheme:1",
                      type: "GradingScheme",
                      description: {
                        en: [
                          "The Finnish national grading scheme consists of five grades with numerical equivalents: 5 (outstanding); 4 (very good); 3 (good); 2 (sufficient); 1 (insufficient - fail). The minimum passing grade is 2.",
                        ],
                      },
                      identifier: [
                        {
                          id: "urn:epass:identifier:1",
                          type: "Identifier",
                          notation: "123",
                        },
                      ],
                      title: { en: ["General grading scheme in Finland"] },
                    },
                  },
                },
                {
                  id: "urn:epass:learningAssessment:3",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["individual assignment 2"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:3",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["individual assignment 2"] },
                    gradingScheme: {
                      id: "urn:epass:gradingScheme:2",
                      type: "GradingScheme",
                      description: {
                        en: [
                          "The Finnish national grading scheme consists of five grades with numerical equivalents: 5 (outstanding); 4 (very good); 3 (good); 2 (sufficient); 1 (insufficient - fail). The minimum passing grade is 2.",
                        ],
                      },
                      identifier: [
                        {
                          id: "urn:epass:identifier:2",
                          type: "Identifier",
                          notation: "urn:epass:scoringschemespec:3",
                        },
                      ],
                      title: { en: ["General grading scheme in Finland"] },
                    },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAssessmentSpec:4",
                type: "LearningAssessmentSpecification",
                title: { en: ["Overall grade"] },
                gradingScheme: {
                  id: "urn:epass:gradingScheme:3",
                  type: "GradingScheme",
                  description: {
                    en: [
                      "The Finnish national grading scheme consists of five grades with numerical equivalents: 5 (outstanding); 4 (very good); 3 (good); 2 (sufficient); 1 (insufficient - fail). The minimum passing grade is 2.",
                    ],
                  },
                  identifier: [
                    {
                      id: "urn:epass:identifier:3",
                      type: "Identifier",
                      notation: "urn:epass:scoringschemespec:1",
                    },
                  ],
                  title: { en: ["General grading scheme in Finland"] },
                },
              },
            },
          ],
          specifiedBy: {
            id: "urn:epass:learningAchievementSpec:1",
            type: "LearningAchievementSpecification",
            title: { en: ["Data and software business"] },
            creditPoint: [
              {
                id: "urn:epass:creditPoint:1",
                type: "CreditPoint",
                framework: {
                  id: "http://data.europa.eu/snb/education-credit/6fcec5c5af",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/education-credit/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["European Credit Transfer System"] },
                },
                point: "5",
              },
            ],
            learningOutcome: [
              {
                id: "urn:epass:learningOutcome:1",
                type: "LearningOutcome",
                relatedESCOSkill: [
                  {
                    id: "http://data.europa.eu/esco/skill/c624c6a3-b0ba-4a31-a296-0d433fe47e41",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/esco/concept-scheme/skills",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["think creatively"] },
                    notation: "Skill",
                  },
                ],
                title: { en: ["Monetizing with data and software"] },
              },
              {
                id: "urn:epass:learningOutcome:2",
                type: "LearningOutcome",
                relatedESCOSkill: [
                  {
                    id: "http://data.europa.eu/esco/skill/d207a30b-2f80-4138-9b77-f88d549b8768",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/esco/concept-scheme/skills",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["identify new business opportunities"] },
                    notation: "Skill",
                  },
                  {
                    id: "http://data.europa.eu/esco/skill/7dd94ad3-13d6-43fe-8b94-51fcbf67ced9",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/esco/concept-scheme/skills",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["think critically"] },
                    notation: "Skill",
                  },
                  {
                    id: "http://data.europa.eu/esco/skill/fcb2b5f4-3a64-42f2-987a-073bea986104",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/esco/concept-scheme/skills",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["business knowledge"] },
                    notation: "Skill",
                  },
                ],
                title: {
                  en: ["Basic principles of data and software business"],
                },
              },
              {
                id: "urn:epass:learningOutcome:3",
                type: "LearningOutcome",
                relatedESCOSkill: [
                  {
                    id: "http://data.europa.eu/esco/skill/60c78287-22eb-4103-9c8c-28deaa460da0",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/esco/concept-scheme/skills",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["work in teams"] },
                    notation: "Skill",
                  },
                  {
                    id: "http://data.europa.eu/esco/skill/20a8fe89-d4eb-4698-8521-8881c13377e0",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/esco/concept-scheme/skills",
                      type: "ConceptScheme",
                    },
                    prefLabel: {
                      en: [
                        "interact professionally in research and professional environments",
                      ],
                    },
                    notation: "Skill",
                  },
                  {
                    id: "http://data.europa.eu/esco/skill/27ed854c-15b8-4ba2-90e9-ae888a219703",
                    type: "Concept",
                    inScheme: {
                      id: "http://data.europa.eu/esco/concept-scheme/skills",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["perform business analysis"] },
                    notation: "Skill",
                  },
                ],
                title: {
                  en: ["Collaboratively develop a data or software concept"],
                },
              },
            ],
            learningOutcomeSummary: {
              id: "urn:epass:note:3",
              type: "Note",
              noteLiteral: {
                en: [
                  "- Student understands the basic principles of data and software business, and the special characteristics of software industry\n- He/she can critically analyse how it is possible to monetize with data and software\n- He/she can analyze the feasibility of software business models. Student can apply theoretical knowledge and understanding of the data and software business characteristics to collaboratively create a solid lean canvas model for a software start-up.\n",
                ],
              },
            },
            learningSetting: {
              id: "http://data.europa.eu/snb/learning-setting/6fd4685715",
              type: "Concept",
              inScheme: {
                id: "http://data.europa.eu/snb/learning-setting/25831c2",
                type: "ConceptScheme",
              },
              prefLabel: { en: ["formal learning"] },
            },
          },
        },
        {
          id: "urn:epass:activity:1",
          type: "LearningActivity",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          description: {
            en: [
              "includes both basic lectures on data and software business and guest lectures by companies.",
            ],
          },
          title: { en: ["Zoom lecture"] },
          specifiedBy: {
            id: "urn:epass:learningActivitySpec:1",
            type: "LearningActivitySpecification",
            title: { en: ["Zoom lecture"] },
            dcType: [
              {
                id: "http://data.europa.eu/snb/learning-activity/bf2e3a7bae",
                type: "Concept",
                inScheme: {
                  id: "http://data.europa.eu/snb/learning-activity/25831c2",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["e-learning coursework"] },
              },
            ],
            language: [
              {
                id: "http://publications.europa.eu/resource/authority/language/ENG",
                type: "Concept",
                inScheme: {
                  id: "http://publications.europa.eu/resource/authority/language",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["English"] },
                notation: "language",
              },
            ],
          },
        },
        {
          id: "urn:epass:activity:2",
          type: "LearningActivity",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          description: {
            en: [
              "Minimum viable product (MVP) Concept to explore product-market fit. Students will Identify the topic area of their MVP (Data-, platform-, product-Or service business), sketch their MVP (Use lean business model canvas), present and then report on their MVP. 3-5 people, 4 weeks remote collaboration, pitching of MVPs in a final event together with Business Tampere and Start-up centre Tribe. The course exercise accounts for 60% of the final grade",
            ],
          },
          title: { en: ["Course exercise"] },
          specifiedBy: {
            id: "urn:epass:learningActivitySpec:2",
            type: "LearningActivitySpecification",
            title: { en: ["Group exercise"] },
            dcType: [
              {
                id: "http://data.europa.eu/snb/learning-activity/bf2e3a7bae",
                type: "Concept",
                inScheme: {
                  id: "http://data.europa.eu/snb/learning-activity/25831c2",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["e-learning coursework"] },
              },
            ],
            language: [
              {
                id: "http://publications.europa.eu/resource/authority/language/ENG",
                type: "Concept",
                inScheme: {
                  id: "http://publications.europa.eu/resource/authority/language",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["English"] },
                notation: "language",
              },
            ],
          },
        },
        {
          id: "urn:epass:activity:3",
          type: "LearningActivity",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          description: {
            en: [
              "The individual exercise is a written task that has two parts: 1. Choose 1 main lecture topic to focus on 2. Choose 2 guest lectures to focus on-Access the documentation in Moodle and answer the according questions in your own time (by the 5th of October) -Each task requires some self-learning, such as finding suitable examples for typical revenue streams and so on. -Return your answers in one document and upload to Moodle (note. Plagiarism tested automatically). The individual assignment accounts for 40% of the final grade.",
            ],
          },
          title: { en: ["Individual exercise"] },
          specifiedBy: {
            id: "urn:epass:learningActivitySpec:3",
            type: "LearningActivitySpecification",
            title: { en: ["Individual exercise"] },
            dcType: [
              {
                id: "http://data.europa.eu/snb/learning-activity/bf2e3a7bae",
                type: "Concept",
                inScheme: {
                  id: "http://data.europa.eu/snb/learning-activity/25831c2",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["e-learning coursework"] },
              },
            ],
            language: [
              {
                id: "http://publications.europa.eu/resource/authority/language/ENG",
                type: "Concept",
                inScheme: {
                  id: "http://publications.europa.eu/resource/authority/language",
                  type: "ConceptScheme",
                },
                prefLabel: { en: ["English"] },
                notation: "language",
              },
            ],
          },
        },
      ],
    },
    issuer: {
      id: "did:ebsi:org:12345689",
      type: "Organisation",
      location: [
        {
          id: "urn:epass:certificateLocation:1",
          type: "Location",
          address: {
            id: "urn:epass:certificateAddress:1",
            type: "Address",
            countryCode: {
              id: "http://publications.europa.eu/resource/authority/country/ESP",
              type: "Concept",
              inScheme: {
                id: "http://publications.europa.eu/resource/authority/country",
                type: "ConceptScheme",
              },
              notation: "country",
              prefLabel: { en: "Spain" },
            },
          },
        },
      ],
      identifier: {
        id: "urn:epass:identifier:2",
        type: "Identifier",
        schemeName: "University Aliance ID",
        notation: "73737373",
      },
      legalName: { en: "ORGANIZACION TEST" },
    },
    issuanceDate: "2024-03-26T16:04:42+01:00",
    issued: "2024-03-26T16:04:42+01:00",
    validFrom: "2019-09-20T00:00:00+02:00",
    credentialProfiles: [
      {
        id: "http://data.europa.eu/snb/credential/e34929035b",
        type: "Concept",
        inScheme: {
          id: "http://data.europa.eu/snb/credential/25831c2",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["Generic"] },
      },
    ],
    displayParameter: {
      id: "urn:epass:displayParameter:1",
      type: "DisplayParameter",
      language: [
        {
          id: "http://publications.europa.eu/resource/authority/language/ENG",
          type: "Concept",
          inScheme: {
            id: "http://publications.europa.eu/resource/authority/language",
            type: "ConceptScheme",
          },
          prefLabel: { en: ["English"] },
          notation: "language",
        },
      ],
      description: {
        en: [
          "From EBSI example - https://github.com/Knowledge-Innovation-Centre/ESBI-JSON-schemas/blob/main/examples%20of%20credentials/Finish%20example/microcredential_example.json",
        ],
      },
      individualDisplay: [
        {
          id: "urn:epass:individualDisplay:250a3020-b4b9-4877-9e47-2994143441f4",
          type: "IndividualDisplay",
          language: {
            id: "http://publications.europa.eu/resource/authority/language/ENG",
            type: "Concept",
            inScheme: {
              id: "http://publications.europa.eu/resource/authority/language",
              type: "ConceptScheme",
            },
            prefLabel: { en: ["English"] },
            notation: "language",
          },
          displayDetail: [
            {
              id: "urn:epass:displayDetail:2a57e865-2d57-43e0-92e1-e9569506cf78",
              type: "DisplayDetail",
              image: {
                id: "urn:epass:mediaObject:92a822f8-af30-4b66-b618-af6ae932240e",
                type: "MediaObject",
                content:
                  "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCARjAxoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKhuru2sbZ7m7uIreBMbpZnCKuTgZJ4HJAqCx1jTNUZ10/UbS7ZAC4t51kK56ZwTigC7RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFRXFzBaW73FzNHDCgy8krBVUe5PAoAloqjY61pWpytFYanZXciruZIJ1kIHqQD0q9QAUUUUAFFFFABRRRQAUUVDdXdtY2z3N3cRW8CY3SzOEVcnAyTwOSBQBNRVKx1jTNUZ10/UbS7ZAC4t51kK56ZwTirtABRRRQAUVm3XiHRLG5e2vNY0+3nTG6Ka5RGXIyMgnI4INaKsGUMpBUjII6GgBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACis681/RtPuDb3urWFtMACY5rlEYA9OCc1fjkSaJJYnV43UMrqchgehB7igB1FFFABRRRQAUUUUAFFFRz3ENrC01xNHFEvV5GCgfiaAJKKy4vE2gTzpBFrmmyTSMESNLuMszHgADPJrUoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD53+LP8AyUC7/wCu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J5vgJGDq6LfFEZF2rsW8wuBk4XaBgZOBXZVVXTbNLGSyFun2aQuXiPIO9izdfUsafa2kdnEY4mmZSc/vZnkP5sSce1AE9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFIRkEHPPocV5CEvNT+MU+h2ms6vHpVsm+eNNRm7IMgEtkfOwH51rSpe0vrayuZ1KnJbTfQ9forkNa8OanZWE174e1vU47yFS629zcNcRS452kSZIJ6A5qfwJ4vTxhoX2po1iu4W8u4jXoGxkEex/wAR2odL3OeLugVT3uV6M6iiiisjQKKKKACisLxbpWr6xoy22i6odOuhMrmYEjKjOVyOfQ/hjvW1ErpEiu+9woDNjG4+uKppcqdxJu9rD6Kr34gNhP8AaXdIAhaRkkZGCjkkMpBH4GuG+EcVxL4du9VuZZpGvbpjH5sjORGvAGSc9d1VGneDnfYlztNR7noNFFed6PqV3428Ya7by6ldWem6VIIYra0lMTSnLAuzD5sfJ0BHUfiQpuSb6IJz5Wl1Z6JRXGf2bq1h460m3i1i+n0hoZp3gmk3EMgC4L43MuZFOCTyK7OlOKjazvccZXvdBRRRUFBRWZ4hsb/UtAu7PTL02V7KoEVwCRsOQTyORkZGR0zUulwXGn6Law6jeC4uIIQJrhuNxA5Y5/marlXLe5N3e1i9RWfo+s2mu2b3liWe2ErRJKRgSbTgsvqM5GfauH8OQtefFnXJIrm7ksNNiWJEluHlAlYAH7xPo4q40m+a+liZVLWtrc9IooorI0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAjnmjtreWeVtscSF3PoAMmvLvhBBJqV74g8Szr+8u7gxqfTJ3sP/AB5PyrpPifq66T4Ev8OFmugLaMZ67vvf+O7qT4cx2ek/D3TS9zAgkQzyOZABliTyfYYH4V1wTjh5S/mdv1OaT5qyXZXOtubiO0tZrmVtscSGRz6ADJry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23scVYt7aG1R0hTaryNIwyTlmJYnn3JqWigCqunWi2DWPkKbVgwaNskEMST1+ppq6Xai0+ysJpIvMWTEs7yHcpBHLEnAKg4zirlFAFW8062vmjedX8yPOySKVo3XPUBlIODgZGewpLTTLSxleW3i2SSIqOxYsWCliMknk5djnqc81booAoGW00a2gtUhuBCibY1hglm2gdiVB/Wlg1W3uJliSO8DN0MllMi/izKAPxNXqKAM19CsGd2CzoHJZo4rmVIyT1+RWC89+Oat/Yrf7VHc+XmaKMxoSThVOM4HQZwOevFT0UAQraQJdyXSpiaVQjsCfmAzjI6Z5PPWqB8N6U0DwNbu0DoyeSZ5DGoYEHau7C8Ej5QMZ4rVooAie2he6iuWTM0SsiNk8BsZ4/4CPyoFtCLtroJ+/aMRlsn7oJIGOnUmpaKAM3VNOEul6qtrFm5u7d0PzffbYVXqcDtSQ6HYo8UrQtvQhxGZXMav13BM7Qc85A681p0UARPbQvdRXLJmaJWRGyeA2M8f8BH5VXutKtLufz5FlSXG0yQTvEzAdAShGR161dooArJYW8dm1ookETZz+9bcc992d2ffNVGhuLjxDBObd4re1hlTzHZf3jOUxtAJOAFOc47VqUUAZtxoVjcySPKLnEvLot3KqN65QMF578c1PdabaXcEUMsOFiIMRjYxtGQMfKykFeOOD0q3RQBWs9PtrBXFujAyNud3dndz05ZiSePU0sNlbwWC2Mce22WPywm4nC4xjPWrFFADIYkt4I4Yl2xxqEUZzgAYFPoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z",
                contentEncoding: {
                  id: "http://data.europa.eu/snb/encoding/6146cde7dd",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/encoding/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["base64"] },
                },
                contentType: {
                  id: "http://publications.europa.eu/resource/authority/file-type/JPEG",
                  type: "Concept",
                  inScheme: {
                    id: "http://publications.europa.eu/resource/authority/file-type",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["JPEG"] },
                  notation: "file-type",
                },
              },
              page: 1,
            },
          ],
        },
      ],
      primaryLanguage: {
        id: "http://publications.europa.eu/resource/authority/language/ENG",
        type: "Concept",
        inScheme: {
          id: "http://publications.europa.eu/resource/authority/language",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["English"] },
        notation: "language",
      },
      title: { en: ["Microcredential - Data and software business"] },
    },
  },
  transcriptOfRecordsGeneric: {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "http://data.europa.eu/snb/model/context/edc-ap",
    ],
    id: "urn:credential:60b42f71-2990-4d3d-bc64-37b7d280886c",
    type: [
      "VerifiableCredential",
      "VerifiableAttestation",
      "EuropeanDigitalCredential",
    ],
    credentialSchema: [
      {
        id: "http://data.europa.eu/snb/model/ap/edc-generic-full",
        type: "ShaclValidator2017",
      },
      {
        id: "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/0x7ff3bc76bd5e37b3d29721b8698646a722a24a4f4ab0a0ba63d4bbbe0ef9758d",
        type: "JsonSchema",
      },
    ],
    credentialSubject: {
      id: "did:key:afsdlkj34134",
      type: "Person",
      identifier: [
        {
          id: "urn:epass:identifier:2",
          type: "Identifier",
          notation: "5842554",
          schemeName: "Student ID",
        },
      ],
      givenName: { en: ["David"] },
      familyName: { en: ["Smith"] },
      fullName: { en: ["David Smith"] },
      hasClaim: [
        {
          id: "urn:epass:learningAchievement:3",
          type: "LearningAchievement",
          awardedBy: {
            id: "urn:epass:awardingProcess:1",
            type: "AwardingProcess",
            awardingBody: [
              {
                id: "urn:epass:org:1",
                type: "Organisation",
                location: [
                  {
                    id: "urn:epass:location:1",
                    type: "Location",
                    address: [
                      {
                        id: "urn:epass:address:1",
                        type: "Address",
                        countryCode: {
                          id: "http://publications.europa.eu/resource/authority/country/BEL",
                          type: "Concept",
                          inScheme: {
                            id: "http://publications.europa.eu/resource/authority/country",
                            type: "ConceptScheme",
                          },
                          prefLabel: { en: ["Belgium"] },
                          notation: "country",
                        },
                        fullAddress: {
                          id: "urn:epass:note:1",
                          type: "Note",
                          noteLiteral: { en: ["Here"] },
                        },
                      },
                    ],
                    description: { en: ["The Address"] },
                  },
                ],
                legalName: { en: ["University of Life"] },
                registration: {
                  id: "urn:epass:legalIdentifier:2",
                  type: "LegalIdentifier",
                  notation: "987654321",
                  spatial: {
                    id: "http://publications.europa.eu/resource/authority/country/BEL",
                    type: "Concept",
                    inScheme: {
                      id: "http://publications.europa.eu/resource/authority/country",
                      type: "ConceptScheme",
                    },
                    prefLabel: { en: ["Belgium"] },
                    notation: "country",
                  },
                },
              },
            ],
          },
          title: { en: ["TITLE OF PROGRAMME"] },
          hasPart: [
            {
              id: "urn:epass:learningAchievement:1",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Topic #2"] },
              provenBy: [
                {
                  id: "urn:epass:learningAssessment:1",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Topic 2 assessment"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:1",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Topic 2 assessment"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:1",
                type: "LearningAchievementSpecification",
                title: { en: ["Topic #2"] },
                volumeOfLearning: "PT5H",
              },
            },
            {
              id: "urn:epass:learningAchievement:2",
              type: "LearningAchievement",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Topic #1"] },
              provenBy: [
                {
                  id: "urn:epass:learningAssessment:2",
                  type: "LearningAssessment",
                  awardedBy: {
                    id: "urn:epass:awardingProcess:1",
                    type: "AwardingProcess",
                    awardingBody: [
                      {
                        id: "urn:epass:org:1",
                        type: "Organisation",
                        location: [
                          {
                            id: "urn:epass:location:1",
                            type: "Location",
                            address: [
                              {
                                id: "urn:epass:address:1",
                                type: "Address",
                                countryCode: {
                                  id: "http://publications.europa.eu/resource/authority/country/BEL",
                                  type: "Concept",
                                  inScheme: {
                                    id: "http://publications.europa.eu/resource/authority/country",
                                    type: "ConceptScheme",
                                  },
                                  prefLabel: { en: ["Belgium"] },
                                  notation: "country",
                                },
                                fullAddress: {
                                  id: "urn:epass:note:1",
                                  type: "Note",
                                  noteLiteral: { en: ["Here"] },
                                },
                              },
                            ],
                            description: { en: ["The Address"] },
                          },
                        ],
                        legalName: { en: ["University of Life"] },
                        registration: {
                          id: "urn:epass:legalIdentifier:2",
                          type: "LegalIdentifier",
                          notation: "987654321",
                          spatial: {
                            id: "http://publications.europa.eu/resource/authority/country/BEL",
                            type: "Concept",
                            inScheme: {
                              id: "http://publications.europa.eu/resource/authority/country",
                              type: "ConceptScheme",
                            },
                            prefLabel: { en: ["Belgium"] },
                            notation: "country",
                          },
                        },
                      },
                    ],
                  },
                  title: { en: ["Topic 1 assessment"] },
                  grade: {
                    id: "urn:epass:note:2",
                    type: "Note",
                    noteLiteral: { en: ["Excellent (5)"] },
                  },
                  specifiedBy: {
                    id: "urn:epass:learningAssessmentSpec:2",
                    type: "LearningAssessmentSpecification",
                    title: { en: ["Topic 1 assessment"] },
                  },
                },
              ],
              specifiedBy: {
                id: "urn:epass:learningAchievementSpec:2",
                type: "LearningAchievementSpecification",
                title: { en: ["Topic #1"] },
                volumeOfLearning: "PT5H",
              },
            },
          ],
          influencedBy: [
            {
              id: "urn:epass:activity:1",
              type: "LearningActivity",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Coursework"] },
              specifiedBy: {
                id: "urn:epass:learningActivitySpec:1",
                type: "LearningActivitySpecification",
                title: { en: ["Coursework"] },
              },
              temporal: [
                {
                  id: "urn:epass:period:1",
                  type: "PeriodOfTime",
                  endDate: "2020-09-20T00:00:00+02:00",
                  startDate: "2020-07-10T00:00:00+02:00",
                },
              ],
            },
          ],
          provenBy: [
            {
              id: "urn:epass:learningAssessment:3",
              type: "LearningAssessment",
              awardedBy: {
                id: "urn:epass:awardingProcess:1",
                type: "AwardingProcess",
                awardingBody: [
                  {
                    id: "urn:epass:org:1",
                    type: "Organisation",
                    location: [
                      {
                        id: "urn:epass:location:1",
                        type: "Location",
                        address: [
                          {
                            id: "urn:epass:address:1",
                            type: "Address",
                            countryCode: {
                              id: "http://publications.europa.eu/resource/authority/country/BEL",
                              type: "Concept",
                              inScheme: {
                                id: "http://publications.europa.eu/resource/authority/country",
                                type: "ConceptScheme",
                              },
                              prefLabel: { en: ["Belgium"] },
                              notation: "country",
                            },
                            fullAddress: {
                              id: "urn:epass:note:1",
                              type: "Note",
                              noteLiteral: { en: ["Here"] },
                            },
                          },
                        ],
                        description: { en: ["The Address"] },
                      },
                    ],
                    legalName: { en: ["University of Life"] },
                    registration: {
                      id: "urn:epass:legalIdentifier:2",
                      type: "LegalIdentifier",
                      notation: "987654321",
                      spatial: {
                        id: "http://publications.europa.eu/resource/authority/country/BEL",
                        type: "Concept",
                        inScheme: {
                          id: "http://publications.europa.eu/resource/authority/country",
                          type: "ConceptScheme",
                        },
                        prefLabel: { en: ["Belgium"] },
                        notation: "country",
                      },
                    },
                  },
                ],
              },
              title: { en: ["Overall Diploma Assessment"] },
              grade: {
                id: "urn:epass:note:2",
                type: "Note",
                noteLiteral: { en: ["Excellent (5)"] },
              },
              specifiedBy: {
                id: "urn:epass:learningAssessmentSpec:3",
                type: "LearningAssessmentSpecification",
                title: { en: ["Overall Diploma Assessment"] },
              },
            },
          ],
          specifiedBy: {
            id: "urn:epass:learningAchievementSpec:3",
            type: "LearningAchievementSpecification",
            title: { en: ["TITLE OF PROGRAMME"] },
            creditPoint: [
              {
                id: "urn:epass:creditPoint:1",
                type: "CreditPoint",
                framework: {
                  id: "http://data.europa.eu/snb/education-credit/6fcec5c5af",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/education-credit/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["European Credit Transfer System"] },
                },
                point: "1",
              },
            ],
            volumeOfLearning: "P1DT6H",
          },
        },
      ],
    },
    issuer: {
      id: "did:ebsi:org:12345689",
      type: "Organisation",
      location: [
        {
          id: "urn:epass:certificateLocation:1",
          type: "Location",
          address: {
            id: "urn:epass:certificateAddress:1",
            type: "Address",
            countryCode: {
              id: "http://publications.europa.eu/resource/authority/country/ESP",
              type: "Concept",
              inScheme: {
                id: "http://publications.europa.eu/resource/authority/country",
                type: "ConceptScheme",
              },
              notation: "country",
              prefLabel: { en: "Spain" },
            },
          },
        },
      ],
      identifier: {
        id: "urn:epass:identifier:2",
        type: "Identifier",
        schemeName: "University Aliance ID",
        notation: "73737373",
      },
      legalName: { en: "ORGANIZACION TEST" },
    },
    issuanceDate: "2024-03-26T16:05:54+01:00",
    issued: "2024-03-26T16:05:54+01:00",
    validFrom: "2019-09-20T00:00:00+02:00",
    credentialProfiles: [
      {
        id: "http://data.europa.eu/snb/credential/e34929035b",
        type: "Concept",
        inScheme: {
          id: "http://data.europa.eu/snb/credential/25831c2",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["Generic"] },
      },
    ],
    displayParameter: {
      id: "urn:epass:displayParameter:1",
      type: "DisplayParameter",
      language: [
        {
          id: "http://publications.europa.eu/resource/authority/language/ENG",
          type: "Concept",
          inScheme: {
            id: "http://publications.europa.eu/resource/authority/language",
            type: "ConceptScheme",
          },
          prefLabel: { en: ["English"] },
          notation: "language",
        },
      ],
      description: {
        en: [
          "Based on EBSI Example : https://github.com/Knowledge-Innovation-Centre/ESBI-JSON-schemas/blob/main/examples%20of%20credentials/transcript%20of%20records%20generic.json",
        ],
      },
      individualDisplay: [
        {
          id: "urn:epass:individualDisplay:cf6446ba-b9b1-478f-85bd-29329f2ce51f",
          type: "IndividualDisplay",
          language: {
            id: "http://publications.europa.eu/resource/authority/language/ENG",
            type: "Concept",
            inScheme: {
              id: "http://publications.europa.eu/resource/authority/language",
              type: "ConceptScheme",
            },
            prefLabel: { en: ["English"] },
            notation: "language",
          },
          displayDetail: [
            {
              id: "urn:epass:displayDetail:6d59ee8a-3bd0-418a-8211-c9ff84955ffc",
              type: "DisplayDetail",
              image: {
                id: "urn:epass:mediaObject:be0b1380-0bb1-4481-8046-10efaee1e089",
                type: "MediaObject",
                content:
                  "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCARjAxoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorMbxHoaXZtW1nThch/LMJuk3h8424znOeMVp0AFFFFABRRRQAUUUUAFFFFABRRRQAUVn3eu6RYSmK81WxtpB/BNcIh/Imp7LUbLUoTNYXlvdRK2wvBKrqG4OMg9eR+dAFmiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKzrzX9G0+4Nve6tYW0wAJjmuURgD04JzV+ORJoklidXjdQyupyGB6EHuKAHUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRVC91vSdMmWG/1SytZWXcEnuEjYr0zgnpwfyq3BPDdQJPbypLDINySRsGVh6gjrQBJRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXi/iD4Ta/qviLUdQgudOWG5uHlQPK4YBmJGcJ1r2iigD5Q1zRrnw/rNxpd20TTwFQ5iJKnKhuCQOx9K7C0+D/iK8s4LqO500JNGsihpXzgjIz8nvWZ8Tf+Siat/vR/8AopK+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f2lo2baG4JF1b/K8Do3EqEnawBwBznpwfSpr+KR9a0mRY2ZEaXewGQuUIGT2oAi06aRdWks59OtLaSK1jKPbylxs3MAvKLgDB/OlGqX100z6dp8U9vE7R+ZLc+WZGUkNsAVsgEEZJHI9OakSKQeJ5pvLbyjZxqHxwSHc4z68ise2sbTTUktbyPWA6yyMrW0l00bqzFgR5ZIU4PIOOc9uaANV9aElrYvZ25lmvSVjjlfywhAJbecHGMEcA8/nV60kvHVvtlvDC4PyiGYyAj6lV/lWbJDpttpNvDLYXZtixdQIpJZI3JJ3ErlwxJPPvTtFaZri7CfbP7PAQQG8VhJu+bfjf8+37mN3Od3bFADdfuL6C40kWSRt5l3tcPO0Yb925AOFORxn8Bx6Ra3cXES6LLNbA3H28DyYZN4JMcgGGIX2ySBjmretxybbG5SJ5VtbpZZFjXc23aykgDk43ZwOeKZfsb2TR54Ipii3u5t0TIVHlyDJBAIGSOvqPWgCWDULpdQjs7+0igeZGaF4ZzIrbcZByqkHnPQ8A80+4n1NZ3W1sLeSJcYea6MZbjPACN9OSOn41HfxSPrWkyLGzIjS72AyFyhAye1ZssVv/ad//a2mz3rtIDa5tWmj8vYuAvBVDu3Zzj1zjFAEmr6ncXHhpLzT0KSNcRI6ySmNkImCsuVB53Aqe2M9eh2rVrp4ibuGGKTPCxSmQY9clV/lXN2en3ieCXtjaeXcJdyzC3jXaMC6aTaoOOCBx2ORXSWt1HeRGSNZlUHGJoXiP5MAfxoAnooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopCcAk549Bmuan+IHhu21D+z57y4jvMgeQ1jOHOeny7M1UYSl8KuTKUY/E7HTUVgp408PtdJbSX5tpn4VbuCS33fTzFWt7rRKMo/ErDUk9mFFFFSMKKKKACiqGsa3p2gWQvNUultoC4jDsCcsegwAT2P5VeVldFdGDKwyCDkEU7O1xXV7C0VHcTpbQPM6yMqDJEcbOx+iqCT+ArJ8P+KNN8TfajppmZbVwkjSRFPmOeBnnjHP1pqMmnJLRA5JO3U2qKKytS8SaRpNylreXircyDKwRo0khHrsQE4/CkouTskDaWrNWisa18WaFe3kNlb6jG13MxVLcq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RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFMkRnxtldMf3QOfzBp9FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTSpE6sCZ5GHoQuD+QqWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiqmqu0ekXroxV1gkKspwQdp5FclNf6VFoKS6frskmsNAPs8S6k8zSTbeFMZcggng5HAz060AdxRVW6mvYxGtpaRzOwJYyTeWi4x3CsST9O3aobXU2drqG8gFvcWqh5FR96lDnDKcAkfKw5AOVNAGhRWXY3+o3qQXB0+3jtJlDgm6JkCkZBK7MZ9g350SaldzXs9tptnFP9nIWaSecxIHIDbRhWJOCCeAOeuc0AalFZ0esQ/2VPfXEbw/ZyyzxH5mRl6gY654x65HrWVrd7fnToBeaesEUt3bBWSfzGQ+ehAcbQB6cFhmgDpqKKyBqt7cmeTT9OSe2hkaPe9x5bSMpw2xdpBwQRklckenNAGvRWRc69HHY6dd21vJcJfSrHGo+VgWVmGQe+Vwc4xz6VLBqF0uoR2d/aRQNMjNC8M5kVtuMqcqpBwc9xweaANKiiuL0e50ObSoZL/XnW6O7zQ+sSIQdx/h8wY+mKAO0orB8RTQ2+n6fvvHgtWu4kklFy0eUwergg4PHOeaqwXlj/bthBomqPeF2b7XELxrlVi2NhiWZtp37AMYzk9ewB1FFc45huNcvYtVvri22yKtnCt09urx7FJYFSN53FgeTjA4HU6F7E1hoF8IridikEjI8khZl+U4w3Xj1Jz70AadFVtOZn0y0d2LM0KEknJJ2isLVbiyXxOsOpak9pB9jDIv257dWbeQT8rLk4oA6ais7Sjp5hlbTb37WucMTetcAH0yzNiq/9vD7ECLY/wBomX7P9i38+bjON2Pu4+bdj7vOO1AGzRVW7lvY/LW0tI5mbJYyTeWq4x3CsST9O3ao7G/kuJ57W5gEF1AFZ0V96lWz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MHuMjLewA/irVooA5S7gm8zUbP7JO13c30U8E6wsU2jy8MXxhdu08Eg8cA5GbWs6hLJff2YqX8FttDT3UFrK5cH+CNkU4Pq3btycr0NFAFHTpLOWz+zWlvLDBEoQRyWzwgD0AZRn8Kx7S7u9P8PR6T9iupNSt4Ps0WIW8uQqNqv5mNoUgAnJyORjPFdNRQBg3FhJplporwRvcJpuI5EjXLGPyyhZR3IODjrjOOeKjkvDfeJ9JaKCZIEjny80TRMxwvRWAOB3OO4xnmty6ge4h2JczW7AgiSLbn/x4EfpVe100QXX2qa6uLucIUWSfaNikgkAKqjkgZOM8CgDCtrG001JLW8j1gOssjK1tJdNG6sxYEeWSFODyDjnPbmr0lkkcWiJZ206QpemVlfczIGSUksSSfvN3PU1u0UAZl/FI+taTIsbMiNLvYDIXKEDJ7VmPY29lqN814mqbLibzo5LSS4KkFVBBWI8EEHqORjnrjpqKAOdubOL+wXFjbXY867hlYTeY0jYljyx3ktjavfoBV/XopJtLCRRs7fabdtqjJwJkJP4AE/hWnRQBkXnmWOtpqBhllt5LfyZDChdoyGyp2jkg5YHAOMD8LttfxXSSPHFcqqdfNt3jJ+gYAn8qtUUAY+qyCWTRJAGAe9VgGUqRmKTqDyD7U3VG0/7Z/pNtfidUAWe0gmJK9cb4h0z2P5Vfm09Z7+C6lnlYQHdHD8oRX2ld3TJOGI5OOelW6AOb2aiLPStRuIZppbWeQyR7R5phYOqkgcFwpQkD/axzxVpZG1XWrOeGC4jtbRXZpJ4WiLOw2hQrAEjBYk4x06842qKAMzQ4pIbW5EkbIWvbhgGGMgysQfoRzR4fikh0WGOWNo3DSZVxgj52I4rTooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/Z",
                contentEncoding: {
                  id: "http://data.europa.eu/snb/encoding/6146cde7dd",
                  type: "Concept",
                  inScheme: {
                    id: "http://data.europa.eu/snb/encoding/25831c2",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["base64"] },
                },
                contentType: {
                  id: "http://publications.europa.eu/resource/authority/file-type/JPEG",
                  type: "Concept",
                  inScheme: {
                    id: "http://publications.europa.eu/resource/authority/file-type",
                    type: "ConceptScheme",
                  },
                  prefLabel: { en: ["JPEG"] },
                  notation: "file-type",
                },
              },
              page: 1,
            },
          ],
        },
      ],
      primaryLanguage: {
        id: "http://publications.europa.eu/resource/authority/language/ENG",
        type: "Concept",
        inScheme: {
          id: "http://publications.europa.eu/resource/authority/language",
          type: "ConceptScheme",
        },
        prefLabel: { en: ["English"] },
        notation: "language",
      },
      title: { en: ["Transcript of records - generic"] },
    },
  },
};
