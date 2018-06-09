'use strict';

var logging = require('../utilities/Logging');
var _ = require('lodash');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var constants = require('../../Constants');
var pubSubChannels = require('../../PubSubChannels');

/**
 * The Friend Service module
 */
module.exports = {

  /**
   * Creates a customer
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createCustomer: async function createCustomer(args, response, next) {
    var customerRequest = args.customer.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.customer.action.command.create,
      customerRequest
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
   * Returns all customers
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getAllCustomers: async function getAllCustomers(args, response, next) {

    var request = new Message(
      "",
      "",
      constants.pubSub.message.customer.action.query.getAll,
      {}
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Customer.Query.Event,
          pubSubChannels.Customer.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Customer.Query.CompletedEvent}]`, err);
      return next(err);
    }
  },

  /**
   * Returns a single customer
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getSingleCustomer: async function getSingleCustomer(args, response, next) {

    var entityId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.customer.action.query.getSingle,
      {
        id: entityId
      }
    );

    try {
      let completed =
        await pubSub.publishAndWaitForResponse(
          pubSubChannels.Customer.Query.Event,
          pubSubChannels.Customer.Query.CompletedEvent,
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
        `Failed to publish to channel [${pubSubChannels.Customer.Query.CompletedEvent}]`, err);
      return next(err);
    }

  },
  /**
   * Deletes a customer
   *
   * @param {object} args - The request arguments passed in from the controller
   * @param {IncomingMessage} response - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  deleteCustomer: async function deleteCustomer(args, response, next) {
    var entityId = args.id.value;

    var request = new Message(
      "",
      "",
      constants.pubSub.message.customer.action.command.delete,
      {
        id: entityId
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