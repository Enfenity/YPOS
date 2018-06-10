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

    var uncommittedChanges = await Commit.find({aggregateRootName: replayRequest.root});

    logging.logAction(
      logging.logLevels.INFO,
      `Attempting to replay [${replayRequest.root}] commits`
    );

    var errors = [];

    var channelDetails = null;
    
    switch (replayRequest.root) {
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
    
    if (channelDetails) {
      _.forEach(uncommittedChanges, async function(commit){
        try {
          // Now we need to propagate the commit
          var commitEvent = new Message(
            "",
            "",
            commit.action,
            commit
          );

          await pubSub.publish(
            channelDetails.EventCommit.Event,
            {},
            commitEvent);
        } catch (err) {
          errors.push(err);
        }
      });  
    }

    if(errors.length > 0){
      return next(errors);
    }

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify(new CommandResponse()));
  }

};