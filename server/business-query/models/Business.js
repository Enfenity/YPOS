'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var business = new schema(
  {
    name: {type: String, required: true}
  },
  {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
);

/**
 * Defines the schema for the business model
 */
module.exports = mongoose.model('business', business);