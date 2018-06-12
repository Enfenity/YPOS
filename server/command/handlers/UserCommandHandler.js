'use strict';

var Commit = require('../models/Commit');
var CommandResponse = require('../models/CommandResponse');
var logging = require('../utilities/Logging');
var userChannels = require('../../PubSubChannels').User;
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var userAggregateRootFactory = require('../aggregates/UserAggregateRootFactory');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
const constants = require('../../Constants');

/**
 * The User Service module
 */
module.exports = {

  handle: async function handle(request) {
    var userAggregateRoot = userAggregateRootFactory.getInstance();
    var completedEvent = null;
    var successStatusCode = null;

    switch(request.action){
      case constants.pubSub.message.user.action.command.create:
        try{
          completedEvent = userChannels.Internal.Command.CreateCompletedEvent;
          await userAggregateRoot.createUser(request.payload);
        } catch(err) {
          return internalEventEmitter.emit(
            completedEvent,
            {
              statusCode: 400,
              body: err
            }
          );
        }

        successStatusCode = 201;
        break;
      case constants.pubSub.message.user.action.command.update:
        userAggregateRoot.updateUser(request.payload);
        completedEvent = userChannels.Internal.Command.UpdateCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.user.action.command.delete:
        userAggregateRoot.deleteUser(request.payload);
        completedEvent = userChannels.Internal.Command.DeleteCompletedEvent;
        successStatusCode = 200;
        break;
    }

    var uncommittedChanges = userAggregateRoot.getUncommittedChanges();

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to commit user changes'
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
          userChannels.EventCommit.Event,
          {},
          commitEvent);
      } catch (err) {
        errors.push(err);
      }
    });

    userAggregateRoot.markChangesAsCommitted();

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