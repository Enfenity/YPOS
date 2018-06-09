'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var commit = new schema(
  {
    aggregateRootId: {type: String, required: false},
    aggregateRootName: {type: String, required: false},
    action: {type: String, required: false},
    version: {type: String, required: false},
    data: {type: schema.Types.Mixed, required: false}
  },
  {timestamps: {createdAt: 'createdAt'}}
);

/**
 * Defines the schema for the user model
 */
module.exports = mongoose.model('commit', commit);