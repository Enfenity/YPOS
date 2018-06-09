'use strict';

var CommandResponse = function(message){
  
  if(message){
    this.message = message;
  } else {
    this.message = "success"
  }

};

module.exports = CommandResponse;