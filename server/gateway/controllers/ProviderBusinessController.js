/**
 * Created by kevinfeng on 2017/08/26.
 */

'use strict';

var providerBusinessService = require('../services/ProviderBusinessService');

/**
 * The Registration controller module
 *
 * @module Registration
 */
module.exports = {

    /**
     * Calls the corresponding service layer method to create a community
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    addProviderBusiness: function addProviderBusiness(request, response, next) {
        providerBusinessService.addProviderBusiness(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to get all communities
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    removeProviderBusiness: function removeProviderBusiness(request, response, next) {
        providerBusinessService.removeProviderBusiness(request.swagger.params, response, next);
    }
};