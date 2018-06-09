'use strict';

const logging = require('../utilities/Logging');
const appUtil = require('../../libs/AppUtil');
const pubSub = require('../../libs/PubSub/PubSubAdapter');
const internalEventManager = require('./InternalEventManager');
const pubSubChannels = require('../../PubSubChannels');
const userChannels = pubSubChannels.User;
const businessChannels = pubSubChannels.Business;
const customerChannels = pubSubChannels.Customer;
const providerChannels = pubSubChannels.Provider;
const productChannels = pubSubChannels.Product;
const cartChannels = pubSubChannels.ShoppingCart;
const constants = require('../../Constants');

module.exports = {
  initialize: async function () {
    await _subscribeToUserCommandEvents();
    await _subscribeToBusinessCommandEvents();
    await _subscribeToCustomerCommandEvents();
    await _subscribeToProviderCommandEvents();
    await _subscribeToProductCommandEvents();
    await _subscribeToShoppingCartCommandEvents();
  }
};

async function _subscribeToUserCommandEvents() {
  if (appUtil.isNullOrUndefined(userChannels)) {
    throw new Error('[User channel] is not set');
  }

  try {
    await pubSub.subscribe(
      userChannels.Command.Event,
      {
        subscriberType: constants.pubSub.recipients.command
      },
      (err, message) => {
        if (err) {
          return;
        }

        if (!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${userChannels.Command.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalUserCommandEvents(message, userChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${userChannels.Command.Event}]`, e);
    throw e;
  }
}

async function _subscribeToShoppingCartCommandEvents() {
  if (appUtil.isNullOrUndefined(cartChannels)) {
    throw new Error('[Shopping Cart channel] is not set');
  }

  try {
    await pubSub.subscribe(
      cartChannels.Command.Event,
      {
        subscriberType: constants.pubSub.recipients.command
      },
      (err, message) => {
        if (err) {
          return;
        }

        if (!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${cartChannels.Command.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalShoppingCartCommandEvents(message, cartChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${cartChannels.Command.Event}]`, e);
    throw e;
  }
}

async function _subscribeToProductCommandEvents() {
  if (appUtil.isNullOrUndefined(productChannels)) {
    throw new Error('[Product channel] is not set');
  }

  try {
    await pubSub.subscribe(
      productChannels.Command.Event,
      {
        subscriberType: constants.pubSub.recipients.command
      },
      (err, message) => {
        if (err) {
          return;
        }

        if (!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${productChannels.Command.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalProductCommandEvents(message, productChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${userChannels.Command.Event}]`, e);
    throw e;
  }
}

async function _subscribeToBusinessCommandEvents() {
  if (appUtil.isNullOrUndefined(businessChannels)) {
    throw new Error('[Business channel] is not set');
  }

  try {
    await pubSub.subscribe(
      businessChannels.Command.Event,
      {
        subscriberType: constants.pubSub.recipients.command
      },
      (err, message) => {
        if (err) {
          return;
        }

        if (!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${businessChannels.Command.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalBusinessCommandEvents(message, businessChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${businessChannels.Command.Event}]`, e);
    throw e;
  }
}

async function _subscribeToCustomerCommandEvents() {
  if (appUtil.isNullOrUndefined(customerChannels)) {
    throw new Error('[Customer channel] is not set');
  }

  try {
    await pubSub.subscribe(
      customerChannels.Command.Event,
      {
        subscriberType: constants.pubSub.recipients.command
      },
      (err, message) => {
        if (err) {
          return;
        }

        if (!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${customerChannels.Command.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalCustomerCommandEvents(message, customerChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${customerChannels.Command.Event}]`, e);
    throw e;
  }
}

async function _subscribeToProviderCommandEvents() {
  if (appUtil.isNullOrUndefined(providerChannels)) {
    throw new Error('[Provider channel] is not set');
  }

  try {
    await pubSub.subscribe(
      providerChannels.Command.Event,
      {
        subscriberType: constants.pubSub.recipients.command
      },
      (err, message) => {
        if (err) {
          return;
        }

        if (!message.tryValidate()) {
          return;
        }

        logging.logAction(
          logging.logLevels.INFO,
          `Message [${JSON.stringify(message)}] was received on channel [${providerChannels.Command.Event}] for recipient [
            ${message.recipient}]`
        );

        internalEventManager.emitInternalProviderCommandEvents(message, providerChannels);
      }
    );
  } catch (e) {
    logging.logAction(logging.logLevels.ERROR, `Failed to subscribe to channel [${providerChannels.Command.Event}]`, e);
    throw e;
  }
}

