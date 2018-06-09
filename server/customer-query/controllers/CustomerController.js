'use strict';

var customerService = require('../services/CustomerService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var customerChannels = require('../../PubSubChannels').Customer;

internalEventEmitter.on(customerChannels.Internal.EventCommit.CreatedEvent, function(event){
  customerService.createCustomer(event.payload.data);
});

internalEventEmitter.on(customerChannels.Internal.EventCommit.DeletedEvent, function(event){
  customerService.deleteCustomer(event.payload.data);
});

internalEventEmitter.on(customerChannels.Internal.EventCommit.CustomerBusinessAddedEvent, function(event){
  customerService.addBusiness(event.payload.data);
});

internalEventEmitter.on(customerChannels.Internal.EventCommit.CustomerBusinessRemovedEvent, function(event){
  customerService.removeBusiness(event.payload.data);
});

internalEventEmitter.on(customerChannels.Internal.Query.GetAllEvent, function(event){
  customerService.getAllCustomers(event.payload);
});

internalEventEmitter.on(customerChannels.Internal.Query.GetSingleEvent, function(event){
  customerService.getSingleCustomer(event.payload);
});