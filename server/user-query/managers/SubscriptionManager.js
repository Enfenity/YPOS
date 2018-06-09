'use strict';

const logging = require('../utilities/Logging');
const appUtil = require('../../libs/AppUtil');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventManager = require('./InternalEventManager');
const pubSubChannels = require('../../PubSubChannels');
const userChannels = pubSubChannels.User;
const constants = require('../../Constants');

module.exports = {
  initialize: async function () {
    await _subscribeToUserQueryEvents();
    await _subscribeToUserEventCommitEvents();
  }
};

async function _subscribeToUserQueryEvents() {
  if (appUtil.isNullOrUndefined(userChannels)) {
    throw new Error('[User channel] is not set');
  }

  try {
    await pubSub.subscribe(
      userChannels.Query.Event,
      {
        subscriberType: constants.pubSub.recipients.user
      },
      (err, message) => {
        
        if (err) {
          return;
        }

        if(!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${userChannels.Query.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalQueryEvents(message, userChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${userChannels.Query.Event}]`, e);
    throw e;
  }
}
async function _subscribeToUserEventCommitEvents() {
  if (appUtil.isNullOrUndefined(userChannels)) {
    throw new Error('[User channel] is not set');
  }

  try {
    await pubSub.subscribe(
      userChannels.EventCommit.Event,
      {
        subscriberType: constants.pubSub.recipients.user
      },
      (err, message) => {

        if (err) {
          return;
        }

        if(!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${userChannels.EventCommit.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalEventCommitEvents(message, userChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${userChannels.EventCommit.Event}]`, e);
    throw e;
  }
}

