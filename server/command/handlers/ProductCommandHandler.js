'use strict';

var Commit = require('../models/Commit');
var CommandResponse = require('../models/CommandResponse');
var logging = require('../utilities/Logging');
var productChannels = require('../../PubSubChannels').Product;
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var productAggregateRootFactory = require('../aggregates/ProductAggregateRootFactory');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
const constants = require('../../Constants');

module.exports = {

  handle: async function handle(request) {
    var aggregateRoot = productAggregateRootFactory.getInstance();
    var completedEvent = null;
    var successStatusCode = null;

    switch(request.action){
      case constants.pubSub.message.product.action.command.create:
        aggregateRoot.createProduct(request.payload);
        completedEvent = productChannels.Internal.Command.CreateCompletedEvent;
        successStatusCode = 201;
        break;
      case constants.pubSub.message.product.action.command.update:
        aggregateRoot.updateProduct(request.payload);
        completedEvent = productChannels.Internal.Command.UpdateCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.product.action.command.delete:
        aggregateRoot.deleteProduct(request.payload);
        completedEvent = productChannels.Internal.Command.DeleteCompletedEvent;
        successStatusCode = 200;
        break;
    }

    var uncommittedChanges = aggregateRoot.getUncommittedChanges();

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to commit product changes'
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
          productChannels.EventCommit.Event,
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