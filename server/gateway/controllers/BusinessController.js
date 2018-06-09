'use strict';

var businessService = require('../services/BusinessService');

/**
 * The Registration controller module
 *
 * @module Registration
 */
module.exports = {

    /**
     * Calls the corresponding service layer method to create a user
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    createBusiness: function createBusiness(request, response, next) {
        businessService.createBusiness(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to get all users
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    getAllBusinesses: function getAllBusinesses(request, response, next) {
        businessService.getAllBusinesses(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to delete a user
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    deleteBusiness: function deleteBusiness(request, response, next) {
        businessService.deleteBusiness(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to get a single user
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    getSingleBusiness: function getSingleBusiness(request, response, next) {
        businessService.getSingleBusiness(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to update a user
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    updateBusiness: function updateBusiness(request, response, next) {
        businessService.updateBusiness(request.swagger.params, response, next);
    }
};