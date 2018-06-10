'use strict';

var replayService = require('../services/ReplayService');

module.exports.replay= function replay (req, res, next) {
  replayService.replay(req.swagger.params, res, next);
};
