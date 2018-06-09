'use strict';

var productCommandHandler = require('../handlers/ProductCommandHandler');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var productChannels = require('../../PubSubChannels').Product;

internalEventEmitter.on(productChannels.Internal.Command.CreateEvent, function(event){
  productCommandHandler.handle(event);
});

internalEventEmitter.on(productChannels.Internal.Command.UpdateEvent, function(event){
  productCommandHandler.handle(event);
});

internalEventEmitter.on(productChannels.Internal.Command.DeleteEvent, function(event){
  productCommandHandler.handle(event);
});
