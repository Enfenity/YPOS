'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var business = new schema(
  {
    name: {type: String, required: true},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false}
  }
);

var paymentRequirementEnum = [0, 1, 2];

var product = new schema(
  {
    business: business,
    name: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    qtyInStock: {type: Number, required: true},
    tax: {type: Number, required: false},
    paymentRequirement: {type: Number, required: true, enum: paymentRequirementEnum},
    currency: {type: String, required: true}
  },
  {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
);

/**
 * Defines the schema for the product model
 */
module.exports = mongoose.model('product', product);