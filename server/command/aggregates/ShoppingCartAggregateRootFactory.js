'use strict';

const constants = require('../../Constants');
const Commit = require('../models/Commit');

function AggregateRoot(){
  let that = this;

  this.changes = [];
  this.aggregateRootName = "ShoppingCart";

  this.getUncommittedChanges = function () {
    return that.changes;
  };

  this.markChangesAsCommitted = function() {
    that.changes = [];
  };

  this.createShoppingCart = function(request){
    // var validationResult = await userValidator.validateCreate(request);
    //
    // if (validationResult) {
    //   return internalEventEmitter.emit(
    //     productChannels.Internal.Command.CreateCompletedEvent,
    //     {
    //       statusCode: 400,
    //       body: validationResult
    //     }
    //   );
    // }
    let commit = new Commit();
    commit.data = request;
    commit.version = "1";
    commit.aggregateRootName = that.aggregateRootName;
    commit.action = constants.pubSub.message.shoppingCart.action.eventCommit.created;
    that.changes.push(commit);
  };

  this.deleteShoppingCart = function(request){
    // var validationResult = await userValidator.validateCreate(request);
    //
    // if (validationResult) {
    //   return internalEventEmitter.emit(
    //     productChannels.Internal.Command.CreateCompletedEvent,
    //     {
    //       statusCode: 400,
    //       body: validationResult
    //     }
    //   );
    // }
    
    let commit = new Commit();
    commit.data = request;
    commit.version = "1";
    commit.aggregateRootId = request.id;
    commit.aggregateRootName = that.aggregateRootName;
    commit.action = constants.pubSub.message.shoppingCart.action.eventCommit.deleted;
    that.changes.push(commit);
    
  };

  this.addItem = function(request){
    // var validationResult = await userValidator.validateCreate(request);
    //
    // if (validationResult) {
    //   return internalEventEmitter.emit(
    //     productChannels.Internal.Command.CreateCompletedEvent,
    //     {
    //       statusCode: 400,
    //       body: validationResult
    //     }
    //   );
    // }
    
    let commit = new Commit();
    commit.data = request;
    commit.version = "1";
    commit.aggregateRootId = request.id;
    commit.aggregateRootName = that.aggregateRootName;
    commit.action = constants.pubSub.message.shoppingCart.action.eventCommit.itemAdded;
    that.changes.push(commit);
  };

  this.removeItem = function(request){
    // var validationResult = await userValidator.validateCreate(request);
    //
    // if (validationResult) {
    //   return internalEventEmitter.emit(
    //     productChannels.Internal.Command.CreateCompletedEvent,
    //     {
    //       statusCode: 400,
    //       body: validationResult
    //     }
    //   );
    // }
    
    let commit = new Commit();
    commit.data = request;
    commit.version = "1";
    commit.aggregateRootId = request.id;
    commit.aggregateRootName = that.aggregateRootName;
    commit.action = constants.pubSub.message.shoppingCart.action.eventCommit.itemRemoved;
    that.changes.push(commit);
  };

}

module.exports = {
  getInstance: function () {
    return new AggregateRoot()
  }
};
