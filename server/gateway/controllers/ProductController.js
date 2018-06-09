'use strict';

var productService = require('../services/ProductService');

/**
 * The product controller module
 *
 * @module product
 */
module.exports = {

  /**
   * Calls the corresponding service layer method to create a chat
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  createProduct: function createProduct(request, response, next) {
    productService.createProduct(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to get all chats
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  getAllProducts: function getAllProducts(request, response, next) {
    productService.getAllProducts(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to delete a chat
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  deleteProduct: function deleteProduct(request, response, next) {
    productService.deleteProduct(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to get a single chat
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  getSingleProduct: function getSingleProduct(request, response, next) {
    productService.getSingleProduct(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to update a chat
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  updateProduct: function updateProduct(request, response, next) {
    productService.updateProduct(request.swagger.params, response, next);
  }
};