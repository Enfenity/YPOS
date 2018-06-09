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
   * Creates a Provider
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  addProviderBusiness: async function addProviderBusiness(args, response, next) {
    var request = new Message(
      "",
      "",
      constants.pubSub.message.provider.action.command.addBusiness,
      {
        business: args.business.value,
        id: args.id.value
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Provider.Command.Event,
          pubSubChannels.Provider.Command.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = completed.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(completed.payload.body));

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Provider.Command.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Deletes a Provider
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  removeProviderBusiness: async function removeProviderBusiness(args, response, next) {

    var request = new Message(
      "",
      "",
      constants.pubSub.message.provider.action.command.removeBusiness,
      {
        id: args.id.value,
        businessId: args.businessId.value
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Provider.Command.Event,
          pubSubChannels.Provider.Command.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Provider.Command.CompletedEvent}]`, err);
      return next(err);
    }
    
  }

};