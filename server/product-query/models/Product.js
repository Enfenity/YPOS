'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var business = new schema(
  {
    name: {type: String, required: true},
    id: {type: mongoose.Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false}
  },
  {_id : false}
);

var paymentRequirementEnum = [0, 1, 2];

var product = new schema(
  {
    business: business,
    businessId: {type: String, required: false},
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