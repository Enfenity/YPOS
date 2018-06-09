'use strict';

var customerBusinessService = require('../services/CustomerBusinessService');

/**
 * The User Contact controller module
 *
 * @module User
 */
module.exports = {

  /**
   * Calls the corresponding service layer method to create a community
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  addCustomerBusiness: function addCustomerBusiness(request, response, next) {
    customerBusinessService.addCustomerBusiness(request.swagger.params, response, next);
  },

  /**
   * Calls the corresponding service layer method to get all communities
   *
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  removeCustomerBusiness: function removeCustomerBusiness(request, response, next) {
    customerBusinessService.removeCustomerBusiness(request.swagger.params, response, next);
  }

};