'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user = new schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: false}
  },
  {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
);

/**
 * Defines the schema for the user model
 */
module.exports = mongoose.model('user', user);