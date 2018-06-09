'use strict';

var logging = require('../utilities/Logging');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var constants = require('../../Constants');
var pubSubChannels = require('../../PubSubChannels');
/**
 * The Chat Service module
 */
module.exports = {

  /**
   * Creates a business
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createBusiness: async function createBusiness(args, response, next) {
    var businessRequest = args.business.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.business.action.command.create,
      businessRequest
    );

    try {
      let businessEventCompleted =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Business.Command.Event,
          pubSubChannels.Business.Command.CompletedEvent,
          {
            subscriberType: constants.pubSub.recipients.gateway
          },
          request);

      response.statusCode = businessEventCompleted.payload.statusCode;
      response.setHeader('Content-Type', 'application/json');
      return response.end(JSON.stringify(businessEventCompleted.payload.body));

    } catch (err) {
      logging.logAction(
        logging.logLevels.ERROR,
        `Failed to publish to channel [${pubSubChannels.Business.Command.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns all businesses
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getAllBusinesses: async function getAllBusinesses(args, response, next) {
    var request = new Message(
      "",
      "",
      constants.pubSub.message.business.action.query.getAll,
      {}
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Business.Query.Event,
          pubSubChannels.Business.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Business.Query.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns a single chat
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getSingleBusiness: async function getSingleBusiness(args, response, next) {

    var entityId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.business.action.query.getSingle,
      {
        id: entityId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Business.Query.Event,
          pubSubChannels.Business.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Business.Query.CompletedEvent}]`, err);
      return next(err);
    }

  },
  /**
   * Deletes a chat
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  deleteBusiness: async function deleteBusiness(args, response, next) {
    var entityId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.business.action.command.delete,
      {
        id: entityId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Business.Command.Event,
          pubSubChannels.Business.Command.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Business.Command.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Updates a chat
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  updateBusiness: async function updateBusiness(args, response, next) {
    
    var businessRequest = args.business.value;
    businessRequest.id = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.business.action.command.update,
      businessRequest
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Business.Command.Event,
          pubSubChannels.Business.Command.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Business.Command.CompletedEvent}]`, err);
      return next(err);
    }
   
  }
};