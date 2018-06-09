'use strict';

const logging = require('../utilities/Logging');
const appUtil = require('../../libs/AppUtil');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventManager = require('./InternalEventManager');
const pubSubChannels = require('../../PubSubChannels');
const customerChannels = pubSubChannels.Customer;
const constants = require('../../Constants');

module.exports = {
  initialize: async function () {
    await _subscribeToQueryEvents();
    await _subscribeToEventCommitEvents();
  }
};

async function _subscribeToQueryEvents() {
  if (appUtil.isNullOrUndefined(customerChannels)) {
    throw new Error('[Customer channel] is not set');
  }

  try {
    await pubSub.subscribe(
      customerChannels.Query.Event,
      {
        subscriberType: constants.pubSub.recipients.customer
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
          `Message [${JSON.stringify(message)}] was received on channel [${customerChannels.Query.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalQueryEvents(message, customerChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${customerChannels.Query.Event}]`, e);
    throw e;
  }
}

async function _subscribeToEventCommitEvents() {
  if (appUtil.isNullOrUndefined(customerChannels)) {
    throw new Error('[Customer channel] is not set');
  }

  try {
    await pubSub.subscribe(
      customerChannels.EventCommit.Event,
      {
        subscriberType: constants.pubSub.recipients.customer
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
          `Message [${JSON.stringify(message)}] was received on channel [${customerChannels.EventCommit.Event}] for recipient [
            ${message.recipient}]`
        );
        
        internalEventManager.emitInternalEventCommitEvents(message, customerChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${customerChannels.EventCommit.Event}]`, e);
    throw e;
  }
}

