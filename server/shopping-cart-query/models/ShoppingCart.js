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

var customer = new schema(
  {
    user: user,
    businesses: [business],
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
    currency: {type: String, required: true},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false}
  }
);

var payment = new schema(
  {
    amount: {type: Number, required: true},
    currency: {type: String, required: true},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false}
  }
);

var itemDetail = new schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    qtyInStock: {type: Number, required: true},
    tax: {type: Number, required: false},
    paymentRequirement: {type: Number, required: true, enum: paymentRequirementEnum},
    currency: {type: String, required: true},
  }
);

var itemTypeEnum = [0, 1];
var itemStatusEnum = [0, 1, 2, 3];

var item = new schema(
  {
    product: product,
    payment: payment,
    detail: itemDetail,
    qty: {type: Number, required: false},
    type: {type: Number, required: false, enum: itemTypeEnum},
    status: {type: Number, required: false, enum: itemStatusEnum},
    createdAt: {type: Date, required: false},
    updatedAt: {type: Date, required: false}
  }
);

var shoppingCartStatusEnum = [0, 1];
var shoppingCart = new schema(
  {
    customer: customer,
    status: {type: Number, required: false, enum: shoppingCartStatusEnum},
    items: [item]
  },
  {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
);



/**
 * Defines the schema for the provider model
 */
module.exports = mongoose.model('shoppingCart', shoppingCart);