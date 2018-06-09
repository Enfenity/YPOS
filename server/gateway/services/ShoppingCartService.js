'use strict';

var logging = require('../utilities/Logging');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var constants = require('../../Constants');
var pubSubChannels = require('../../PubSubChannels');

module.exports = {

  /**
   * Creates a cart
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createShoppingCart: async function createShoppingCart(args, response, next) {
    var cartRequest = args.shoppingCart.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.shoppingCart.action.command.create,
      cartRequest
    );

    try {
      let userEventCompleted =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.ShoppingCart.Command.Event,
          pubSubChannels.ShoppingCart.Command.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.ShoppingCart.Command.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns all carts
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getAllShoppingCarts: async function getAllShoppingCarts(args, response, next) {

    var request = new Message(
      "",
      "",
      constants.pubSub.message.shoppingCart.action.query.getAll,
      {}
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.ShoppingCart.Query.Event,
          pubSubChannels.ShoppingCart.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.ShoppingCart.Query.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns a single cart
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getSingleShoppingCart: async function getSingleShoppingCart(args, response, next) {

    var userId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.shoppingCart.action.query.getSingle,
      {
        id: userId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.ShoppingCart.Query.Event,
          pubSubChannels.ShoppingCart.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.ShoppingCart.Query.CompletedEvent}]`, err);
      return next(err);
    }

  },
  
  /**
   * Deletes a cart
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  deleteShoppingCart: async function deleteShoppingCart(args, response, next) {
    var userId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.shoppingCart.action.command.delete,
      {
        id: userId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.ShoppingCart.Command.Event,
          pubSubChannels.ShoppingCart.Command.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.ShoppingCart.Command.CompletedEvent}]`, err);
      return next(err);
    }
  }
};