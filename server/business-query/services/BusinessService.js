'use strict';

var Business = require('../models/Business');
var logging = require('../utilities/Logging');
var businessChannels = require('../../PubSubChannels').Business;
var Message = require('../../libs/PubSub/Message');
var resourceNotFoundError = require('../../libs/error/ResourceNotFoundError');
var appUtil = require('../../libs/AppUtil');
var config = require('config');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');

module.exports = {

  /**
   * Creates businesses
   *
   * @param {object} request - The request that was sent from the controller
   */
  createBusiness: async function createBusiness(request) {
    let businessEntity = null;

    try {
      businessEntity = new Business(request);
    } catch (error) {
      return internalEventEmitter.emit(
        businessChannels.Internal.EventCommit.CreatedCompletedEvent,
        {
          statusCode: 500,
          body: error
        }
      );
    }

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to save a new business document'
    );

    await businessEntity.save();

    return internalEventEmitter.emit(
      businessChannels.Internal.EventCommit.CreatedCompletedEvent,
      {
        statusCode: 201,
        body: businessEntity
      }
    );    
  },

  /**
   * Returns all businesses
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  getAllBusinesses: async function getAllBusinesses(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to retrieve all businesses'
    );

    let businesses = [];

    try {
      businesses = await Business.find({});
    } catch (err) {
      return internalEventEmitter.emit(
        businessChannels.Internal.Query.GetAllCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    let statusCode = 200;

    // If the array is empty we need to return a 204 response.
    if (businesses.length === 0) {
      statusCode = 204;
    }

    return internalEventEmitter.emit(
      businessChannels.Internal.Query.GetAllCompletedEvent,
      {
        statusCode: statusCode,
        header: {
          resultCount: businesses.length
        },
        body: businesses
      }
    );
  },

  /**
   * Returns a single business
   *
   * @param {object} request - The request that was sent from the controller
   */
  getSingleBusiness: async function getSingleBusiness(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to get a single business'
    );

    let business = null;

    try {
      business = await Business.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        businessChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (appUtil.isNullOrUndefined(business)) {

      var notFoundError = new resourceNotFoundError(
        'Resource not found.',
        `No business with id [${request.id}] was found`
      );

      return internalEventEmitter.emit(
        businessChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 404,
          body: notFoundError
        }
      );
    }

    return internalEventEmitter.emit(
      businessChannels.Internal.Query.GetSingleCompletedEvent,
      {
        statusCode: 200,
        body: business
      }
    );
  },

  /**
   * Deletes a business
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  deleteBusiness: async function deleteBusiness(request) {

    let business = null;
    try {
      business = await Business.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        businessChannels.Internal.EventCommit.DeletedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(business)) {
      logging.logAction(
        logging.logLevels.INFO,
        'Attempting to remove a business'
      );

      try {
        await business.remove();
      } catch (err) {
        return internalEventEmitter.emit(
          businessChannels.Internal.EventCommit.DeletedCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }
    }

    return internalEventEmitter.emit(
      businessChannels.Internal.EventCommit.DeletedCompletedEvent,
      {
        statusCode: 200,
        body: business
      }
    );
  },

  /**
   * Updates a business
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  updateBusiness: async function updateBusiness(request) {

    let business = null;

    try {
      business = await Business.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        businessChannels.Internal.EventCommit.UpdatedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(business)) {

      if (request.name) {
        business.name = request.name;
      }

      logging.logAction(
        logging.logLevels.INFO,
        `Attempting to update a business document with id [${business.id}]`
      );

      try {
        await business.save();
      } catch (err) {
        return internalEventEmitter.emit(
          businessChannels.Internal.UpdateCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }

      business.updatedAt = new Date();
    }

    return internalEventEmitter.emit(
      businessChannels.Internal.UpdateCompletedEvent,
      {
        statusCode: 200,
        body: business
      }
    );
  }
};