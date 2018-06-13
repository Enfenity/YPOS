'use strict';

var User = require('../models/User');
var logging = require('../utilities/Logging');
var userChannels = require('../../PubSubChannels').User;
var Message = require('../../libs/PubSub/Message');
var resourceNotFoundError = require('../../libs/error/ResourceNotFoundError');
var appUtil = require('../../libs/AppUtil');
var config = require('config');
var _ = require('lodash');
var internalEventEmitter = require('../../libs/InternalEventEmitter');

/**
 * The User Service module
 */
module.exports = {

  /**
   * Creates users
   *
   * @param {object} request - The request that was sent from the controller
   */
  createUser: async function createUser(request) {
    
    let userEntity = null;

    try {
      userEntity = new User(request);
    } catch (error) {
      return internalEventEmitter.emit(
        userChannels.Internal.EventCommit.CreatedCompletedEvent,
        {
          statusCode: 500,
          body: error
        }
      );
    }

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to save a new user document'
    );

    await userEntity.save();

    return internalEventEmitter.emit(
      userChannels.Internal.EventCommit.CreatedCompletedEvent,
      {
        statusCode: 201,
        body: userEntity
      }
    );    
  },

  /**
   * Returns all users
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  getAllUsers: async function getAllUsers(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to retrieve all users'
    );

    let users = [];

    let filter = {};

    if(request){

      if(request.firstName) {
        filter.firstName = request.firstName;
      }

      if(request.lastName) {
        filter.lastName = request.lastName;
      }

      if(request.email) {
        filter.email = request.email;
      }

    }

    try {
      users = await User.find(filter);
    } catch (err) {
      return internalEventEmitter.emit(
        userChannels.Internal.Query.GetAllCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    let statusCode = 200;

    // If the array is empty we need to return a 204 response.
    if (users.length === 0) {
      statusCode = 204;
    }

    return internalEventEmitter.emit(
      userChannels.Internal.Query.GetAllCompletedEvent,
      {
        statusCode: statusCode,
        header: {
          resultCount: users.length
        },
        body: users
      }
    );
  },

  /**
   * Returns a single user
   *
   * @param {object} request - The request that was sent from the controller
   */
  getSingleUser: async function getSingleUser(request) {

    logging.logAction(
      logging.logLevels.INFO,
      'Attempting to get a single user'
    );

    let user = null;

    try {
      user = await User.findById(request.id);

    } catch (err) {
      return internalEventEmitter.emit(
        userChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (appUtil.isNullOrUndefined(user)) {

      var notFoundError = new resourceNotFoundError(
        'Resource not found.',
        `No user with id [${request.id}] was found`
      );

      return internalEventEmitter.emit(
        userChannels.Internal.Query.GetSingleCompletedEvent,
        {
          statusCode: 404,
          body: notFoundError
        }
      );
    }

    return internalEventEmitter.emit(
      userChannels.Internal.Query.GetSingleCompletedEvent,
      {
        statusCode: 200,
        body: user
      }
    );
  },

  /**
   * Deletes a user
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  deleteUser: async function deleteUser(request) {

    let user = null;
    try {
      user = await User.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        userChannels.Internal.EventCommit.DeletedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(user)) {
      logging.logAction(
        logging.logLevels.INFO,
        'Attempting to remove a user'
      );

      try {
        await user.remove();
      } catch (err) {
        return internalEventEmitter.emit(
          userChannels.Internal.EventCommit.DeletedCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }
    }

    return internalEventEmitter.emit(
      userChannels.Internal.EventCommit.DeletedCompletedEvent,
      {
        statusCode: 200,
        body: user
      }
    );
  },

  /**
   * Updates a user
   *
   * @param {object} request - The request arguments passed in from the controller
   */
  updateUser: async function updateUser(request) {

    let user = null;

    try {
      user = await User.findById(request.id);
    } catch (err) {
      return internalEventEmitter.emit(
        userChannels.Internal.EventCommit.UpdatedCompletedEvent,
        {
          statusCode: 500,
          body: err
        }
      );
    }

    if (!appUtil.isNullOrUndefined(user)) {

      if (request.firstName) {
        user.firstName = request.firstName;
      }

      if (request.lastName) {
        user.lastName = request.lastName;
      }

      if (request.email) {
        user.email = request.email;
      }

      logging.logAction(
        logging.logLevels.INFO,
        `Attempting to update a user document with id [${user.id}]`
      );

      try {
        await user.save();
      } catch (err) {
        return internalEventEmitter.emit(
          userChannels.Internal.EventCommit.UpdatedCompletedEvent,
          {
            statusCode: 500,
            body: err
          }
        );
      }

      user.updatedAt = new Date();
    }

    return internalEventEmitter.emit(
      userChannels.Internal.EventCommit.UpdatedCompletedEvent,
      {
        statusCode: 200,
        body: user
      }
    );
  }
};