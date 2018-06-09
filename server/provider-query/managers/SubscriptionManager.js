'use strict';

const logging = require('../utilities/Logging');
const appUtil = require('../../libs/AppUtil');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventManager = require('./InternalEventManager');
const pubSubChannels = require('../../PubSubChannels');
const providerChannels = pubSubChannels.Provider;
const constants = require('../../Constants');

module.exports = {
  initialize: async function () {
    await _subscribeToQueryEvents();
    await _subscribeToEventCommitEvents();
  }
};

async function _subscribeToQueryEvents() {
  if (appUtil.isNullOrUndefined(providerChannels)) {
    throw new Error('[Provider channel] is not set');
  }

  try {
    await pubSub.subscribe(
      providerChannels.Query.Event,
      {
        subscriberType: constants.pubSub.recipients.provider
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
          `Message [${JSON.stringify(message)}] was received on channel [${providerChannels.Query.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalQueryEvents(message, providerChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${providerChannels.Query.Event}]`, e);
    throw e;
  }
}

async function _subscribeToEventCommitEvents() {
  if (appUtil.isNullOrUndefined(providerChannels)) {
    throw new Error('[Provider channel] is not set');
  }

  try {
    await pubSub.subscribe(
      providerChannels.EventCommit.Event,
      {
        subscriberType: constants.pubSub.recipients.provider
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
          `Message [${JSON.stringify(message)}] was received on channel [${providerChannels.EventCommit.Event}] for recipient [
            ${message.recipient}]`
        );
        
        internalEventManager.emitInternalEventCommitEvents(message, providerChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${providerChannels.EventCommit.Event}]`, e);
    throw e;
  }
}

