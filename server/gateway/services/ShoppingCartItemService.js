'use strict';

var logging = require('../utilities/Logging');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var constants = require('../../Constants');
var pubSubChannels = require('../../PubSubChannels');
/**
 * The Community Service module
 */
module.exports = {

  /**
   * Creates a shopping cart
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  addShoppingCartItem: async function addShoppingCartItem(args, response, next) {
    var request = new Message(
      "",
      "",
      constants.pubSub.message.shoppingCart.action.command.addItem,
      {
        id: args.id.value,
        item: args.shoppingCart.value
      }
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
   * Deletes a shopping cart
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  deleteShoppingCartItem: async function deleteShoppingCartItem(args, response, next) {

    var request = new Message(
      "",
      "",
      constants.pubSub.message.shoppingCart.action.command.removeItem,
      {
        id: args.id.value,
        itemId: args.itemId.value
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