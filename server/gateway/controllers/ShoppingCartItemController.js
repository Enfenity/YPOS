'use strict';

var shoppingCartItemService = require('../services/ShoppingCartItemService');

/**
 * The Shopping Cart Item controller module
 *
 * @module ShoppingCartItem
 */
module.exports = {

    /**
     * Calls the corresponding service layer method to confirm registration
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    addShoppingCartItem: function addShoppingCartItem(request, response, next) {
        shoppingCartItemService.addShoppingCartItem(request.swagger.params, response, next);
    },
    /**
     * Calls the corresponding service layer method to confirm registration
     *
     * @param {ClientRequest} request - The http request object
     * @param {IncomingMessage} response - The http response object
     * @param {function} next The callback used to pass control to the next action/middleware
     */
    deleteShoppingCartItem: function deleteShoppingCartItem(request, response, next) {
        shoppingCartItemService.deleteShoppingCartItem(request.swagger.params, response, next);
    }
};