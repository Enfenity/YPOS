'use strict';

var businessService = require('../services/BusinessService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var businessChannels = require('../../PubSubChannels').Business;

internalEventEmitter.on(businessChannels.Internal.EventCommit.UpdatedEvent, function(event){
  businessService.updateBusiness(event.payload.data);
});
