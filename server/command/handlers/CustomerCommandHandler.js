'use strict';

var Commit = require('../models/Commit');
var CommandResponse = require('../models/CommandResponse');
var logging = require('../utilities/Logging');
var customerChannels = require('../../PubSubChannels').Customer;
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var customerAggregateRootFactory = require('../aggregates/CustomerAggregateRootFactory');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
const constants = require('../../Constants');

/**
 * The User Service module
 */
module.exports = {

  handle: async function handle(request) {
    var customerAggregateRoot = customerAggregateRootFactory.getInstance();
    var completedEvent = null;
    var successStatusCode = null;

    switch(request.action){
      case constants.pubSub.message.customer.action.command.create:
        customerAggregateRoot.createCustomer(request.payload);
        completedEvent = customerChannels.Internal.Command.CreateCompletedEvent;
        successStatusCode = 201;
        break;
      case constants.pubSub.message.customer.action.command.delete:
        customerAggregateRoot.deleteCustomer(request.payload);
        completedEvent = customerChannels.Internal.Command.DeleteCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.customer.action.command.addBusiness:
        customerAggregateRoot.addBusiness(request.payload);
        completedEvent = customerChannels.Internal.Command.AddCustomerBusinessCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.customer.action.command.removeBusiness:
        customerAggregateRoot.removeBusiness(request.payload);
        completedEvent = customerChannels.Internal.Command.RemoveCustomerBusinessCompletedEvent;
        successStatusCode = 200;
        break;
    }

    var uncommittedChanges = customerAggregateRoot.getUncommittedChanges();

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to commit customer changes'
    );

    var errors = [];

    _.forEach(uncommittedChanges, async function(commit){
      await commit.save();
      try {
        // Now we need to propagate the commit
        var commitEvent = new Message(
          "",
          "",
          commit.action,
          commit
        );

        await pubSub.publish(
          customerChannels.EventCommit.Event,
          {},
          commitEvent);
      } catch (err) {
        errors.push(err);
      }
    });

    customerAggregateRoot.markChangesAsCommitted();

    if(errors.length > 0){
      return internalEventEmitter.emit(
        completedEvent,
        {
          statusCode: 500,
          body: errors
        }
      );
    }

    return internalEventEmitter.emit(
      completedEvent,
      {
        statusCode: successStatusCode,
        body: new CommandResponse()
      }
    );
  }

};