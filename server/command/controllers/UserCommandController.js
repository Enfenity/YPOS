'use strict';

var userCommandHandler = require('../handlers/UserCommandHandler');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var userChannels = require('../../PubSubChannels').User;

internalEventEmitter.on(userChannels.Internal.Command.CreateEvent, function(event){
  userCommandHandler.handle(event);
});

internalEventEmitter.on(userChannels.Internal.Command.UpdateEvent, function(event){
  userCommandHandler.handle(event);
});

internalEventEmitter.on(userChannels.Internal.Command.DeleteEvent, function(event){
  userCommandHandler.handle(event);
});
