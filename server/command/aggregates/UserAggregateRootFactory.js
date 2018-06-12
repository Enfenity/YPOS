'use strict';

const constants = require('../../Constants');
const Commit = require('../models/Commit');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const Message = require('../../libs/PubSub/Message');
const pubSubChannels = require('../../PubSubChannels');
const validationError = require('../../libs/error/ValidationError');
const errors = require('../../ErrorCodes');

function AggregateRoot() {
  let that = this;

  this.changes = [];
  this.aggregateRootName = "User";

  this.getUncommittedChanges = function () {
    return that.changes;
  };

  this.markChangesAsCommitted = function () {
    that.changes = [];
  };

  this.createUser = async function (request) {

    let completed =
      await pubSub.publishAndWaitForResponse(
        pubSubChannels.User.Query.Event,
        pubSubChannels.User.Query.CompletedEvent,
        {
          subscriberType: constants.pubSub.recipients.gateway
        },
        new Message(
          "",
          "",
          constants.pubSub.message.user.action.query.getAll,
          {
            email: request.email
          }
        ));

    if (completed.payload.body && completed.payload.body.length > 0) {
      // this means a user with the same email already exists

      throw new validationError(
        'Some validation errors occurred.',
        [
          {
            code: errors.User.EMAIL_ALREADY_EXIST,
            message: `A user with email [${request.email}] already exists.`,
            path: ['email']
          }
        ]
      )

    }

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
    commit.action = constants.pubSub.message.user.action.eventCommit.created;
    that.changes.push(commit);
  };

  this.deleteUser = function (request) {
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
    commit.action = constants.pubSub.message.user.action.eventCommit.deleted;
    that.changes.push(commit);

  };

  this.updateUser = function (request) {
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
    commit.action = constants.pubSub.message.user.action.eventCommit.updated;
    that.changes.push(commit);
  };

}

module.exports = {
  getInstance: function () {
    return new AggregateRoot()
  }
};
