'use strict';

const constants = require('../../Constants');
const Message = require('../../libs/PubSub/Message');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventEmitter = require('../../libs/InternalEventEmitter');

function emitInternalEventCommitEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.EventCommit.CreatedCompletedEvent, function(response){
  });
  
  internalEventEmitter.on(channelDetails.Internal.EventCommit.DeletedCompletedEvent, function(response){
  });
  
  internalEventEmitter.on(channelDetails.Internal.EventCommit.UpdatedCompletedEvent, function(response){
  });

  switch (message.action) {
    case constants.pubSub.message.product.action.eventCommit.created:
      internalEventEmitter.emit(channelDetails.Internal.EventCommit.CreatedEvent, message);
      break;
    case constants.pubSub.message.product.action.eventCommit.deleted:
      internalEventEmitter.emit(channelDetails.Internal.EventCommit.DeletedEvent, message);
      break;
    case constants.pubSub.message.product.action.eventCommit.updated:
      internalEventEmitter.emit(channelDetails.Internal.EventCommit.UpdatedEvent, message);
      break;
    default:
      console.error(`Type [${message.type}] is not supported`);
  }
}

function emitInternalQueryEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.Query.GetAllCompletedEvent, function(response){
    _sendQueryCompleted(message, response, channelDetails, constants.pubSub.message.product.action.query.getAll);
  });
  internalEventEmitter.on(channelDetails.Internal.Query.GetSingleCompletedEvent, function(response){
    _sendQueryCompleted(message, response, channelDetails, constants.pubSub.message.product.action.query.getSingle);
  });

  switch (message.action) {
    case constants.pubSub.message.product.action.query.getAll:
      internalEventEmitter.emit(channelDetails.Internal.Query.GetAllEvent, message);
      break;
    case constants.pubSub.message.product.action.query.getSingle:
      internalEventEmitter.emit(channelDetails.Internal.Query.GetSingleEvent, message);
      break;
    default:
      console.error(`Action [${message.action}] is not supported`);
  }
}

/**
 * Publishes an external CRUD completed event
 *
 * @param {object} request - The original CRUD request object
 * @param {object} response - The CRUD response object
 * @param {object} channelDetails - Contains the external channelDetails details
 * @param {string} action - The CRUD action that was specified on the request
 *
 * @private
 */
function _sendQueryCompleted(request, response, channelDetails, action) {

  // pass the same messageId that was set on the request so that the gateway can map the completed event back to 
  // the original event
  var completedResponse = new Message(
    "",
    "",
    action,
    response,
    request.header.messageId
  );

  pubSub.publish(
    channelDetails.Query.CompletedEvent, 
    {}, 
    completedResponse);
}
module.exports = {
  emitInternalEventCommitEvents,
  emitInternalQueryEvents
};
