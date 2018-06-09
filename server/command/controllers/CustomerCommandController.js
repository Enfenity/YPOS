'use strict';

var customerCommandHandler = require('../handlers/CustomerCommandHandler');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var customerChannels = require('../../PubSubChannels').Customer;

internalEventEmitter.on(customerChannels.Internal.Command.CreateEvent, function(event){
  customerCommandHandler.handle(event);
});

internalEventEmitter.on(customerChannels.Internal.Command.DeleteEvent, function(event){
  customerCommandHandler.handle(event);
});

internalEventEmitter.on(customerChannels.Internal.Command.AddCustomerBusinessEvent, function(event){
  customerCommandHandler.handle(event);
});

internalEventEmitter.on(customerChannels.Internal.Command.RemoveCustomerBusinessEvent, function(event){
  customerCommandHandler.handle(event);
});
