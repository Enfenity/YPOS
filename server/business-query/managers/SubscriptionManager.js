'use strict';

const logging = require('../utilities/Logging');
const appUtil = require('../../libs/AppUtil');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventManager = require('./InternalEventManager');
const pubSubChannels = require('../../PubSubChannels');
const businessChannels = pubSubChannels.Business;
const constants = require('../../Constants');

module.exports = {
  initialize: async function () {
    await _subscribeToQueryEvents();
    await _subscribeToEventCommitEvents();
  }
};

async function _subscribeToQueryEvents() {
  if (appUtil.isNullOrUndefined(businessChannels)) {
    throw new Error('[Business channel] is not set');
  }

  try {
    await pubSub.subscribe(
      businessChannels.Query.Event,
      {
        subscriberType: constants.pubSub.recipients.business
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
          `Message [${JSON.stringify(message)}] was received on channel [${businessChannels.Query.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalQueryEvents(message, businessChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${businessChannels.Query.Event}]`, e);
    throw e;
  }
}

async function _subscribeToEventCommitEvents() {
  if (appUtil.isNullOrUndefined(businessChannels)) {
    throw new Error('[Business channel] is not set');
  }

  try {
    await pubSub.subscribe(
      businessChannels.EventCommit.Event,
      {
        subscriberType: constants.pubSub.recipients.business
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
          `Message [${JSON.stringify(message)}] was received on channel [${businessChannels.EventCommit.Event}] for recipient [
            ${message.recipient}]`
        );
        
        internalEventManager.emitInternalEventCommitEvents(message, businessChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${businessChannels.EventCommit.Event}]`, e);
    throw e;
  }
}

