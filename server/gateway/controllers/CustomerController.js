'use strict';

var customerService = require('../services/CustomerService');

/**
 * The community controller module
 *
 * @module community
 */
module.exports = {

  /**
   * Calls the corresponding service layer method to create a community
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  createCustomer: function createCustomer(request, response, next) {
    customerService.createCustomer(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to get all communities
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  getAllCustomers: function getAllCustomers(request, response, next) {
    customerService.getAllCustomers(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to delete a community
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  deleteCustomer: function deleteCustomer(request, response, next) {
    customerService.deleteCustomer(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to get a single community
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  getSingleCustomer: function getSingleCustomer(request, response, next) {
    customerService.getSingleCustomer(request.swagger.params, response, next);
  }
};