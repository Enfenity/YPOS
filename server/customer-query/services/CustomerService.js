'use strict';

var Customer = require('../models/Customer');
var logging = require('../utilities/Logging');
var customerChannels = require('../../PubSubChannels').Customer;
var Message = require('../../libs/PubSub/Message');
var resourceNotFoundError = require('../../libs/error/ResourceNotFoundError');
var appUtil = require('../../libs/AppUtil');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');

module.exports = {

  /**
   * Creates customer
   *
   * @param {object} request - The request that was sent from the controller
   */
  createCustomer: async function createCustomer(request) {
    let customerEntity = null;

    try {
      customerEntity = new Customer(request);
    } catch (error) {
      return internalEventEmitter.emit(
        customerChannels.Internal.EventCommit.CreatedCompletedEvent,
        {
          statusCode: 500,
          body: error
        }
      );
    }

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to save a new customer document'
    );

    await customerEntity.save();

    return internalEventEmitter.emit(
      customerChannels.Internal.EventCommit.CreatedCompletedEvent,
      {
        statusCode: 201,
        body: customerEntity
      }
    );    
  },

  /**
   * Returns all customers
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  getAllCustomers: async function getAllCustomers(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to retrieve all customers'
    );

    let customers = [];

    try {
      customers = await Customer.find({});
    } catch (err) {
      return internalEventEmitter.emit(
        customerChannels.Internal.Query.GetAllCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    let statusCode = 200;

    // If the array is empty we need to return a 204 response.
    if (customers.length === 0) {
      statusCode = 204;
    }

    return internalEventEmitter.emit(
      customerChannels.Internal.Query.GetAllCompletedEvent,
      {
        statusCode: statusCode,
        header: {
          resultCount: customers.length
        },
        body: customers
      }
    );
  },

  /**
   * Returns a single customer
   *
   * @param {object} request - The request that was sent from the controller
   */
  getSingleCustomer: async function getSingleCustomer(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to get a single customer'
    );

    let customer = null;

    try {
      customer = await Customer.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        customerChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (appUtil.isNullOrUndefined(customer)) {

      var notFoundError = new resourceNotFoundError(
        'Resource not found.',
        `No customer with id [${request.id}] was found`
      );

      return internalEventEmitter.emit(
        customerChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 404,
          body: notFoundError
        }
      );
    }

    return internalEventEmitter.emit(
      customerChannels.Internal.Query.GetSingleCompletedEvent,
      {
        statusCode: 200,
        body: customer
      }
    );
  },

  /**
   * Deletes a customer
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  deleteCustomer: async function deleteCustomer(request) {

    let customer = null;
    try {
      customer = await Customer.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        customerChannels.Internal.EventCommit.DeletedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(customer)) {
      logging.logAction(
        logging.logLevels.INFO,
        'Attempting to remove a customer'
      );

      try {
        await customer.remove();
      } catch (err) {
        return internalEventEmitter.emit(
          customerChannels.Internal.EventCommit.DeletedCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }
    }

    return internalEventEmitter.emit(
      customerChannels.Internal.EventCommit.DeletedCompletedEvent,
      {
        statusCode: 200,
        body: customer
      }
    );
  },
  addBusiness: async function addBusiness(request) {

    let customer = null;

    try {
      customer = await Customer.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        customerChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(customer)) {
      if(customer.businesses && customer.businesses.length > 0) {
        customer.businesses.push(request.business);
      } else {
        customer.businesses = [request.business];
      }

      await customer.save();
    }

    return internalEventEmitter.emit(
      customerChannels.Internal.EventCommit.CustomerBusinessAddedCompletedEvent,
      {
        statusCode: 200,
        body: customer
      }
    );
  },
  removeBusiness: async function deleteCustomer(request) {
    let customer = null;

    try {
      customer = await Customer.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        customerChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(customer)) {
      if(customer.businesses && customer.businesses.length > 0) {

        var matched = _.find(customer.businesses, (business) => {
          return business._id == request.businessId;
        });

        if(matched && customer.businesses.indexOf(matched) > -1) {
          customer.businesses.splice(customer.businesses.indexOf(matched), 1);
        }

      }

      await customer.save();
    }
    return internalEventEmitter.emit(
      customerChannels.Internal.EventCommit.CustomerBusinessRemovedCompletedEvent,
      {
        statusCode: 201,
        body: customer
      }
    );
  }
};