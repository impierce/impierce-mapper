#![recursion_limit = "512"]

pub mod backend;
pub mod events;
pub mod render;
pub mod state;

use crate::events::*;
use crate::render::*;

use backend::logging::initialize_logging;
use crossterm::event::DisableMouseCapture;
use crossterm::event::EnableMouseCapture;
use crossterm::execute;
use crossterm::terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen};
use jsonschema::ValidationError;
use ratatui::prelude::{CrosstermBackend, Terminal};
use state::AppState;
use std::io::{stdout, Result};

// Load I18n macro, for allow you use `t!` macro in anywhere.
#[macro_use]
extern crate rust_i18n;
i18n!("src/locales", fallback = "en");

// fn main() -> Result<()> {
//     initialize_logging().expect("Unexpected error while initializing logging");
//     trace_dbg!("Starting the application");

//     // Initialize the alternate terminal screen, its input and the backend for it.
//     execute!(stdout(), EnterAlternateScreen, EnableMouseCapture)?;
//     enable_raw_mode()?;
//     let mut terminal = Terminal::new(CrosstermBackend::new(stdout()))?;
//     terminal.clear()?;
//     let mut state = AppState {
//         // TODO: remove these hardcoded paths
//         input_path: "res/elm_example.json".to_string(),
//         mapping_path: "res/mapping_empty.json".to_string(),
//         output_path: "res/output_credential.json".to_string(),
//         custom_mapping_path: "res/custom_mapping.json".to_string(),

//         // tab: Tabs::UnusedDataP3,
//         optional_fields: vec![
//             ("".to_string(), "".to_string()),
//             ("field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4field4".to_string(), "".to_string()),
//             ("field5".to_string(), "".to_string()),
//             ("field6".to_string(), "".to_string()),
//         ], // todo: remove hard code testdata

//         selected_input_field: 1, // todo: what if none? Also after going back to tab 1 and changing file paths?
//         selected_missing_field: 1, // todo: what if none?
//         selected_optional_field: 1, // todo: what if none?
//         select_mapping_option: true,

//         ..Default::default()
//     };

//     loop {
//         terminal.draw(|frame| {
//             let area = frame.size();
//             state.area = area;
//             render_page(frame, area, &mut state);
//         })?;
//         if events_handler(&mut state)? {
//             break;
//         };
//     }

//     execute!(stdout(), LeaveAlternateScreen, DisableMouseCapture)?;
//     disable_raw_mode()?;
//     Ok(())
// }

use jsonschema::JSONSchema;
use serde_json::json;

fn main() {
    let file = std::fs::File::open("./res/schema.json").unwrap();
    let reader = std::io::BufReader::new(file);

    let schema: serde_json::Value = serde_json::from_reader(reader).unwrap();
    let target_credential = json!(
        {
            "@context": [
              "https://www.w3.org/ns/credentials/v2",
              "http://data.europa.eu/snb/model/context/edc-ap"
            ],
            "id": "urn:credential:60b42f71-2990-4d3d-bc64-37b7d280886c",
            "type": [
              "VerifiableCredential",
              "VerifiableAttestation",
              "EuropeanDigitalCredential"
            ],
            "credentialSchema": [
              {
                "id": "http://data.europa.eu/snb/model/ap/edc-generic-full",
                "type": "ShaclValidator2017"
              },
              {
                "id": "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/0x7ff3bc76bd5e37b3d29721b8698646a722a24a4f4ab0a0ba63d4bbbe0ef9758d",
                "type": "JsonSchema"
              }
            ],
            "credentialSubject": {
              "id": "did:key:afsdlkj34134",
              "type": "Person",
              "identifier": [
                {
                  "id": "urn:epass:identifier:2",
                  "type": "Identifier",
                  "notation": "5842554",
                  "schemeName": "Student ID"
                }
              ],
              "givenName": {
                "en": ["David"]
              },
              "familyName": {
                "en": ["Smith"]
              },
              "fullName": {
                "en": ["David Smith"]
              },
              "hasClaim": [
                {
                  "id": "urn:epass:learningAchievement:3",
                  "type": "LearningAchievement",
                  "awardedBy": {
                    "id": "urn:epass:awardingProcess:1",
                    "type": "AwardingProcess",
                    "awardingBody": [
                      {
                        "id": "urn:epass:org:1",
                        "type": "Organisation",
                        "location": [
                          {
                            "id": "urn:epass:location:1",
                            "type": "Location",
                            "address": [
                              {
                                "id": "urn:epass:address:1",
                                "type": "Address",
                                "countryCode": {
                                  "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                  "type": "Concept",
                                  "inScheme": {
                                    "id": "http://publications.europa.eu/resource/authority/country",
                                    "type": "ConceptScheme"
                                  },
                                  "prefLabel": {
                                    "en": ["Belgium"]
                                  },
                                  "notation": "country"
                                },
                                "fullAddress": {
                                  "id": "urn:epass:note:1",
                                  "type": "Note",
                                  "noteLiteral": {
                                    "en": ["Here"]
                                  }
                                }
                              }
                            ],
                            "description": {
                              "en": ["The Address"]
                            }
                          }
                        ],
                        "legalName": {
                          "en": ["University of Life"]
                        },
                        "registration": {
                          "id": "urn:epass:legalIdentifier:2",
                          "type": "LegalIdentifier",
                          "notation": "987654321",
                          "spatial": {
                            "id": "http://publications.europa.eu/resource/authority/country/BEL",
                            "type": "Concept",
                            "inScheme": {
                              "id": "http://publications.europa.eu/resource/authority/country",
                              "type": "ConceptScheme"
                            },
                            "prefLabel": {
                              "en": ["Belgium"]
                            },
                            "notation": "country"
                          }
                        }
                      }
                    ]
                  },
                  "title": {
                    "en": ["TITLE OF PROGRAMME"]
                  },
                  "hasPart": [
                    {
                      "id": "urn:epass:learningAchievement:1",
                      "type": "LearningAchievement",
                      "awardedBy": {
                        "id": "urn:epass:awardingProcess:1",
                        "type": "AwardingProcess",
                        "awardingBody": [
                          {
                            "id": "urn:epass:org:1",
                            "type": "Organisation",
                            "location": [
                              {
                                "id": "urn:epass:location:1",
                                "type": "Location",
                                "address": [
                                  {
                                    "id": "urn:epass:address:1",
                                    "type": "Address",
                                    "countryCode": {
                                      "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                      "type": "Concept",
                                      "inScheme": {
                                        "id": "http://publications.europa.eu/resource/authority/country",
                                        "type": "ConceptScheme"
                                      },
                                      "prefLabel": {
                                        "en": ["Belgium"]
                                      },
                                      "notation": "country"
                                    },
                                    "fullAddress": {
                                      "id": "urn:epass:note:1",
                                      "type": "Note",
                                      "noteLiteral": {
                                        "en": ["Here"]
                                      }
                                    }
                                  }
                                ],
                                "description": {
                                  "en": ["The Address"]
                                }
                              }
                            ],
                            "legalName": {
                              "en": ["University of Life"]
                            },
                            "registration": {
                              "id": "urn:epass:legalIdentifier:2",
                              "type": "LegalIdentifier",
                              "notation": "987654321",
                              "spatial": {
                                "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                "type": "Concept",
                                "inScheme": {
                                  "id": "http://publications.europa.eu/resource/authority/country",
                                  "type": "ConceptScheme"
                                },
                                "prefLabel": {
                                  "en": ["Belgium"]
                                },
                                "notation": "country"
                              }
                            }
                          }
                        ]
                      },
                      "title": {
                        "en": ["Topic #2"]
                      },
                      "provenBy": [
                        {
                          "id": "urn:epass:learningAssessment:1",
                          "type": "LearningAssessment",
                          "awardedBy": {
                            "id": "urn:epass:awardingProcess:1",
                            "type": "AwardingProcess",
                            "awardingBody": [
                              {
                                "id": "urn:epass:org:1",
                                "type": "Organisation",
                                "location": [
                                  {
                                    "id": "urn:epass:location:1",
                                    "type": "Location",
                                    "address": [
                                      {
                                        "id": "urn:epass:address:1",
                                        "type": "Address",
                                        "countryCode": {
                                          "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                          "type": "Concept",
                                          "inScheme": {
                                            "id": "http://publications.europa.eu/resource/authority/country",
                                            "type": "ConceptScheme"
                                          },
                                          "prefLabel": {
                                            "en": ["Belgium"]
                                          },
                                          "notation": "country"
                                        },
                                        "fullAddress": {
                                          "id": "urn:epass:note:1",
                                          "type": "Note",
                                          "noteLiteral": {
                                            "en": ["Here"]
                                          }
                                        }
                                      }
                                    ],
                                    "description": {
                                      "en": ["The Address"]
                                    }
                                  }
                                ],
                                "legalName": {
                                  "en": ["University of Life"]
                                },
                                "registration": {
                                  "id": "urn:epass:legalIdentifier:2",
                                  "type": "LegalIdentifier",
                                  "notation": "987654321",
                                  "spatial": {
                                    "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                    "type": "Concept",
                                    "inScheme": {
                                      "id": "http://publications.europa.eu/resource/authority/country",
                                      "type": "ConceptScheme"
                                    },
                                    "prefLabel": {
                                      "en": ["Belgium"]
                                    },
                                    "notation": "country"
                                  }
                                }
                              }
                            ]
                          },
                          "title": {
                            "en": ["Topic 2 assessment"]
                          },
                          "grade": {
                            "id": "urn:epass:note:2",
                            "type": "Note",
                            "noteLiteral": {
                              "en": ["Excellent (5)"]
                            }
                          },
                          "specifiedBy": {
                            "id": "urn:epass:learningAssessmentSpec:1",
                            "type": "LearningAssessmentSpecification",
                            "title": {
                              "en": ["Topic 2 assessment"]
                            }
                          }
                        }
                      ],
                      "specifiedBy": {
                        "id": "urn:epass:learningAchievementSpec:1",
                        "type": "LearningAchievementSpecification",
                        "title": {
                          "en": ["Topic #2"]
                        },
                        "volumeOfLearning": "PT5H"
                      }
                    },
                    {
                      "id": "urn:epass:learningAchievement:2",
                      "type": "LearningAchievement",
                      "awardedBy": {
                        "id": "urn:epass:awardingProcess:1",
                        "type": "AwardingProcess",
                        "awardingBody": [
                          {
                            "id": "urn:epass:org:1",
                            "type": "Organisation",
                            "location": [
                              {
                                "id": "urn:epass:location:1",
                                "type": "Location",
                                "address": [
                                  {
                                    "id": "urn:epass:address:1",
                                    "type": "Address",
                                    "countryCode": {
                                      "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                      "type": "Concept",
                                      "inScheme": {
                                        "id": "http://publications.europa.eu/resource/authority/country",
                                        "type": "ConceptScheme"
                                      },
                                      "prefLabel": {
                                        "en": ["Belgium"]
                                      },
                                      "notation": "country"
                                    },
                                    "fullAddress": {
                                      "id": "urn:epass:note:1",
                                      "type": "Note",
                                      "noteLiteral": {
                                        "en": ["Here"]
                                      }
                                    }
                                  }
                                ],
                                "description": {
                                  "en": ["The Address"]
                                }
                              }
                            ],
                            "legalName": {
                              "en": ["University of Life"]
                            },
                            "registration": {
                              "id": "urn:epass:legalIdentifier:2",
                              "type": "LegalIdentifier",
                              "notation": "987654321",
                              "spatial": {
                                "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                "type": "Concept",
                                "inScheme": {
                                  "id": "http://publications.europa.eu/resource/authority/country",
                                  "type": "ConceptScheme"
                                },
                                "prefLabel": {
                                  "en": ["Belgium"]
                                },
                                "notation": "country"
                              }
                            }
                          }
                        ]
                      },
                      "title": {
                        "en": ["Topic #1"]
                      },
                      "provenBy": [
                        {
                          "id": "urn:epass:learningAssessment:2",
                          "type": "LearningAssessment",
                          "awardedBy": {
                            "id": "urn:epass:awardingProcess:1",
                            "type": "AwardingProcess",
                            "awardingBody": [
                              {
                                "id": "urn:epass:org:1",
                                "type": "Organisation",
                                "location": [
                                  {
                                    "id": "urn:epass:location:1",
                                    "type": "Location",
                                    "address": [
                                      {
                                        "id": "urn:epass:address:1",
                                        "type": "Address",
                                        "countryCode": {
                                          "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                          "type": "Concept",
                                          "inScheme": {
                                            "id": "http://publications.europa.eu/resource/authority/country",
                                            "type": "ConceptScheme"
                                          },
                                          "prefLabel": {
                                            "en": ["Belgium"]
                                          },
                                          "notation": "country"
                                        },
                                        "fullAddress": {
                                          "id": "urn:epass:note:1",
                                          "type": "Note",
                                          "noteLiteral": {
                                            "en": ["Here"]
                                          }
                                        }
                                      }
                                    ],
                                    "description": {
                                      "en": ["The Address"]
                                    }
                                  }
                                ],
                                "legalName": {
                                  "en": ["University of Life"]
                                },
                                "registration": {
                                  "id": "urn:epass:legalIdentifier:2",
                                  "type": "LegalIdentifier",
                                  "notation": "987654321",
                                  "spatial": {
                                    "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                    "type": "Concept",
                                    "inScheme": {
                                      "id": "http://publications.europa.eu/resource/authority/country",
                                      "type": "ConceptScheme"
                                    },
                                    "prefLabel": {
                                      "en": ["Belgium"]
                                    },
                                    "notation": "country"
                                  }
                                }
                              }
                            ]
                          },
                          "title": {
                            "en": ["Topic 1 assessment"]
                          },
                          "grade": {
                            "id": "urn:epass:note:2",
                            "type": "Note",
                            "noteLiteral": {
                              "en": ["Excellent (5)"]
                            }
                          },
                          "specifiedBy": {
                            "id": "urn:epass:learningAssessmentSpec:2",
                            "type": "LearningAssessmentSpecification",
                            "title": {
                              "en": ["Topic 1 assessment"]
                            }
                          }
                        }
                      ],
                      "specifiedBy": {
                        "id": "urn:epass:learningAchievementSpec:2",
                        "type": "LearningAchievementSpecification",
                        "title": {
                          "en": ["Topic #1"]
                        },
                        "volumeOfLearning": "PT5H"
                      }
                    }
                  ],
                  "influencedBy": [
                    {
                      "id": "urn:epass:activity:1",
                      "type": "LearningActivity",
                      "awardedBy": {
                        "id": "urn:epass:awardingProcess:1",
                        "type": "AwardingProcess",
                        "awardingBody": [
                          {
                            "id": "urn:epass:org:1",
                            "type": "Organisation",
                            "location": [
                              {
                                "id": "urn:epass:location:1",
                                "type": "Location",
                                "address": [
                                  {
                                    "id": "urn:epass:address:1",
                                    "type": "Address",
                                    "countryCode": {
                                      "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                      "type": "Concept",
                                      "inScheme": {
                                        "id": "http://publications.europa.eu/resource/authority/country",
                                        "type": "ConceptScheme"
                                      },
                                      "prefLabel": {
                                        "en": ["Belgium"]
                                      },
                                      "notation": "country"
                                    },
                                    "fullAddress": {
                                      "id": "urn:epass:note:1",
                                      "type": "Note",
                                      "noteLiteral": {
                                        "en": ["Here"]
                                      }
                                    }
                                  }
                                ],
                                "description": {
                                  "en": ["The Address"]
                                }
                              }
                            ],
                            "legalName": {
                              "en": ["University of Life"]
                            },
                            "registration": {
                              "id": "urn:epass:legalIdentifier:2",
                              "type": "LegalIdentifier",
                              "notation": "987654321",
                              "spatial": {
                                "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                "type": "Concept",
                                "inScheme": {
                                  "id": "http://publications.europa.eu/resource/authority/country",
                                  "type": "ConceptScheme"
                                },
                                "prefLabel": {
                                  "en": ["Belgium"]
                                },
                                "notation": "country"
                              }
                            }
                          }
                        ]
                      },
                      "title": {
                        "en": ["Coursework"]
                      },
                      "specifiedBy": {
                        "id": "urn:epass:learningActivitySpec:1",
                        "type": "LearningActivitySpecification",
                        "title": {
                          "en": ["Coursework"]
                        }
                      },
                      "temporal": [
                        {
                          "id": "urn:epass:period:1",
                          "type": "PeriodOfTime",
                          "endDate": "2020-09-20T00:00:00+02:00",
                          "startDate": "2020-07-10T00:00:00+02:00"
                        }
                      ]
                    }
                  ],
                  "provenBy": [
                    {
                      "id": "urn:epass:learningAssessment:3",
                      "type": "LearningAssessment",
                      "awardedBy": {
                        "id": "urn:epass:awardingProcess:1",
                        "type": "AwardingProcess",
                        "awardingBody": [
                          {
                            "id": "urn:epass:org:1",
                            "type": "Organisation",
                            "location": [
                              {
                                "id": "urn:epass:location:1",
                                "type": "Location",
                                "address": [
                                  {
                                    "id": "urn:epass:address:1",
                                    "type": "Address",
                                    "countryCode": {
                                      "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                      "type": "Concept",
                                      "inScheme": {
                                        "id": "http://publications.europa.eu/resource/authority/country",
                                        "type": "ConceptScheme"
                                      },
                                      "prefLabel": {
                                        "en": ["Belgium"]
                                      },
                                      "notation": "country"
                                    },
                                    "fullAddress": {
                                      "id": "urn:epass:note:1",
                                      "type": "Note",
                                      "noteLiteral": {
                                        "en": ["Here"]
                                      }
                                    }
                                  }
                                ],
                                "description": {
                                  "en": ["The Address"]
                                }
                              }
                            ],
                            "legalName": {
                              "en": ["University of Life"]
                            },
                            "registration": {
                              "id": "urn:epass:legalIdentifier:2",
                              "type": "LegalIdentifier",
                              "notation": "987654321",
                              "spatial": {
                                "id": "http://publications.europa.eu/resource/authority/country/BEL",
                                "type": "Concept",
                                "inScheme": {
                                  "id": "http://publications.europa.eu/resource/authority/country",
                                  "type": "ConceptScheme"
                                },
                                "prefLabel": {
                                  "en": ["Belgium"]
                                },
                                "notation": "country"
                              }
                            }
                          }
                        ]
                      },
                      "title": {
                        "en": ["Overall Diploma Assessment"]
                      },
                      "grade": {
                        "id": "urn:epass:note:2",
                        "type": "Note",
                        "noteLiteral": {
                          "en": ["Excellent (5)"]
                        }
                      },
                      "specifiedBy": {
                        "id": "urn:epass:learningAssessmentSpec:3",
                        "type": "LearningAssessmentSpecification",
                        "title": {
                          "en": ["Overall Diploma Assessment"]
                        }
                      }
                    }
                  ],
                  "specifiedBy": {
                    "id": "urn:epass:learningAchievementSpec:3",
                    "type": "LearningAchievementSpecification",
                    "title": {
                      "en": ["TITLE OF PROGRAMME"]
                    },
                    "creditPoint": [
                      {
                        "id": "urn:epass:creditPoint:1",
                        "type": "CreditPoint",
                        "framework": {
                          "id": "http://data.europa.eu/snb/education-credit/6fcec5c5af",
                          "type": "Concept",
                          "inScheme": {
                            "id": "http://data.europa.eu/snb/education-credit/25831c2",
                            "type": "ConceptScheme"
                          },
                          "prefLabel": {
                            "en": ["European Credit Transfer System"]
                          }
                        },
                        "point": "1"
                      }
                    ],
                    "volumeOfLearning": "P1DT6H"
                  }
                }
              ]
            },
            "issuer": {
              "id": "did:ebsi:org:12345689",
              "type": "IssuerNode",
              "location": [
                {
                  "id": "urn:epass:certificateLocation:1",
                  "type": "Location",
                  "address": {
                    "id": "urn:epass:certificateAddress:1",
                    "type": "Address",
                    "countryCode": {
                      "id": "http://publications.europa.eu/resource/authority/country/ESP",
                      "type": "Concept",
                      "inScheme": {
                        "id": "http://publications.europa.eu/resource/authority/country",
                        "type": "ConceptScheme"
                      },
                      "notation": "country",
                      "prefLabel": { "en": "Spain" }
                    }
                  }
                }
              ],
              "identifier": {
                "id": "urn:epass:identifier:2",
                "type": "Identifier",
                "schemeName": "University Aliance ID",
                "notation": "73737373"
              },
              "legalName": { "en": "ORGANIZACION TEST" }
            },
            "issuanceDate": "2024-03-26T16:05:54+01:00",
            "issued": "2024-03-26T16:05:54+01:00",
            "validFrom": "2019-09-20T00:00:00+02:00",
            "credentialProfiles": [
              {
                "id": "http://data.europa.eu/snb/credential/e34929035b",
                "type": "Concept",
                "inScheme": {
                  "id": "http://data.europa.eu/snb/credential/25831c2",
                  "type": "ConceptScheme"
                },
                "prefLabel": {
                  "en": ["Generic"]
                }
              }
            ],
            "displayParameter": {
              "id": "urn:epass:displayParameter:1",
              "type": "DisplayParameter",
              "language": [
                {
                  "id": "http://publications.europa.eu/resource/authority/language/ENG",
                  "type": "Concept",
                  "inScheme": {
                    "id": "http://publications.europa.eu/resource/authority/language",
                    "type": "ConceptScheme"
                  },
                  "prefLabel": {
                    "en": ["English"]
                  },
                  "notation": "language"
                }
              ],
              "description": {
                "en": [
                  "Based on EBSI Example : https://github.com/Knowledge-Innovation-Centre/ESBI-JSON-schemas/blob/main/examples%20of%20credentials/transcript%20of%20records%20generic.json"
                ]
              },
              "individualDisplay": [
                {
                  "id": "urn:epass:individualDisplay:cf6446ba-b9b1-478f-85bd-29329f2ce51f",
                  "type": "IndividualDisplay",
                  "language": {
                    "id": "http://publications.europa.eu/resource/authority/language/ENG",
                    "type": "Concept",
                    "inScheme": {
                      "id": "http://publications.europa.eu/resource/authority/language",
                      "type": "ConceptScheme"
                    },
                    "prefLabel": {
                      "en": ["English"]
                    },
                    "notation": "language"
                  },
                  "displayDetail": [
                    {
                      "id": "urn:epass:displayDetail:6d59ee8a-3bd0-418a-8211-c9ff84955ffc",
                      "type": "DisplayDetail",
                      "image": {
                        "id": "urn:epass:mediaObject:be0b1380-0bb1-4481-8046-10efaee1e089",
                        "type": "MediaObject",
                        "content": "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCARjAxoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorMbxHoaXZtW1nThch/LMJuk3h8424znOeMVp0AFFFFABRRRQAUUUUAFFFFABRRRQAUVn3eu6RYSmK81WxtpB/BNcIh/Imp7LUbLUoTNYXlvdRK2wvBKrqG4OMg9eR+dAFmiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKzrzX9G0+4Nve6tYW0wAJjmuURgD04JzV+ORJoklidXjdQyupyGB6EHuKAHUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRVC91vSdMmWG/1SytZWXcEnuEjYr0zgnpwfyq3BPDdQJPbypLDINySRsGVh6gjrQBJRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXi/iD4Ta/qviLUdQgudOWG5uHlQPK4YBmJGcJ1r2iigD5Q1zRrnw/rNxpd20TTwFQ5iJKnKhuCQOx9K7C0+D/iK8s4LqO500JNGsihpXzgjIz8nvWZ8Tf+Siat/vR/8AopK+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f2lo2baG4JF1b/K8Do3EqEnawBwBznpwfSpr+KR9a0mRY2ZEaXewGQuUIGT2oAi06aRdWks59OtLaSK1jKPbylxs3MAvKLgDB/OlGqX100z6dp8U9vE7R+ZLc+WZGUkNsAVsgEEZJHI9OakSKQeJ5pvLbyjZxqHxwSHc4z68ise2sbTTUktbyPWA6yyMrW0l00bqzFgR5ZIU4PIOOc9uaANV9aElrYvZ25lmvSVjjlfywhAJbecHGMEcA8/nV60kvHVvtlvDC4PyiGYyAj6lV/lWbJDpttpNvDLYXZtixdQIpJZI3JJ3ErlwxJPPvTtFaZri7CfbP7PAQQG8VhJu+bfjf8+37mN3Od3bFADdfuL6C40kWSRt5l3tcPO0Yb925AOFORxn8Bx6Ra3cXES6LLNbA3H28DyYZN4JMcgGGIX2ySBjmretxybbG5SJ5VtbpZZFjXc23aykgDk43ZwOeKZfsb2TR54Ipii3u5t0TIVHlyDJBAIGSOvqPWgCWDULpdQjs7+0igeZGaF4ZzIrbcZByqkHnPQ8A80+4n1NZ3W1sLeSJcYea6MZbjPACN9OSOn41HfxSPrWkyLGzIjS72AyFyhAye1ZssVv/ad//a2mz3rtIDa5tWmj8vYuAvBVDu3Zzj1zjFAEmr6ncXHhpLzT0KSNcRI6ySmNkImCsuVB53Aqe2M9eh2rVrp4ibuGGKTPCxSmQY9clV/lXN2en3ieCXtjaeXcJdyzC3jXaMC6aTaoOOCBx2ORXSWt1HeRGSNZlUHGJoXiP5MAfxoAnooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopCcAk549Bmuan+IHhu21D+z57y4jvMgeQ1jOHOeny7M1UYSl8KuTKUY/E7HTUVgp408PtdJbSX5tpn4VbuCS33fTzFWt7rRKMo/ErDUk9mFFFFSMKKKKACiqGsa3p2gWQvNUultoC4jDsCcsegwAT2P5VeVldFdGDKwyCDkEU7O1xXV7C0VHcTpbQPM6yMqDJEcbOx+iqCT+ArJ8P+KNN8TfajppmZbVwkjSRFPmOeBnnjHP1pqMmnJLRA5JO3U2qKKytS8SaRpNylreXircyDKwRo0khHrsQE4/CkouTskDaWrNWisa18WaFe3kNlb6jG13MxVLcq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RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFMkRnxtldMf3QOfzBp9FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTR5En/AD9Tfkn/AMTU1FAEPkSf8/U35J/8TR5En/P1N+Sf/E1NRQBD5En/AD9Tfkn/AMTSpE6sCZ5GHoQuD+QqWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiqmqu0ekXroxV1gkKspwQdp5FclNf6VFoKS6frskmsNAPs8S6k8zSTbeFMZcggng5HAz060AdxRVW6mvYxGtpaRzOwJYyTeWi4x3CsST9O3aobXU2drqG8gFvcWqh5FR96lDnDKcAkfKw5AOVNAGhRWXY3+o3qQXB0+3jtJlDgm6JkCkZBK7MZ9g350SaldzXs9tptnFP9nIWaSecxIHIDbRhWJOCCeAOeuc0AalFZ0esQ/2VPfXEbw/ZyyzxH5mRl6gY654x65HrWVrd7fnToBeaesEUt3bBWSfzGQ+ehAcbQB6cFhmgDpqKKyBqt7cmeTT9OSe2hkaPe9x5bSMpw2xdpBwQRklckenNAGvRWRc69HHY6dd21vJcJfSrHGo+VgWVmGQe+Vwc4xz6VLBqF0uoR2d/aRQNMjNC8M5kVtuMqcqpBwc9xweaANKiiuL0e50ObSoZL/XnW6O7zQ+sSIQdx/h8wY+mKAO0orB8RTQ2+n6fvvHgtWu4kklFy0eUwergg4PHOeaqwXlj/bthBomqPeF2b7XELxrlVi2NhiWZtp37AMYzk9ewB1FFc45huNcvYtVvri22yKtnCt09urx7FJYFSN53FgeTjA4HU6F7E1hoF8IridikEjI8khZl+U4w3Xj1Jz70AadFVtOZn0y0d2LM0KEknJJ2isLVbiyXxOsOpak9pB9jDIv257dWbeQT8rLk4oA6ais7Sjp5hlbTb37WucMTetcAH0yzNiq/9vD7ECLY/wBomX7P9i38+bjON2Pu4+bdj7vOO1AGzRVW7lvY/LW0tI5mbJYyTeWq4x3CsST9O3ao7G/kuJ57W5gEF1AFZ0V96lWz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MHuMjLewA/irVooA5S7gm8zUbP7JO13c30U8E6wsU2jy8MXxhdu08Eg8cA5GbWs6hLJff2YqX8FttDT3UFrK5cH+CNkU4Pq3btycr0NFAFHTpLOWz+zWlvLDBEoQRyWzwgD0AZRn8Kx7S7u9P8PR6T9iupNSt4Ps0WIW8uQqNqv5mNoUgAnJyORjPFdNRQBg3FhJplporwRvcJpuI5EjXLGPyyhZR3IODjrjOOeKjkvDfeJ9JaKCZIEjny80TRMxwvRWAOB3OO4xnmty6ge4h2JczW7AgiSLbn/x4EfpVe100QXX2qa6uLucIUWSfaNikgkAKqjkgZOM8CgDCtrG001JLW8j1gOssjK1tJdNG6sxYEeWSFODyDjnPbmr0lkkcWiJZ206QpemVlfczIGSUksSSfvN3PU1u0UAZl/FI+taTIsbMiNLvYDIXKEDJ7VmPY29lqN814mqbLibzo5LSS4KkFVBBWI8EEHqORjnrjpqKAOdubOL+wXFjbXY867hlYTeY0jYljyx3ktjavfoBV/XopJtLCRRs7fabdtqjJwJkJP4AE/hWnRQBkXnmWOtpqBhllt5LfyZDChdoyGyp2jkg5YHAOMD8LttfxXSSPHFcqqdfNt3jJ+gYAn8qtUUAY+qyCWTRJAGAe9VgGUqRmKTqDyD7U3VG0/7Z/pNtfidUAWe0gmJK9cb4h0z2P5Vfm09Z7+C6lnlYQHdHD8oRX2ld3TJOGI5OOelW6AOb2aiLPStRuIZppbWeQyR7R5phYOqkgcFwpQkD/axzxVpZG1XWrOeGC4jtbRXZpJ4WiLOw2hQrAEjBYk4x06842qKAMzQ4pIbW5EkbIWvbhgGGMgysQfoRzR4fikh0WGOWNo3DSZVxgj52I4rTooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/Z",
                        "contentEncoding": {
                          "id": "http://data.europa.eu/snb/encoding/6146cde7dd",
                          "type": "Concept",
                          "inScheme": {
                            "id": "http://data.europa.eu/snb/encoding/25831c2",
                            "type": "ConceptScheme"
                          },
                          "prefLabel": {
                            "en": ["base64"]
                          }
                        },
                        "contentType": {
                          "id": "http://publications.europa.eu/resource/authority/file-type/JPEG",
                          "type": "Concept",
                          "inScheme": {
                            "id": "http://publications.europa.eu/resource/authority/file-type",
                            "type": "ConceptScheme"
                          },
                          "prefLabel": {
                            "en": ["JPEG"]
                          },
                          "notation": "file-type"
                        }
                      },
                      "page": 1
                    }
                  ]
                }
              ],
              "primaryLanguage": {
                "id": "http://publications.europa.eu/resource/authority/language/ENG",
                "type": "Concept",
                "inScheme": {
                  "id": "http://publications.europa.eu/resource/authority/language",
                  "type": "ConceptScheme"
                },
                "prefLabel": {
                  "en": ["English"]
                },
                "notation": "language"
              },
              "title": {
                "en": ["Transcript of records - generic"]
              }
            }
          }

    );

    // Draft is detected automatically
    // with fallback to Draft7
    let schema = JSONSchema::compile(&schema).expect("A valid schema");

    let result = schema.validate(&target_credential);
    let errors: Vec<ValidationError> = result.unwrap_err().collect();
    println!("{:#?}", errors.len());
    // println!("{:#?}", errors.get(2).unwrap());
}

// instance: Object {
//     "id": String("did:ebsi:org:12345689"),
//     "identifier": Object {
//         "id": String("urn:epass:identifier:2"),
//         "notation": String("73737373"),
//         "schemeName": String("University Aliance ID"),
//         "type": String("Identifier"),
//     },
//     "legalName": Object {
//         "en": String("ORGANIZACION TEST"),
//     },
