'use strict';

const logging = require('../utilities/Logging');
const appUtil = require('../../libs/AppUtil');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventManager = require('./InternalEventManager');
const pubSubChannels = require('../../PubSubChannels');
const shoppingCartChannels = pubSubChannels.ShoppingCart;
const constants = require('../../Constants');

module.exports = {
  initialize: async function () {
    await _subscribeToQueryEvents();
    await _subscribeToEventCommitEvents();
  }
};

async function _subscribeToQueryEvents() {
  if (appUtil.isNullOrUndefined(shoppingCartChannels)) {
    throw new Error('[Shopping Cart channel] is not set');
  }

  try {
    await pubSub.subscribe(
      shoppingCartChannels.Query.Event,
      {
        subscriberType: constants.pubSub.recipients.shoppingCart
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
          `Message [${JSON.stringify(message)}] was received on channel [${shoppingCartChannels.Query.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalQueryEvents(message, shoppingCartChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${shoppingCartChannels.Query.Event}]`, e);
    throw e;
  }
}

async function _subscribeToEventCommitEvents() {
  if (appUtil.isNullOrUndefined(shoppingCartChannels)) {
    throw new Error('[Shopping Cart channel] is not set');
  }

  try {
    await pubSub.subscribe(
      shoppingCartChannels.EventCommit.Event,
      {
        subscriberType: constants.pubSub.recipients.shoppingCart
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
          `Message [${JSON.stringify(message)}] was received on channel [${shoppingCartChannels.EventCommit.Event}] for recipient [
            ${message.recipient}]`
        );
        
        internalEventManager.emitInternalEventCommitEvents(message, shoppingCartChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${shoppingCartChannels.EventCommit.Event}]`, e);
    throw e;
  }
}

