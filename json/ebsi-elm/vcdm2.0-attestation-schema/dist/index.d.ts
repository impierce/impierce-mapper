export declare const metadata: {
  readonly vcdm: "2.0";
  readonly id: {
    readonly base16: "0x0b6c86bd80e1e97f9d461f5310fc82120049914246002ecf0e14330dbed4f7ef";
    readonly multibase_base58btc: "zmbU2KpoDHbKg2ZC3L5Amz1wqSzSeaFy9K3JhLv17NPp";
  };
  readonly verification: "Documents";
  readonly context: "General";
};
export declare const schema: {
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
          readonly $ref: "#/$defs/credentialSubject";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/credentialSubject";
          };
        },
      ];
    };
    readonly credentialStatus: {
      readonly description: "Defines suspension and/or revocation details for the issued credential. Further redefined by the type extension";
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/credentialStatus";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/credentialStatus";
          };
        },
      ];
    };
    readonly credentialSchema: {
      readonly description: "One or more schemas that validate the Verifiable Credential.";
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/credentialSchema";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/credentialSchema";
          };
        },
      ];
    };
    readonly termsOfUse: {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/termsOfUse";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/termsOfUse";
          };
        },
      ];
    };
    readonly evidence: {
      readonly anyOf: readonly [
        {
          readonly $ref: "#/$defs/evidence";
        },
        {
          readonly type: "array";
          readonly items: {
            readonly $ref: "#/$defs/evidence";
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
};
export declare const examples: {
  readonly complexAttestation: {
    "@context": [string];
    id: string;
    type: string[];
    issuer: {
      id: string;
      type: string;
      legalName: {
        en: string;
        fr: string;
      };
      eIDASIdentifier: {
        id: string;
        type: string;
        notation: string;
        spatial: {
          id: string;
          type: string;
          inScheme: {
            id: string;
            type: string;
          };
        };
      };
    };
    validFrom: string;
    validUntil: string;
    credentialSubject: (
      | {
          type: string;
          id: string;
          birthName?: undefined;
          familyName?: undefined;
          fullName?: undefined;
        }
      | {
          type: string;
          birthName: {
            en: string;
          };
          familyName: {
            en: string;
          };
          fullName: {
            en: string;
          };
          id?: undefined;
        }
    )[];
    credentialSchema: {
      type: string;
      id: string;
    }[];
    relatedResource: {
      id: string;
      mediaType: string;
      digestSRI: string;
      digestMultibase: string;
    }[];
  };
  readonly evidenceExample: {
    "@context": [string];
    id: string;
    type: string[];
    issuer: string;
    validFrom: string;
    validUntil: string;
    credentialSubject: {
      id: string;
    };
    credentialSchema: {
      id: string;
      type: string;
    }[];
    evidence: {
      type: string[];
    };
    relatedResource: {
      id: string;
      mediaType: string;
      digestSRI: string;
    }[];
  };
  readonly genericAttestation: {
    "@context": [string];
    id: string;
    type: string[];
    issuer: string;
    validFrom: string;
    validUntil: string;
    credentialSubject: {
      id: string;
    };
    credentialStatus: {
      id: string;
      type: string;
    }[];
    credentialSchema: {
      id: string;
      type: string;
    }[];
    evidence: {
      type: string;
    };
    relatedResource: {
      id: string;
      mediaType: string;
      digestMultibase: string;
    }[];
  };
  readonly verifiableAuthorisationOnboard: {
    "@context": [string];
    id: string;
    type: string[];
    issuer: string;
    validFrom: string;
    validUntil: string;
    credentialSubject: {
      id: string;
    };
    credentialSchema: {
      id: string;
      type: string;
    };
  };
};
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
