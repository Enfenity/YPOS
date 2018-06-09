'use strict';

var logging = require('../utilities/Logging');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var constants = require('../../Constants');
var pubSubChannels = require('../../PubSubChannels');

/**
 * The Company Service module
 */
module.exports = {

  /**
   * Creates a company
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  addCustomerBusiness: async function addCustomerBusiness(args, response, next) {
    var request = new Message(
      "",
      "",
      constants.pubSub.message.customer.action.command.addBusiness,
      {
        business: args.business.value,
        id: args.id.value
      }
    );

    try {
      let customerEventCompleted =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Customer.Command.Event,
          pubSubChannels.Customer.Command.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = customerEventCompleted.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(customerEventCompleted.payload.body));

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Customer.Command.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns all companies
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  removeCustomerBusiness: async function removeCustomerBusiness(args, response, next) {

    var request = new Message(
      "",
      "",
      constants.pubSub.message.customer.action.command.removeBusiness,
      {
        id: args.id.value,
        businessId: args.businessId.value        
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Customer.Command.Event,
          pubSubChannels.Customer.Command.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Customer.Command.CompletedEvent}]`, err);
      return next(err);
    }
  }
 
};