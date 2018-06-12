'use strict';

var Product = require('../models/Product');
var logging = require('../utilities/Logging');
var businessChannels = require('../../PubSubChannels').Business;
var Message = require('../../libs/PubSub/Message');
var resourceNotFoundError = require('../../libs/error/ResourceNotFoundError');
var appUtil = require('../../libs/AppUtil');
var config = require('config');
var _ = require('lodash');
var mongoose = require('mongoose');
var internalEventEmitter = require('../../libs/InternalEventEmitter');

module.exports = {

  updateBusiness: async function updateBusiness(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to update business info on all products'
    );

    let products = [];

    try {
      products = await Product.find({'business.id': mongoose.Schema.ObjectId(request.id)});
    } catch (err) {
      return internalEventEmitter.emit(
        businessChannels.Internal.EventCommit.UpdatedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    _.forEach(products, async function(product) {
      product.business.name = request.name;
      await product.save();
    });

    return internalEventEmitter.emit(
      businessChannels.Internal.EventCommit.UpdatedCompletedEvent,
      {
        statusCode: 200,
        body: {message: "success"}
      }
    );
  }

};