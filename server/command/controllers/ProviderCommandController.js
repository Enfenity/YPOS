'use strict';

var providerCommandHandler = require('../handlers/ProviderCommandHandler');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var providerChannels = require('../../PubSubChannels').Provider;

internalEventEmitter.on(providerChannels.Internal.Command.CreateEvent, function(event){
  providerCommandHandler.handle(event);
});

internalEventEmitter.on(providerChannels.Internal.Command.DeleteEvent, function(event){
  providerCommandHandler.handle(event);
});

internalEventEmitter.on(providerChannels.Internal.Command.AddProviderBusinessEvent, function(event){
  providerCommandHandler.handle(event);
});

internalEventEmitter.on(providerChannels.Internal.Command.RemoveProviderBusinessEvent, function(event){
  providerCommandHandler.handle(event);
});
