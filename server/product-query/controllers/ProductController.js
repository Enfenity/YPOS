'use strict';

var productService = require('../services/ProductService');
var internalEventEmitter = require('../../libs/InternalEventEmitter');
var productChannels = require('../../PubSubChannels').Product;

internalEventEmitter.on(productChannels.Internal.EventCommit.CreatedEvent, function(event){
  productService.createProduct(event.payload.data);
});

internalEventEmitter.on(productChannels.Internal.EventCommit.UpdatedEvent, function(event){
  productService.updateProduct(event.payload.data);
});

internalEventEmitter.on(productChannels.Internal.EventCommit.DeletedEvent, function(event){
  productService.deleteProduct(event.payload.data);
});

internalEventEmitter.on(productChannels.Internal.Query.GetAllEvent, function(event){
  productService.getAllProducts(event.payload);
});

internalEventEmitter.on(productChannels.Internal.Query.GetSingleEvent, function(event){
  productService.getSingleProduct(event.payload);
});