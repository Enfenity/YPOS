'use strict';

var Commit = require('../models/Commit');
var CommandResponse = require('../models/CommandResponse');
var logging = require('../utilities/Logging');
var cartChannels = require('../../PubSubChannels').ShoppingCart;
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var shoppingCartAggregateRootFactory = require('../aggregates/ShoppingCartAggregateRootFactory');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
const constants = require('../../Constants');

module.exports = {

  handle: async function handle(request) {
    var aggregateRoot = shoppingCartAggregateRootFactory.getInstance();
    var completedEvent = null;
    var successStatusCode = null;

    switch(request.action){
      case constants.pubSub.message.shoppingCart.action.command.create:
        aggregateRoot.createShoppingCart(request.payload);
        completedEvent = cartChannels.Internal.Command.CreateCompletedEvent;
        successStatusCode = 201;
        break;
      case constants.pubSub.message.shoppingCart.action.command.delete:
        aggregateRoot.deleteShoppingCart(request.payload);
        completedEvent = cartChannels.Internal.Command.DeleteCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.shoppingCart.action.command.addItem:
        aggregateRoot.addItem(request.payload);
        completedEvent = cartChannels.Internal.Command.AddShoppingCartItemCompletedEvent;
        successStatusCode = 200;
        break;
      case constants.pubSub.message.shoppingCart.action.command.removeItem:
        aggregateRoot.removeItem(request.payload);
        completedEvent = cartChannels.Internal.Command.RemoveShoppingCartItemCompletedEvent;
        successStatusCode = 200;
        break;
    }

    var uncommittedChanges = 
      aggregateRoot.getUncommittedChanges();

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to commit shopping cart changes'
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
          cartChannels.EventCommit.Event,
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