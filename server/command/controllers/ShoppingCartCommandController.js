'use strict';

var shoppingCartCommandHandler = require('../handlers/ShoppingCartCommandHandler');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var shoppingCartChannels = require('../../PubSubChannels').ShoppingCart;

internalEventEmitter.on(shoppingCartChannels.Internal.Command.CreateEvent, function(event){
  shoppingCartCommandHandler.handle(event);
});

internalEventEmitter.on(shoppingCartChannels.Internal.Command.DeleteEvent, function(event){
  shoppingCartCommandHandler.handle(event);
});

internalEventEmitter.on(shoppingCartChannels.Internal.Command.AddShoppingCartItemEvent, function(event){
  shoppingCartCommandHandler.handle(event);
});

internalEventEmitter.on(shoppingCartChannels.Internal.Command.RemoveShoppingCartItemEvent, function(event){
  shoppingCartCommandHandler.handle(event);
});
