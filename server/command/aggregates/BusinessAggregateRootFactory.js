'use strict';

const constants = require('../../Constants');
const Commit = require('../models/Commit');

function AggregateRoot(){
  let that = this;

  this.aggregateRootName = "Business";
  
  this.changes = [];

  this.getUncommittedChanges = function () {
    return that.changes;
  };

  this.markChangesAsCommitted = function() {
    that.changes = [];
  };

  this.createBusiness = function(request){
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
    commit.action = constants.pubSub.message.business.action.eventCommit.created;
    that.changes.push(commit);
  };

  this.deleteBusiness = function(request){
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
    commit.action = constants.pubSub.message.business.action.eventCommit.deleted;
    that.changes.push(commit);
    
  };

  this.updateBusiness = function(request){
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
    commit.action = constants.pubSub.message.business.action.eventCommit.updated;
    that.changes.push(commit);
  };

}

module.exports = {
  getInstance: function () {
    return new AggregateRoot()
  }
};
