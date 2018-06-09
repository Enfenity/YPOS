/**
 * Created by kevinfeng on 2017/08/26.
 */

'use strict';

var shoppingCartService = require('../services/ShoppingCartService');

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
    createShoppingCart: function createShoppingCart(request, response, next) {
        shoppingCartService.createShoppingCart(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to get all users
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    getAllShoppingCarts: function getAllShoppingCarts(request, response, next) {
        shoppingCartService.getAllShoppingCarts(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to delete a user
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    deleteShoppingCart: function deleteShoppingCart(request, response, next) {
        shoppingCartService.deleteShoppingCart(request.swagger.params, response, next);
    },

    /**
     * Calls the corresponding service layer method to get a single user
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    getSingleShoppingCart: function getSingleShoppingCart(request, response, next) {
        shoppingCartService.getSingleShoppingCart(request.swagger.params, response, next);
    }
};