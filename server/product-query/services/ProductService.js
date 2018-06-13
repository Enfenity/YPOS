'use strict';

var Product = require('../models/Product');
var logging = require('../utilities/Logging');
var productChannels = require('../../PubSubChannels').Product;
var Message = require('../../libs/PubSub/Message');
var resourceNotFoundError = require('../../libs/error/ResourceNotFoundError');
var appUtil = require('../../libs/AppUtil');
var config = require('config');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');

module.exports = {

  /**
   * Creates products
   *
   * @param {object} request - The request that was sent from the controller
   */
  createProduct: async function createUser(request) {
    
    let entity = null;

    try {
      entity = new Product(request);
      entity.businessId =  request.business.id;
    } catch (error) {
      return internalEventEmitter.emit(
        productChannels.Internal.EventCommit.CreatedCompletedEvent,
        {
          statusCode: 500,
          body: error
        }
      );
    }

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to save a new product document'
    );

    await entity.save();

    return internalEventEmitter.emit(
      productChannels.Internal.EventCommit.CreatedCompletedEvent,
      {
        statusCode: 201,
        body: entity
      }
    );    
  },

  /**
   * Returns all products
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  getAllProducts: async function getAllProducts(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to retrieve all products'
    );

    let products = [];

    try {
      products = await Product.find({});
    } catch (err) {
      return internalEventEmitter.emit(
        productChannels.Internal.Query.GetAllCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    let statusCode = 200;

    // If the array is empty we need to return a 204 response.
    if (products.length === 0) {
      statusCode = 204;
    }

    return internalEventEmitter.emit(
      productChannels.Internal.Query.GetAllCompletedEvent,
      {
        statusCode: statusCode,
        header: {
          resultCount: products.length
        },
        body: products
      }
    );
  },

  /**
   * Returns a single product
   *
   * @param {object} request - The request that was sent from the controller
   */
  getSingleProduct: async function getSingleProduct(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to get a single product'
    );

    let product = null;

    try {
      product = await Product.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        productChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (appUtil.isNullOrUndefined(product)) {

      var notFoundError = new resourceNotFoundError(
        'Resource not found.',
        `No product with id [${request.id}] was found`
      );

      return internalEventEmitter.emit(
        productChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 404,
          body: notFoundError
        }
      );
    }

    return internalEventEmitter.emit(
      productChannels.Internal.Query.GetSingleCompletedEvent,
      {
        statusCode: 200,
        body: product
      }
    );
  },

  /**
   * Deletes a product
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  deleteProduct: async function deleteProduct(request) {

    let product = null;
    try {
      product = await Product.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        productChannels.Internal.EventCommit.DeletedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(product)) {
      logging.logAction(
        logging.logLevels.INFO,
        'Attempting to remove a product'
      );

      try {
        await product.remove();
      } catch (err) {
        return internalEventEmitter.emit(
          productChannels.Internal.EventCommit.DeletedCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }
    }

    return internalEventEmitter.emit(
      productChannels.Internal.EventCommit.DeletedCompletedEvent,
      {
        statusCode: 200,
        body: product
      }
    );
  },

  /**
   * Updates a product
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  updateProduct: async function updateProduct(request) {

    let product = null;

    try {
      product = await Product.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        productChannels.Internal.EventCommit.UpdatedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(product)) {

      if (request.business) {
        product.business = request.business;
      }

      if (request.name) {
        product.name = request.name;
      }

      if (request.description) {
        product.description = request.description;
      }

      if (request.paymentRequirement) {
        product.paymentRequirement = request.paymentRequirement;
      }

      if (request.currency) {
        product.currency = request.currency;
      }

      if (!appUtil.isNullOrUndefined(request.price)) {
        product.price = request.price;
      }

      if (!appUtil.isNullOrUndefined(request.tax)) {
        product.tax = request.tax;
      }

      if (!appUtil.isNullOrUndefined(request.qtyInStock)) {
        product.qtyInStock = request.qtyInStock;
      }

      if (!appUtil.isNullOrUndefined(request.qtyInStock)) {
        product.qtyInStock = request.qtyInStock;
      }

      logging.logAction(
        logging.logLevels.INFO,
        `Attempting to update a product document with id [${product.id}]`
      );

      try {
        await product.save();
      } catch (err) {
        return internalEventEmitter.emit(
          productChannels.Internal.UpdateCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }

      product.updatedAt = new Date();
    }

    return internalEventEmitter.emit(
      productChannels.Internal.UpdateCompletedEvent,
      {
        statusCode: 200,
        body: product
      }
    );
  }
};