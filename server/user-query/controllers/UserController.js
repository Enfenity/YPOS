'use strict';

var userService = require('../services/UserService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var userChannels = require('../../PubSubChannels').User;

internalEventEmitter.on(userChannels.Internal.EventCommit.CreatedEvent, async function(event){
  await userService.createUser(event.payload.data);
});

internalEventEmitter.on(userChannels.Internal.EventCommit.UpdatedEvent, async function(event){
  await userService.updateUser(event.payload.data);
});

internalEventEmitter.on(userChannels.Internal.EventCommit.DeletedEvent, async function(event){
  await userService.deleteUser(event.payload.data);
});

internalEventEmitter.on(userChannels.Internal.Query.GetAllEvent, function(event){
  userService.getAllUsers(event.payload);
});

internalEventEmitter.on(userChannels.Internal.Query.GetSingleEvent, function(event){
  userService.getSingleUser(event.payload);
});