'use strict';

var Provider = require('../models/Provider');
var logging = require('../utilities/Logging');
var providerChannels = require('../../PubSubChannels').Provider;
var Message = require('../../libs/PubSub/Message');
var resourceNotFoundError = require('../../libs/error/ResourceNotFoundError');
var appUtil = require('../../libs/AppUtil');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');

module.exports = {

  /**
   * Creates provider
   *
   * @param {object} request - The request that was sent from the controller
   */
  createProvider: async function createProvider(request) {
    let entity = null;

    try {
      entity = new Provider(request);
    } catch (error) {
      return internalEventEmitter.emit(
        providerChannels.Internal.EventCommit.CreatedCompletedEvent,
        {
          statusCode: 500,
          body: error
        }
      );
    }

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to save a new provider document'
    );

    await entity.save();

    return internalEventEmitter.emit(
      providerChannels.Internal.EventCommit.CreatedCompletedEvent,
      {
        statusCode: 201,
        body: entity
      }
    );    
  },

  /**
   * Returns all providers
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  getAllProviders: async function getAllProviders(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to retrieve all providers'
    );

    let providers = [];

    try {
      providers = await Provider.find({});
    } catch (err) {
      return internalEventEmitter.emit(
        providerChannels.Internal.Query.GetAllCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    let statusCode = 200;

    // If the array is empty we need to return a 204 response.
    if (providers.length === 0) {
      statusCode = 204;
    }

    return internalEventEmitter.emit(
      providerChannels.Internal.Query.GetAllCompletedEvent,
      {
        statusCode: statusCode,
        header: {
          resultCount: providers.length
        },
        body: providers
      }
    );
  },

  /**
   * Returns a single provider
   *
   * @param {object} request - The request that was sent from the controller
   */
  getSingleProvider: async function getSingleProvider(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to get a single provider'
    );

    let provider = null;

    try {
      provider = await Provider.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        providerChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (appUtil.isNullOrUndefined(provider)) {

      var notFoundError = new resourceNotFoundError(
        'Resource not found.',
        `No provider with id [${request.id}] was found`
      );

      return internalEventEmitter.emit(
        providerChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 404,
          body: notFoundError
        }
      );
    }

    return internalEventEmitter.emit(
      providerChannels.Internal.Query.GetSingleCompletedEvent,
      {
        statusCode: 200,
        body: provider
      }
    );
  },

  /**
   * Deletes a provider
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  deleteProvider: async function deleteProvider(request) {

    let provider = null;
    try {
      provider = await Provider.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        providerChannels.Internal.EventCommit.DeletedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(provider)) {
      logging.logAction(
        logging.logLevels.INFO,
        'Attempting to remove a provider'
      );

      try {
        await provider.remove();
      } catch (err) {
        return internalEventEmitter.emit(
          providerChannels.Internal.EventCommit.DeletedCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }
    }

    return internalEventEmitter.emit(
      providerChannels.Internal.EventCommit.DeletedCompletedEvent,
      {
        statusCode: 200,
        body: provider
      }
    );
  },
  addBusiness: async function addBusiness(request) {

    let provider = null;

    try {
      provider = await Provider.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        providerChannels.Internal.EventCommit.ProviderBusinessAddedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(provider)) {
      if(provider.businesses && provider.businesses.length > 0) {
        provider.businesses.push(request.business);
      } else {
        provider.businesses = [request.business];
      }

      await provider.save();
    }

    return internalEventEmitter.emit(
      providerChannels.Internal.EventCommit.ProviderBusinessAddedCompletedEvent,
      {
        statusCode: 200,
        body: provider
      }
    );
  },
  removeBusiness: async function deleteCustomer(request) {
    let provider = null;

    try {
      provider = await Provider.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        providerChannels.Internal.EventCommit.ProviderBusinessRemovedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(provider)) {
      if(provider.businesses && provider.businesses.length > 0) {

        var matched = _.find(provider.businesses, (business) => {
          return business._id == request.businessId;
        });

        if(matched && provider.businesses.indexOf(matched) > -1) {
          provider.businesses.splice(provider.businesses.indexOf(matched), 1);
        }

      }

      await provider.save();
    }
    return internalEventEmitter.emit(
      providerChannels.Internal.EventCommit.ProviderBusinessRemovedCompletedEvent,
      {
        statusCode: 201,
        body: provider
      }
    );
  }
};