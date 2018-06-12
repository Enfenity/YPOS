'use strict';

var ShoppingCart = require('../models/ShoppingCart');
var logging = require('../utilities/Logging');
var cartChannels = require('../../PubSubChannels').ShoppingCart;
var Message = require('../../libs/PubSub/Message');
var resourceNotFoundError = require('../../libs/error/ResourceNotFoundError');
var appUtil = require('../../libs/AppUtil');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');

module.exports = {

  /**
   * Creates a shopping cart
   *
   * @param {object} request - The request that was sent from the controller
   */
  createCart: async function createProvider(request) {
    let entity = null;

    try {
      entity = new ShoppingCart(request);
    } catch (error) {
      return internalEventEmitter.emit(
        cartChannels.Internal.EventCommit.CreatedCompletedEvent,
        {
          statusCode: 500,
          body: error
        }
      );
    }

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to save a new shopping cart document'
    );

    await entity.save();

    return internalEventEmitter.emit(
      cartChannels.Internal.EventCommit.CreatedCompletedEvent,
      {
        statusCode: 201,
        body: entity
      }
    );    
  },

  /**
   * Returns all shopping carts
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  getAllCarts: async function getAllProviders(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to retrieve all shopping carts'
    );

    let carts = [];

    try {
      carts = await ShoppingCart.find({});
    } catch (err) {
      return internalEventEmitter.emit(
        cartChannels.Internal.Query.GetAllCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    let statusCode = 200;

    // If the array is empty we need to return a 204 response.
    if (carts.length === 0) {
      statusCode = 204;
    }

    return internalEventEmitter.emit(
      cartChannels.Internal.Query.GetAllCompletedEvent,
      {
        statusCode: statusCode,
        header: {
          resultCount: carts.length
        },
        body: carts
      }
    );
  },

  /**
   * Returns a single cart
   *
   * @param {object} request - The request that was sent from the controller
   */
  getSingleCart: async function getSingleProvider(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to get a single shopping cart'
    );

    let cart = null;

    try {
      cart = await ShoppingCart.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        cartChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (appUtil.isNullOrUndefined(cart)) {

      var notFoundError = new resourceNotFoundError(
        'Resource not found.',
        `No shopping cart with id [${request.id}] was found`
      );

      return internalEventEmitter.emit(
        cartChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 404,
          body: notFoundError
        }
      );
    }

    return internalEventEmitter.emit(
      cartChannels.Internal.Query.GetSingleCompletedEvent,
      {
        statusCode: 200,
        body: cart
      }
    );
  },

  /**
   * Deletes a shopping cart
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  deleteCart: async function deleteProvider(request) {

    let cart = null;
    try {
      cart = await ShoppingCart.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        cartChannels.Internal.EventCommit.DeletedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(cart)) {
      logging.logAction(
        logging.logLevels.INFO,
        'Attempting to remove a shopping cart'
      );

      try {
        await cart.remove();
      } catch (err) {
        return internalEventEmitter.emit(
          cartChannels.Internal.EventCommit.DeletedCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }
    }

    return internalEventEmitter.emit(
      cartChannels.Internal.EventCommit.DeletedCompletedEvent,
      {
        statusCode: 200,
        body: cart
      }
    );
  },
  addItem: async function addItem(request) {

    let cart = null;

    try {
      cart = await ShoppingCart.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        cartChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(cart)) {
      if(cart.items && cart.items.length > 0) {
        _.forEach(request.items, item => {
          cart.items.push(item);
        });
        
      } else {
        cart.items = request.items;
      }

      await cart.save();
    }

    return internalEventEmitter.emit(
      cartChannels.Internal.EventCommit.ShoppingCartItemAddedCompletedEvent,
      {
        statusCode: 200,
        body: cart
      }
    );
  },
  removeItem: async function removeItem(request) {
    let cart = null;

    try {
      cart = await ShoppingCart.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        cartChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(cart)) {
      if(cart.items && cart.items.length > 0) {

        var matched = _.find(cart.items, (item) => {
          return item._id == request.itemId;
        });

        if(matched && cart.items.indexOf(matched) > -1) {
          cart.items.splice(cart.items.indexOf(matched), 1);
        }

      }

      await cart.save();
    }
    return internalEventEmitter.emit(
      cartChannels.Internal.EventCommit.ShoppingCartItemRemovedCompletedEvent,
      {
        statusCode: 201,
        body: cart
      }
    );
  }
};