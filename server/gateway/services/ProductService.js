'use strict';

var logging = require('../utilities/Logging');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var constants = require('../../Constants');
var pubSubChannels = require('../../PubSubChannels');

module.exports = {

  /**
   * Creates a product
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createProduct: async function createProduct(args, response, next) {
    var productRequest = args.product.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.product.action.command.create,
      productRequest
    );

    try {
      let userEventCompleted =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Product.Command.Event,
          pubSubChannels.Product.Command.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = userEventCompleted.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(userEventCompleted.payload.body));

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Product.Command.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns all products
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getAllProducts: async function getAllProducts(args, response, next) {
    var request = new Message(
      "",
      "",
      constants.pubSub.message.product.action.query.getAll,
      {}
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Product.Query.Event,
          pubSubChannels.Product.Query.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = completed.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      if (completed.payload.header && completed.payload.header.resultCount) {
        response.setHeader('X-Result-Count', completed.payload.header.resultCount);
      }
      return response.end(JSON.stringify(completed.payload.body));

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Product.Query.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns a single product
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getSingleProduct: async function getSingleProduct(args, response, next) {

    var userId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.product.action.query.getSingle,
      {
        id: userId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Product.Query.Event,
          pubSubChannels.Product.Query.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = completed.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(completed.payload.body))

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Product.Query.CompletedEvent}]`, err);
      return next(err);
    }

  },
  /**
   * Deletes a product
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  deleteProduct: async function deleteProduct(args, response, next) {
    var userId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.product.action.command.delete,
      {
        id: userId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Product.Command.Event,
          pubSubChannels.Product.Command.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = completed.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(completed.payload.body))

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Product.Command.CompletedEvent}]`, err);
      return next(err);
    }
    
  },

  /**
   * Updates a product
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  updateProduct: async function updateProduct(args, response, next) {
    var productRequest = args.product.value;
    productRequest.id = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.product.action.command.update,
      productRequest
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Product.Command.Event,
          pubSubChannels.Product.Command.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = completed.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(completed.payload.body))
    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Product.Command.CompletedEvent}]`, err);
      return next(err);
    }
   
  }
};