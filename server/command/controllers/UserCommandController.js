'use strict';

var userCommandHandler = require('../handlers/UserCommandHandler');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var userChannels = require('../../PubSubChannels').User;

internalEventEmitter.on(userChannels.Internal.Command.CreateEvent, async function(event){
  await userCommandHandler.handle(event);
});

internalEventEmitter.on(userChannels.Internal.Command.UpdateEvent, async function(event){
  await userCommandHandler.handle(event);
});

internalEventEmitter.on(userChannels.Internal.Command.DeleteEvent, async function(event){
  await userCommandHandler.handle(event);
});
