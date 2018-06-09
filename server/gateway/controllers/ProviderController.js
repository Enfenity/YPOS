'use strict';

var providerService = require('../services/ProviderService');

/**
 * The Company controller module
 *
 * @module Company
 */
module.exports = {

  /**
   * Calls the corresponding service layer method to create a company
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  createProvider: function createProvider(request, response, next) {
    providerService.createProvider(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to get all companies
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  getAllProviders: function getAllProviders(request, response, next) {
    providerService.getAllProviders(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to delete a company
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  deleteProvider: function deleteProvider(request, response, next) {
    providerService.deleteProvider(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to get a single company
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  getSingleProvider: function getSingleProvider(request, response, next) {
    providerService.getSingleProvider(request.swagger.params, response, next);
  }
};