'use strict';

var Commit = require('../models/Commit');
var CommandResponse = require('../models/CommandResponse');
var logging = require('../utilities/Logging');
var allChannels = require('../../PubSubChannels');
var pubSub = require('../../libs/PubSub/PubSubAdapter');
var Message = require('../../libs/PubSub/Message');
var _ = require('lodash');

module.exports = {

  replay: async function replay(args, response, next) {
    var replayRequest = args.replay.value;

    var filter = {};

    if (replayRequest && replayRequest.root) {
      filter.aggregateRootName = replayRequest.root;
    }

    var uncommittedChanges = await Commit.find(filter).sort('createdAt');

    logging.logAction(
      logging.logLevels.INFO,
      `Attempting to replay commits`
    );

    var errors = [];

    _.forEach(uncommittedChanges, async function(commit){
      try {

        var channelDetails = null;

        switch (commit.aggregateRootName) {
          case "User":
            channelDetails = allChannels.User;
            break;
          case "Business":
            channelDetails = allChannels.Business;
            break;
          case "Customer":
            channelDetails = allChannels.Customer;
            break;
          case "Product":
            channelDetails = allChannels.Product;
            break;
          case "Provider":
            channelDetails = allChannels.Provider;
            break;
          case "ShoppingCart":
            channelDetails = allChannels.ShoppingCart;
            break;
        }

        // Now we need to propagate the commit
        var commitEvent = new Message(
          "",
          "",
          commit.action,
          commit
        );

       await pubSub.publishAndWaitForResponse(
          channelDetails.EventCommit.Event,
          channelDetails.EventCommit.CompletedEvent,
          {
            subscriberType: commit.aggregateRootName.toLowerCase()
          },
          commitEvent);

      } catch (err) {
        errors.push(err);
      }
    });

    if(errors.length > 0){
      return next(errors);
    }

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify(new CommandResponse()));
  }

};