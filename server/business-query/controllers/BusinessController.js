'use strict';

var businessService = require('../services/BusinessService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var businessChannels = require('../../PubSubChannels').Business;

internalEventEmitter.on(businessChannels.Internal.EventCommit.CreatedEvent, function(event){
  businessService.createBusiness(event.payload.data);
});

internalEventEmitter.on(businessChannels.Internal.EventCommit.UpdatedEvent, function(event){
  businessService.updateBusiness(event.payload.data);
});

internalEventEmitter.on(businessChannels.Internal.EventCommit.DeletedEvent, function(event){
  businessService.deleteBusiness(event.payload.data);
});

internalEventEmitter.on(businessChannels.Internal.Query.GetAllEvent, function(event){
  businessService.getAllBusinesses(event.payload);
});

internalEventEmitter.on(businessChannels.Internal.Query.GetSingleEvent, function(event){
  businessService.getSingleBusiness(event.payload);
});