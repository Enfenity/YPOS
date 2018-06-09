'use strict';

var Commit = require('../models/Commit');
var CommandResponse = require('../models/CommandResponse');
var logging = require('../utilities/Logging');
var providerChannels = require('../../PubSubChannels').Provider;
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var providerAggregateRootFactory = require('../aggregates/ProviderAggregateRootFactory');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
const constants = require('../../Constants');

module.exports = {

  handle: async function handle(request) {
    var aggregateRoot = providerAggregateRootFactory.getInstance();
    var completedEvent = null;
    var successStatusCode = null;

    switch(request.action){
      case constants.pubSub.message.provider.action.command.create:
        aggregateRoot.createProvider(request.payload);
        completedEvent = providerChannels.Internal.Command.CreateCompletedEvent;
        successStatusCode = 201;
        break;
      case constants.pubSub.message.provider.action.command.delete:
        aggregateRoot.deleteProvider(request.payload);
        completedEvent = providerChannels.Internal.Command.DeleteCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.provider.action.command.addBusiness:
        aggregateRoot.addBusiness(request.payload);
        completedEvent = providerChannels.Internal.Command.AddProviderBusinessCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.provider.action.command.removeBusiness:
        aggregateRoot.removeBusiness(request.payload);
        completedEvent = providerChannels.Internal.Command.RemoveProviderBusinessCompletedEvent;
        successStatusCode = 200;
        break;
    }

    var uncommittedChanges = aggregateRoot.getUncommittedChanges();

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to commit provider changes'
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
          providerChannels.EventCommit.Event,
          {},
          commitEvent);
      } catch (err) {
        errors.push(err);
      }
    });

    aggregateRoot.markChangesAsCommitted();

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