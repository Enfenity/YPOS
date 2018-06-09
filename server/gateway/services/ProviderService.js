'use strict';

var logging = require('../utilities/Logging');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var constants = require('../../Constants');
var pubSubChannels = require('../../PubSubChannels');

/**
 * The Registration Service module
 */
module.exports = {
  /**
   * Creates a Provider
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createProvider: async function createProvider(args, response, next) {
    var providerRequest = args.provider.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.provider.action.command.create,
      providerRequest
    );

    try {
      let providerEventCompleted =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Provider.Command.Event,
          pubSubChannels.Provider.Command.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = providerEventCompleted.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(providerEventCompleted.payload.body));

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Provider.Command.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns all Providers
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getAllProviders: async function getAllProviders(args, response, next) {

    var request = new Message(
      "",
      "",
      constants.pubSub.message.provider.action.query.getAll,
      {}
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Provider.Query.Event,
          pubSubChannels.Provider.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Provider.Query.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns a single Provider
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getSingleProvider: async function getSingleProvider(args, response, next) {

    var entityId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.provider.action.query.getSingle,
      {
        id: entityId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Provider.Query.Event,
          pubSubChannels.Provider.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Provider.Query.CompletedEvent}]`, err);
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
  deleteProvider: async function deleteProvider(args, response, next) {
    var entityId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.provider.action.command.delete,
      {
        id: entityId
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