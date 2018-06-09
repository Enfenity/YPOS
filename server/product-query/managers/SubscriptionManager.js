'use strict';

const logging = require('../utilities/Logging');
const appUtil = require('../../libs/AppUtil');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventManager = require('./InternalEventManager');
const pubSubChannels = require('../../PubSubChannels');
const productChannels = pubSubChannels.Product;
const constants = require('../../Constants');

module.exports = {
  initialize: async function () {
    await _subscribeToUserQueryEvents();
    await _subscribeToUserEventCommitEvents();
  }
};

async function _subscribeToUserQueryEvents() {
  if (appUtil.isNullOrUndefined(productChannels)) {
    throw new Error('[Product channel] is not set');
  }

  try {
    await pubSub.subscribe(
      productChannels.Query.Event,
      {
        subscriberType: constants.pubSub.recipients.product
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
          `Message [${JSON.stringify(message)}] was received on channel [${productChannels.Query.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalQueryEvents(message, productChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${productChannels.Query.Event}]`, e);
    throw e;
  }
}
async function _subscribeToUserEventCommitEvents() {
  if (appUtil.isNullOrUndefined(productChannels)) {
    throw new Error('[Product channel] is not set');
  }

  try {
    await pubSub.subscribe(
      productChannels.EventCommit.Event,
      {
        subscriberType: constants.pubSub.recipients.product
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
          `Message [${JSON.stringify(message)}] was received on channel [${productChannels.EventCommit.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalEventCommitEvents(message, productChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${productChannels.EventCommit.Event}]`, e);
    throw e;
  }
}

