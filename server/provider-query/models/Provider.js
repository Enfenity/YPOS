'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user = new schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: false},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false}
  }
);

var business = new schema(
  {
    name: {type: String, required: true},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false}
  }
);

var provider = new schema(
  {
    user: user,
    businesses: [business]
  },
  {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
);

/**
 * Defines the schema for the provider model
 */
module.exports = mongoose.model('provider', provider);