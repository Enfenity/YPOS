'use strict';

var businessCommandHandler = require('../handlers/BusinessCommandHandler');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var businessChannels = require('../../PubSubChannels').Business;

internalEventEmitter.on(businessChannels.Internal.Command.CreateEvent, function(event){
  businessCommandHandler.handle(event);
});

internalEventEmitter.on(businessChannels.Internal.Command.UpdateEvent, function(event){
  businessCommandHandler.handle(event);
});

internalEventEmitter.on(businessChannels.Internal.Command.DeleteEvent, function(event){
  businessCommandHandler.handle(event);
});
