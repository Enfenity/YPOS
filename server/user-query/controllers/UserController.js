'use strict';

var userService = require('../services/UserService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var userChannels = require('../../PubSubChannels').User;

internalEventEmitter.on(userChannels.Internal.EventCommit.CreatedEvent, function(event){
  userService.createUser(event.payload.data);
});

internalEventEmitter.on(userChannels.Internal.EventCommit.UpdatedEvent, function(event){
  userService.updateUser(event.payload.data);
});

internalEventEmitter.on(userChannels.Internal.EventCommit.DeletedEvent, function(event){
  userService.deleteUser(event.payload.data);
});

internalEventEmitter.on(userChannels.Internal.Query.GetAllEvent, function(event){
  userService.getAllUsers(event.payload);
});

internalEventEmitter.on(userChannels.Internal.Query.GetSingleEvent, function(event){
  userService.getSingleUser(event.payload);
});