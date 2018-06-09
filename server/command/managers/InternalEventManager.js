'use strict';

const constants = require('../../Constants');
const Message = require('../../libs/PubSub/Message');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventEmitter = require('../../libs/InternalEventEmitter');

function emitInternalUserCommandEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.Command.CreateCompletedEvent, function(response){
    _sendCommandCompleted(
      message, 
      response, 
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.UpdateCompletedEvent, function(response) {
    _sendCommandCompleted(
      message, 
      response, 
      channelDetails);
  });
  
  internalEventEmitter.on(channelDetails.Internal.Command.DeleteCompletedEvent, function(response){
    _sendCommandCompleted(
      message, 
      response, 
      channelDetails);
  });

  switch (message.action) {
    case constants.pubSub.message.user.action.command.create:
      internalEventEmitter.emit(channelDetails.Internal.Command.CreateEvent, message);
      break;
    case constants.pubSub.message.user.action.command.update:
      internalEventEmitter.emit(channelDetails.Internal.Command.UpdateEvent, message);
      break;
    case constants.pubSub.message.user.action.command.delete:
      internalEventEmitter.emit(channelDetails.Internal.Command.DeleteEvent, message);
      break;    
    default:
      console.error(`Type [${message.type}] is not supported`);
  }
}

function emitInternalProductCommandEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.Command.CreateCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.UpdateCompletedEvent, function(response) {
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.DeleteCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  switch (message.action) {
    case constants.pubSub.message.product.action.command.create:
      internalEventEmitter.emit(channelDetails.Internal.Command.CreateEvent, message);
      break;
    case constants.pubSub.message.product.action.command.update:
      internalEventEmitter.emit(channelDetails.Internal.Command.UpdateEvent, message);
      break;
    case constants.pubSub.message.product.action.command.delete:
      internalEventEmitter.emit(channelDetails.Internal.Command.DeleteEvent, message);
      break;
    default:
      console.error(`Type [${message.type}] is not supported`);
  }
}

function emitInternalShoppingCartCommandEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.Command.CreateCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.DeleteCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.AddShoppingCartItemCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.RemoveShoppingCartItemCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  switch (message.action) {
    case constants.pubSub.message.shoppingCart.action.command.create:
      internalEventEmitter.emit(channelDetails.Internal.Command.CreateEvent, message);
      break;
    case constants.pubSub.message.shoppingCart.action.command.delete:
      internalEventEmitter.emit(channelDetails.Internal.Command.DeleteEvent, message);
      break;
    case constants.pubSub.message.shoppingCart.action.command.addItem:
      internalEventEmitter.emit(channelDetails.Internal.Command.AddShoppingCartItemEvent, message);
      break;
    case constants.pubSub.message.shoppingCart.action.command.removeItem:
      internalEventEmitter.emit(channelDetails.Internal.Command.RemoveShoppingCartItemEvent, message);
      break;
    default:
      console.error(`Type [${message.type}] is not supported`);
  }
}

function emitInternalBusinessCommandEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.Command.CreateCompletedEvent, function(response){
    _sendCommandCompleted(
      message, 
      response, 
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.UpdateCompletedEvent, function(response) {
    _sendCommandCompleted(
      message, 
      response, 
      channelDetails);
  });
  
  internalEventEmitter.on(channelDetails.Internal.Command.DeleteCompletedEvent, function(response){
    _sendCommandCompleted(
      message, 
      response, 
      channelDetails);
  });

  switch (message.action) {
    case constants.pubSub.message.business.action.command.create:
      internalEventEmitter.emit(channelDetails.Internal.Command.CreateEvent, message);
      break;
    case constants.pubSub.message.business.action.command.update:
      internalEventEmitter.emit(channelDetails.Internal.Command.UpdateEvent, message);
      break;
    case constants.pubSub.message.business.action.command.delete:
      internalEventEmitter.emit(channelDetails.Internal.Command.DeleteEvent, message);
      break;    
    default:
      console.error(`Type [${message.type}] is not supported`);
  }
}

function emitInternalCustomerCommandEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.Command.CreateCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });
  
  internalEventEmitter.on(channelDetails.Internal.Command.AddCustomerBusinessCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.DeleteCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });
  
  internalEventEmitter.on(channelDetails.Internal.Command.RemoveCustomerBusinessCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  switch (message.action) {
    case constants.pubSub.message.customer.action.command.create:
      internalEventEmitter.emit(channelDetails.Internal.Command.CreateEvent, message);
      break;
    case constants.pubSub.message.customer.action.command.delete:
      internalEventEmitter.emit(channelDetails.Internal.Command.DeleteEvent, message);
      break;
    case constants.pubSub.message.customer.action.command.addBusiness:
      internalEventEmitter.emit(channelDetails.Internal.Command.AddCustomerBusinessEvent, message);
      break;
    case constants.pubSub.message.customer.action.command.removeBusiness:
      internalEventEmitter.emit(channelDetails.Internal.Command.RemoveCustomerBusinessEvent, message);
      break;
    default:
      console.error(`Action [${message.action}] is not supported`);
  }
}

function emitInternalProviderCommandEvents(message, channelDetails) {
  internalEventEmitter.on(channelDetails.Internal.Command.CreateCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.AddProviderBusinessCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.DeleteCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  internalEventEmitter.on(channelDetails.Internal.Command.RemoveProviderBusinessCompletedEvent, function(response){
    _sendCommandCompleted(
      message,
      response,
      channelDetails);
  });

  switch (message.action) {
    case constants.pubSub.message.provider.action.command.create:
      internalEventEmitter.emit(channelDetails.Internal.Command.CreateEvent, message);
      break;
    case constants.pubSub.message.provider.action.command.delete:
      internalEventEmitter.emit(channelDetails.Internal.Command.DeleteEvent, message);
      break;
    case constants.pubSub.message.provider.action.command.addBusiness:
      internalEventEmitter.emit(channelDetails.Internal.Command.AddProviderBusinessEvent, message);
      break;
    case constants.pubSub.message.provider.action.command.removeBusiness:
      internalEventEmitter.emit(channelDetails.Internal.Command.RemoveProviderBusinessEvent, message);
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
 *
 * @private
 */
function _sendCommandCompleted(request, response, channelDetails) {

  // pass the same messageId that was set on the request so that the gateway can map the completed event back to 
  // the original event
  var completedResponse = new Message(
    channelDetails.Command.CompletedEvent,
    "",
    "",
    response,
    request.header.messageId
  );

  pubSub.publish(
    channelDetails.Command.CompletedEvent, 
    {}, 
    completedResponse);
}

module.exports = {
  emitInternalUserCommandEvents,
  emitInternalBusinessCommandEvents,
  emitInternalCustomerCommandEvents,
  emitInternalProviderCommandEvents,
  emitInternalProductCommandEvents,
  emitInternalShoppingCartCommandEvents
};
