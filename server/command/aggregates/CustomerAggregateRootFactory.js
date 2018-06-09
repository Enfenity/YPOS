'use strict';

const constants = require('../../Constants');
const Commit = require('../models/Commit');

function AggregateRoot(){
  let that = this;

  this.aggregateRootName = "Customer";
  
  this.changes = [];

  this.getUncommittedChanges = function () {
    return that.changes;
  };

  this.markChangesAsCommitted = function() {
    that.changes = [];
  };

  this.createCustomer = function(request){
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
    commit.action = constants.pubSub.message.customer.action.eventCommit.created;
    that.changes.push(commit);
  };

  this.deleteCustomer = function(request){
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
    commit.action = constants.pubSub.message.customer.action.eventCommit.deleted;
    that.changes.push(commit);
    
  };

  this.addBusiness = function(request){
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
    commit.action = constants.pubSub.message.customer.action.eventCommit.businessAdded;
    that.changes.push(commit);
    
  };

  this.removeBusiness = function(request){
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
    commit.action = constants.pubSub.message.customer.action.eventCommit.businessRemoved;
    that.changes.push(commit);
    
  };

}

module.exports = {
  getInstance: function () {
    return new AggregateRoot()
  }
};
