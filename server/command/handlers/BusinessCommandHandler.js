'use strict';

var Commit = require('../models/Commit');
var CommandResponse = require('../models/CommandResponse');
var logging = require('../utilities/Logging');
var businessChannels = require('../../PubSubChannels').Business;
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var businessAggregateRootFactory = require('../aggregates/BusinessAggregateRootFactory');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
const constants = require('../../Constants');

/**
 * The User Service module
 */
module.exports = {

  handle: async function handle(request) {
    var businessAggregateRoot = businessAggregateRootFactory.getInstance();
    var completedEvent = null;
    var successStatusCode = null;

    switch(request.action){
      case constants.pubSub.message.business.action.command.create:
        businessAggregateRoot.createBusiness(request.payload);
        completedEvent = businessChannels.Internal.Command.CreateCompletedEvent;
        successStatusCode = 201;
        break;
      case constants.pubSub.message.business.action.command.update:
        businessAggregateRoot.updateBusiness(request.payload);
        completedEvent = businessChannels.Internal.Command.UpdateCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.business.action.command.delete:
        businessAggregateRoot.deleteBusiness(request.payload);
        completedEvent = businessChannels.Internal.Command.DeleteCompletedEvent;
        successStatusCode = 200;
        break;
    }

    var uncommittedChanges = businessAggregateRoot.getUncommittedChanges();

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to commit business changes'
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
          businessChannels.EventCommit.Event,
          {},
          commitEvent);
      } catch (err) {
        errors.push(err);
      }
    });

    businessAggregateRoot.markChangesAsCommitted();

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