'use strict';

var shoppingCartService = require('../services/ShoppingCartService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var shoppingCartChannels = require('../../PubSubChannels').ShoppingCart;

internalEventEmitter.on(shoppingCartChannels.Internal.EventCommit.CreatedEvent, function(event){
  shoppingCartService.createCart(event.payload.data);
});

internalEventEmitter.on(shoppingCartChannels.Internal.EventCommit.DeletedEvent, function(event){
  shoppingCartService.deleteCart(event.payload.data);
});

internalEventEmitter.on(shoppingCartChannels.Internal.EventCommit.ShoppingCartItemAddedEvent, function(event){
  shoppingCartService.addItem(event.payload.data);
});

internalEventEmitter.on(shoppingCartChannels.Internal.EventCommit.ShoppingCartItemRemovedEvent, function(event){
  shoppingCartService.removeItem(event.payload.data);
});

internalEventEmitter.on(shoppingCartChannels.Internal.Query.GetAllEvent, function(event){
  shoppingCartService.getAllCarts(event.payload);
});

internalEventEmitter.on(shoppingCartChannels.Internal.Query.GetSingleEvent, function(event){
  shoppingCartService.getSingleCart(event.payload);
});