'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
const assert = require('assert');
var customFormats = module.exports = function (zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function (val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function (val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function (val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function (val) {
    // better parsing for custom "float" format
    if (Number.parseFloat(val)) {
      return true;
    } else {
      return false;
    }
  });

  zSchema.registerFormat('date', function (val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function (val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function (val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:4000'); // supertest init;

chai.should();

let createdUser = null;
let createdUserTwo = null;
let createdCommunity = null;
let createdCommunityTwo = null;

describe('/community', function () {

  before(function (done) {
    const userOneBody = {
      "msisdn": "27721110001",
      "firstName": "hossein",
      "lastName": "shayesteh",
      "email": "sdfsd@fsdfsdf.com",
      "addresses": [
        {
          "isPrimary": false,
          "detail": {
            "line1": "line1",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        {
          "isPrimary": true,
          "detail": {
            "line1": "line1",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        }
      ]
    };
    const userTwoBody = {
      "msisdn": "27733330001",
      "firstName": "hossein",
      "lastName": "shayesteh",
      "email": "sdfsd@fsdfsdf.com",
      "addresses": [
        {
          "isPrimary": false,
          "detail": {
            "line1": "line1",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        {
          "isPrimary": true,
          "detail": {
            "line1": "line1",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        }
      ]
    };
    api.post('/v1/user')
      .set('Content-Type', 'application/json')
      .send(userOneBody)
      .end(function (err, res) {
        if (err) return done(err);
        createdUser = res.body;

        api.post('/v1/user')
          .set('Content-Type', 'application/json')
          .send(userTwoBody)
          .end(function (err, res) {
            if (err) return done(err);
            createdUserTwo = res.body;
            done();
          });

      });

  });

  describe('post', function () {

    const communityOneBody = {
      "name": "durbanville community 5",
      "address": {
        "isPrimary": true,
        "detail": {
          "line1": "line12323",
          "city": "city",
          "country": "country",
          "province": "country",
          "postalCode": "postalCode",
          "type": "postal"
        },
        "location": {
          "type": "Point",
          "coordinates": [-180, 90]
        }
      },
      "representatives": [
        {
          "name": "hossein shayesteh",
          "email": "hsh_85@yahoo.com",
          "isPrimary": true,
          "phoneNumbers": [
            {
              "number": "07281200899",
              "type": "personal",
              "isPrimary": true
            },
            {
              "number": "07281200891",
              "type": "personal",
              "isPrimary": false
            }
          ]
        },
        {
          "name": "hossein shayesteh",
          "email": "hsh_856@yahoo.com",
          "isPrimary": false,
          "phoneNumbers": [
            {
              "number": "07281200899",
              "type": "personal",
              "isPrimary": true
            },
            {
              "number": "07281200891",
              "type": "personal",
              "isPrimary": false
            }
          ]
        }
      ],
      "entities": [
        {
          "name": "police station",
          "branch": "Durbanville",
          "addresses": [
            {
              "line1": "line1",
              "city": "city",
              "country": "country",
              "province": "country",
              "postalCode": "postalCode",
              "type": "postal"
            },
            {
              "line1": "line1",
              "city": "city",
              "country": "country",
              "province": "country",
              "postalCode": "postalCode",
              "type": "postal"
            }
          ],
          "phoneNumbers": [
            {
              "number": "07281200899",
              "type": "personal",
              "isPrimary": true
            },
            {
              "number": "07281200891",
              "type": "personal",
              "isPrimary": false
            }
          ],
          "representatives": [
            {
              "name": "hossein shayesteh",
              "email": "hsh_85@yahoo.com",
              "isPrimary": true,
              "phoneNumbers": [
                {
                  "number": "07281200899",
                  "type": "personal",
                  "isPrimary": true
                },
                {
                  "number": "07281200891",
                  "type": "personal",
                  "isPrimary": false
                }
              ]
            },
            {
              "name": "hossein shayesteh",
              "email": "hsh_856@yahoo.com",
              "isPrimary": false,
              "phoneNumbers": [
                {
                  "number": "07281200899",
                  "type": "personal",
                  "isPrimary": true
                },
                {
                  "number": "07281200891",
                  "type": "personal",
                  "isPrimary": false
                }
              ]
            }
          ]
        }
      ]
    };
    const communityTwoBody = {
      "name": "Bellville community 6",
      "address": {
        "isPrimary": true,
        "detail": {
          "line1": "line1",
          "city": "city",
          "country": "country",
          "province": "country",
          "postalCode": "postalCode",
          "type": "postal"
        },
        "location": {
          "type": "Point",
          "coordinates": [-180, 90]
        }
      },
      "representatives": [
        {
          "name": "hossein shayesteh",
          "email": "hsh_85@yahoo.com",
          "isPrimary": true,
          "phoneNumbers": [
            {
              "number": "07281200899",
              "type": "personal",
              "isPrimary": true
            },
            {
              "number": "07281200891",
              "type": "personal",
              "isPrimary": false
            }
          ]
        },
        {
          "name": "hossein shayesteh",
          "email": "hsh_856@yahoo.com",
          "isPrimary": false,
          "phoneNumbers": [
            {
              "number": "07281200899",
              "type": "personal",
              "isPrimary": true
            },
            {
              "number": "07281200891",
              "type": "personal",
              "isPrimary": false
            }
          ]
        }
      ],
      "entities": [
        {
          "name": "police station",
          "branch": "Durbanville",
          "addresses": [
            {
              "line1": "line1",
              "city": "city",
              "country": "country",
              "province": "country",
              "postalCode": "postalCode",
              "type": "postal"
            },
            {
              "line1": "line1",
              "city": "city",
              "country": "country",
              "province": "country",
              "postalCode": "postalCode",
              "type": "postal"
            }
          ],
          "phoneNumbers": [
            {
              "number": "07281200899",
              "type": "personal",
              "isPrimary": true
            },
            {
              "number": "07281200891",
              "type": "personal",
              "isPrimary": false
            }
          ],
          "representatives": [
            {
              "name": "hossein shayesteh",
              "email": "hsh_85@yahoo.com",
              "isPrimary": true,
              "phoneNumbers": [
                {
                  "number": "07281200899",
                  "type": "personal",
                  "isPrimary": true
                },
                {
                  "number": "07281200891",
                  "type": "personal",
                  "isPrimary": false
                }
              ]
            },
            {
              "name": "hossein shayesteh",
              "email": "hsh_856@yahoo.com",
              "isPrimary": false,
              "phoneNumbers": [
                {
                  "number": "07281200899",
                  "type": "personal",
                  "isPrimary": true
                },
                {
                  "number": "07281200891",
                  "type": "personal",
                  "isPrimary": false
                }
              ]
            }
          ]
        }
      ]
    };

    it('should respond with 201 success response that the...', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the community"
          },
          "address": {
            "type": "object",
            "properties": {
              "detail": {
                "type": "object",
                "required": [
                  "line1",
                  "city",
                  "country",
                  "postalCode",
                  "type"
                ],
                "properties": {
                  "line1": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The first line of address"
                  },
                  "line2": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The second line of address"
                  },
                  "city": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The city"
                  },
                  "state": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The state"
                  },
                  "province": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The province"
                  },
                  "country": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The country"
                  },
                  "postalCode": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The postal code"
                  },
                  "type": {
                    "type": "string",
                    "enum": [
                      "physical",
                      "postal"
                    ],
                    "description": "The type of the address"
                  }
                }
              },
              "location": {
                "type": "object",
                "required": [
                  "type",
                  "coordinates"
                ],
                "properties": {
                  "coordinates": {
                    "type": "array",
                    "items": {
                      "type": "integer",
                      "description": "The ids of the AR companies that service the user"
                    }
                  },
                  "type": {
                    "type": "string",
                    "enum": [
                      "Point"
                    ],
                    "description": "The longitude and latitude of the location"
                  }
                }
              },
              "isPrimary": {
                "type": "boolean",
                "description": "Indicates if this is the primary address"
              },
              "createdAt": {
                "type": "string",
                "description": "The created date"
              },
              "updatedAt": {
                "type": "string",
                "description": "The updated date"
              }
            }
          },
          "entities": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The name of the entity"
                },
                "branch": {
                  "type": "string",
                  "description": "The name of the branch"
                },
                "addresses": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                      "line1",
                      "city",
                      "country",
                      "postalCode",
                      "type"
                    ],
                    "properties": {
                      "line1": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The first line of address"
                      },
                      "line2": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The second line of address"
                      },
                      "city": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The city"
                      },
                      "state": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The state"
                      },
                      "province": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The province"
                      },
                      "country": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The country"
                      },
                      "postalCode": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The postal code"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "physical",
                          "postal"
                        ],
                        "description": "The type of the address"
                      }
                    }
                  }
                },
                "phoneNumbers": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                      "type",
                      "number"
                    ],
                    "properties": {
                      "number": {
                        "type": "string",
                        "description": "The user's phone number"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "personal",
                          "business",
                          "home"
                        ],
                        "description": "The type of the landline number"
                      },
                      "isPrimary": {
                        "type": "boolean",
                        "description": "Indicates if this is the primary phone number"
                      }
                    }
                  }
                },
                "representatives": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the person"
                      },
                      "email": {
                        "type": "string",
                        "format": "email",
                        "minLength": 6,
                        "maxLength": 128
                      },
                      "phoneNumbers": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "required": [
                            "type",
                            "number"
                          ],
                          "properties": {
                            "number": {
                              "type": "string",
                              "description": "The user's phone number"
                            },
                            "type": {
                              "type": "string",
                              "enum": [
                                "personal",
                                "business",
                                "home"
                              ],
                              "description": "The type of the landline number"
                            },
                            "isPrimary": {
                              "type": "boolean",
                              "description": "Indicates if this is the primary phone number"
                            }
                          }
                        }
                      },
                      "isPrimary": {
                        "type": "boolean",
                        "description": "Indicates if this is the primary person"
                      }
                    }
                  }
                }
              }
            }
          },
          "representatives": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The name of the person"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "minLength": 6,
                  "maxLength": 128
                },
                "phoneNumbers": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                      "type",
                      "number"
                    ],
                    "properties": {
                      "number": {
                        "type": "string",
                        "description": "The user's phone number"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "personal",
                          "business",
                          "home"
                        ],
                        "description": "The type of the landline number"
                      },
                      "isPrimary": {
                        "type": "boolean",
                        "description": "Indicates if this is the primary phone number"
                      }
                    }
                  }
                },
                "isPrimary": {
                  "type": "boolean",
                  "description": "Indicates if this is the primary person"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(communityOneBody)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          createdCommunity = res.body;

          api.post('/v1/community')
            .set('Content-Type', 'application/json')
            .set({
              'context': 'user',
              'context-id': createdUserTwo._id
            })
            .send(communityTwoBody)
            .expect(201)
            .end(function (err, res) {
              if (err) return done(err);

              validator.validate(res.body, schema).should.be.true;
              createdCommunityTwo = res.body;

              done();
            });
        });
    });

    it('should respond with 400 Validation Error. Invalid Owner Type', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'community',
          'context-id': createdUser._id
        })
        .send(communityOneBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;

          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 400000,
                "message": "The owner kind [community] is not valid for this entity."
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Owner not found', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdCommunity._id
        })
        .send(communityOneBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;

          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "message": `An owner with id [${createdCommunity._id}] could not be found`
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });

    it('should respond with 400 Validation Error. Community already exists', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the community"
          },
          "address": {
            "type": "object",
            "properties": {
              "detail": {
                "type": "object",
                "required": [
                  "line1",
                  "city",
                  "country",
                  "postalCode",
                  "type"
                ],
                "properties": {
                  "line1": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The first line of address"
                  },
                  "line2": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The second line of address"
                  },
                  "city": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The city"
                  },
                  "state": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The state"
                  },
                  "province": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The province"
                  },
                  "country": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The country"
                  },
                  "postalCode": {
                    "type": "string",
                    "maxLength": 128,
                    "description": "The postal code"
                  },
                  "type": {
                    "type": "string",
                    "enum": [
                      "physical",
                      "postal"
                    ],
                    "description": "The type of the address"
                  }
                }
              },
              "location": {
                "type": "object",
                "required": [
                  "type",
                  "coordinates"
                ],
                "properties": {
                  "coordinates": {
                    "type": "array",
                    "items": {
                      "type": "integer",
                      "description": "The ids of the AR companies that service the user"
                    }
                  },
                  "type": {
                    "type": "string",
                    "enum": [
                      "Point"
                    ],
                    "description": "The longitude and latitude of the location"
                  }
                }
              },
              "isPrimary": {
                "type": "boolean",
                "description": "Indicates if this is the primary address"
              },
              "createdAt": {
                "type": "string",
                "description": "The created date"
              },
              "updatedAt": {
                "type": "string",
                "description": "The updated date"
              }
            }
          },
          "entities": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The name of the entity"
                },
                "branch": {
                  "type": "string",
                  "description": "The name of the branch"
                },
                "addresses": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                      "line1",
                      "city",
                      "country",
                      "postalCode",
                      "type"
                    ],
                    "properties": {
                      "line1": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The first line of address"
                      },
                      "line2": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The second line of address"
                      },
                      "city": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The city"
                      },
                      "state": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The state"
                      },
                      "province": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The province"
                      },
                      "country": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The country"
                      },
                      "postalCode": {
                        "type": "string",
                        "maxLength": 128,
                        "description": "The postal code"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "physical",
                          "postal"
                        ],
                        "description": "The type of the address"
                      }
                    }
                  }
                },
                "phoneNumbers": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                      "type",
                      "number"
                    ],
                    "properties": {
                      "number": {
                        "type": "string",
                        "description": "The user's phone number"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "personal",
                          "business",
                          "home"
                        ],
                        "description": "The type of the landline number"
                      },
                      "isPrimary": {
                        "type": "boolean",
                        "description": "Indicates if this is the primary phone number"
                      }
                    }
                  }
                },
                "representatives": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the person"
                      },
                      "email": {
                        "type": "string",
                        "format": "email",
                        "minLength": 6,
                        "maxLength": 128
                      },
                      "phoneNumbers": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "required": [
                            "type",
                            "number"
                          ],
                          "properties": {
                            "number": {
                              "type": "string",
                              "description": "The user's phone number"
                            },
                            "type": {
                              "type": "string",
                              "enum": [
                                "personal",
                                "business",
                                "home"
                              ],
                              "description": "The type of the landline number"
                            },
                            "isPrimary": {
                              "type": "boolean",
                              "description": "Indicates if this is the primary phone number"
                            }
                          }
                        }
                      },
                      "isPrimary": {
                        "type": "boolean",
                        "description": "Indicates if this is the primary person"
                      }
                    }
                  }
                }
              }
            }
          },
          "representatives": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The name of the person"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "minLength": 6,
                  "maxLength": 128
                },
                "phoneNumbers": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [
                      "type",
                      "number"
                    ],
                    "properties": {
                      "number": {
                        "type": "string",
                        "description": "The user's phone number"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "personal",
                          "business",
                          "home"
                        ],
                        "description": "The type of the landline number"
                      },
                      "isPrimary": {
                        "type": "boolean",
                        "description": "Indicates if this is the primary phone number"
                      }
                    }
                  }
                },
                "isPrimary": {
                  "type": "boolean",
                  "description": "Indicates if this is the primary person"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(communityOneBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;

          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 900000,
                "message": `A community with the same name [${communityOneBody.name}] already exists.`,
                "path": ["name"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });

    it('should respond with 400 Validation Error. Exactly one primary phone number must be set for entity representative. Two numbers', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": true
                  }
                ]
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 500000,
                "message": "Exactly one primary phone number must be set for entity person",
                "path": ["entities", "representatives", "phoneNumbers"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Exactly one primary phone number must be set for entity representative. No number', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": []
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 500000,
                "message": "Exactly one primary phone number must be set for entity person",
                "path": ["entities", "representatives", "phoneNumbers"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Phone number must be unique for entity representative', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": []
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 500001,
                "message": "Entity persons phone numbers must be unique",
                "path": ["entities", "representatives", "phoneNumbers", "number"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Exactly one primary person must be set for entity. Two persons', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": []
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 700000,
                "message": "Exactly one primary representative must be set for entity",
                "path": ["entities", "representatives"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Exactly one primary person must be set for entity. No person', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": []
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 700000,
                "message": "Exactly one primary representative must be set for entity",
                "path": ["entities", "representatives"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Email address must be unique for entity representative', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": [
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 700001,
                "message": "Entity persons email address must be unique",
                "path": ["entities", "representatives", "email"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });

    it('should respond with 400 Validation Error. Exactly one primary phone number must be set for representative. Two numbers', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": true
                  }
                ]
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 500000,
                "message": "Exactly one primary phone number must be set for person",
                "path": ["representatives", "phoneNumbers"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Exactly one primary phone number must be set for representative. No number', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": []
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": []
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 500000,
                "message": "Exactly one primary phone number must be set for person",
                "path": ["representatives", "phoneNumbers"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Phone number must be unique for representative', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": []
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 500001,
                "message": "Persons phone numbers must be unique",
                "path": ["representatives", "phoneNumbers", "number"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Exactly one primary person must be set for community. Two persons', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_856@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": []
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_856@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 700000,
                "message": "Exactly one primary representative must be set. [2] found instead",
                "path": ["representatives"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });
    it('should respond with 400 Validation Error. Exactly one primary person must be set. No person', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": []
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 700000,
                "message": "Exactly one primary representative must be set. [0] found instead",
                "path": ["representatives"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });

    it('should respond with 400 Validation Error. Email address must be unique for representative', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      const postBody = {
        "name": "Welgemoed community",
        "address": {
          "isPrimary": false,
          "detail": {
            "line1": "line12323",
            "city": "city",
            "country": "country",
            "province": "country",
            "postalCode": "postalCode",
            "type": "postal"
          },
          "location": {
            "type": "Point",
            "coordinates": [-180, 90]
          }
        },
        "representatives": [
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": true,
            "phoneNumbers": [
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": false
              }
            ]
          },
          {
            "name": "hossein shayesteh",
            "email": "hsh_85@yahoo.com",
            "isPrimary": false,
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ]
          }
        ],
        "entities": [
          {
            "name": "police station",
            "branch": "Durbanville",
            "addresses": [
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              },
              {
                "line1": "line1",
                "city": "city",
                "country": "country",
                "province": "country",
                "postalCode": "postalCode",
                "type": "postal"
              }
            ],
            "phoneNumbers": [
              {
                "number": "07281200899",
                "type": "personal",
                "isPrimary": true
              },
              {
                "number": "07281200891",
                "type": "personal",
                "isPrimary": false
              }
            ],
            "representatives": [
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": true,
                "phoneNumbers": [
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              },
              {
                "name": "hossein shayesteh",
                "email": "hsh_85@yahoo.com",
                "isPrimary": false,
                "phoneNumbers": [
                  {
                    "number": "07281200899",
                    "type": "personal",
                    "isPrimary": true
                  },
                  {
                    "number": "07281200891",
                    "type": "personal",
                    "isPrimary": false
                  }
                ]
              }
            ]
          }
        ]
      };

      /*eslint-enable*/
      api.post('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .send(postBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 700001,
                "message": `Found duplicate persons email address [hsh_85@yahoo.com]`,
                "path": ["representatives", "email"]
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });

  });

  describe('get', function() {
    it('should respond with 200 An array of communities', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the community"
            },
            "address": {
              "type": "object",
              "properties": {
                "detail": {
                  "type": "object",
                  "required": [
                    "line1",
                    "city",
                    "country",
                    "postalCode",
                    "type"
                  ],
                  "properties": {
                    "line1": {
                      "type": "string",
                      "maxLength": 128,
                      "description": "The first line of address"
                    },
                    "line2": {
                      "type": "string",
                      "maxLength": 128,
                      "description": "The second line of address"
                    },
                    "city": {
                      "type": "string",
                      "maxLength": 128,
                      "description": "The city"
                    },
                    "state": {
                      "type": "string",
                      "maxLength": 128,
                      "description": "The state"
                    },
                    "province": {
                      "type": "string",
                      "maxLength": 128,
                      "description": "The province"
                    },
                    "country": {
                      "type": "string",
                      "maxLength": 128,
                      "description": "The country"
                    },
                    "postalCode": {
                      "type": "string",
                      "maxLength": 128,
                      "description": "The postal code"
                    },
                    "type": {
                      "type": "string",
                      "enum": [
                        "physical",
                        "postal"
                      ],
                      "description": "The type of the address"
                    }
                  }
                },
                "location": {
                  "type": "object",
                  "required": [
                    "type",
                    "coordinates"
                  ],
                  "properties": {
                    "coordinates": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "description": "The ids of the AR companies that service the user"
                      }
                    },
                    "type": {
                      "type": "string",
                      "enum": [
                        "Point"
                      ],
                      "description": "The longitude and latitude of the location"
                    }
                  }
                },
                "isPrimary": {
                  "type": "boolean",
                  "description": "Indicates if this is the primary address"
                },
                "createdAt": {
                  "type": "string",
                  "description": "The created date"
                },
                "updatedAt": {
                  "type": "string",
                  "description": "The updated date"
                }
              }
            },
            "entities": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the entity"
                  },
                  "branch": {
                    "type": "string",
                    "description": "The name of the branch"
                  },
                  "addresses": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "line1",
                        "city",
                        "country",
                        "postalCode",
                        "type"
                      ],
                      "properties": {
                        "line1": {
                          "type": "string",
                          "maxLength": 128,
                          "description": "The first line of address"
                        },
                        "line2": {
                          "type": "string",
                          "maxLength": 128,
                          "description": "The second line of address"
                        },
                        "city": {
                          "type": "string",
                          "maxLength": 128,
                          "description": "The city"
                        },
                        "state": {
                          "type": "string",
                          "maxLength": 128,
                          "description": "The state"
                        },
                        "province": {
                          "type": "string",
                          "maxLength": 128,
                          "description": "The province"
                        },
                        "country": {
                          "type": "string",
                          "maxLength": 128,
                          "description": "The country"
                        },
                        "postalCode": {
                          "type": "string",
                          "maxLength": 128,
                          "description": "The postal code"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "physical",
                            "postal"
                          ],
                          "description": "The type of the address"
                        }
                      }
                    }
                  },
                  "phoneNumbers": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "type",
                        "number"
                      ],
                      "properties": {
                        "number": {
                          "type": "string",
                          "description": "The user's phone number"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "personal",
                            "business",
                            "home"
                          ],
                          "description": "The type of the landline number"
                        },
                        "isPrimary": {
                          "type": "boolean",
                          "description": "Indicates if this is the primary phone number"
                        }
                      }
                    }
                  },
                  "representatives": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "description": "The name of the person"
                        },
                        "email": {
                          "type": "string",
                          "format": "email",
                          "minLength": 6,
                          "maxLength": 128
                        },
                        "phoneNumbers": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "required": [
                              "type",
                              "number"
                            ],
                            "properties": {
                              "number": {
                                "type": "string",
                                "description": "The user's phone number"
                              },
                              "type": {
                                "type": "string",
                                "enum": [
                                  "personal",
                                  "business",
                                  "home"
                                ],
                                "description": "The type of the landline number"
                              },
                              "isPrimary": {
                                "type": "boolean",
                                "description": "Indicates if this is the primary phone number"
                              }
                            }
                          }
                        },
                        "isPrimary": {
                          "type": "boolean",
                          "description": "Indicates if this is the primary person"
                        }
                      }
                    }
                  }
                }
              }
            },
            "representatives": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the person"
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "minLength": 6,
                    "maxLength": 128
                  },
                  "phoneNumbers": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "type",
                        "number"
                      ],
                      "properties": {
                        "number": {
                          "type": "string",
                          "description": "The user's phone number"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "personal",
                            "business",
                            "home"
                          ],
                          "description": "The type of the landline number"
                        },
                        "isPrimary": {
                          "type": "boolean",
                          "description": "Indicates if this is the primary phone number"
                        }
                      }
                    }
                  },
                  "isPrimary": {
                    "type": "boolean",
                    "description": "Indicates if this is the primary person"
                  }
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.get('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdUser._id
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          assert.equal(res.body.length, 1, 'Expected only one community to have been returned for this user');
          done();
        });
    });

    it('should respond with 400 Validation Error. Invalid Owner Type', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.get('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'community',
          'context-id': createdUser._id
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;

          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "code": 400000,
                "message": "The owner kind [community] is not valid for this entity."
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });

    it('should respond with 400 Validation Error. Owner not found', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "code",
                "message",
                "path"
              ],
              "properties": {
                "code": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.get('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'user',
          'context-id': createdCommunity._id
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;

          const expectedResponse = {
            "name": "ValidationError",
            "code": "MODEL_VALIDATION_FAILED",
            "message": "Some validation errors occurred.",
            "results": {
              "errors": [{
                "message": `An owner with id [${createdCommunity._id}] could not be found`
              }]
            },
            "status": 400
          };

          assert.deepEqual(res.body, expectedResponse, 'the expected error body was not returned');

          done();
        });
    });

    it('should respond with 405 Method not supported Error...', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "stack": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.patch('/v1/community')
        .set('Content-Type', 'application/json')
        .set({
          'context': 'DATA GOES HERE',
          'context-id': 'DATA GOES HERE'
        })
        .expect(405)
        .end(function(err, res) {
          if (err) return done(err);

          validator.validate(res.body, schema).should.be.true;
          done();
        });
    });

  });

});
