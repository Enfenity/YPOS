'use strict';

var providerService = require('../services/ProviderService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var providerChannels = require('../../PubSubChannels').Provider;

internalEventEmitter.on(providerChannels.Internal.EventCommit.CreatedEvent, function(event){
  providerService.createProvider(event.payload.data);
});

internalEventEmitter.on(providerChannels.Internal.EventCommit.DeletedEvent, function(event){
  providerService.deleteProvider(event.payload.data);
});

internalEventEmitter.on(providerChannels.Internal.EventCommit.ProviderBusinessAddedEvent, function(event){
  providerService.addBusiness(event.payload.data);
});

internalEventEmitter.on(providerChannels.Internal.EventCommit.ProviderBusinessRemovedEvent, function(event){
  providerService.removeBusiness(event.payload.data);
});

internalEventEmitter.on(providerChannels.Internal.Query.GetAllEvent, function(event){
  providerService.getAllProviders(event.payload);
});

internalEventEmitter.on(providerChannels.Internal.Query.GetSingleEvent, function(event){
  providerService.getSingleProvider(event.payload);
});