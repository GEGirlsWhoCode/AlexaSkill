'use strict';
//Required node packages
var alexa = require('./node_modules/alexa-sdk');
var request = require('request');

//this is the handler, when the lambda is invoked, this is what is called
exports.handler = function (event, context, callback) {
  var skill = alexa.handler(event, context);

//Task 1: Add your app ID from Alexa
  skill.appId = '<your-app-id>';
  skill.registerHandlers(handlers);
  skill.execute();
};

//List of Alexa handlers
var handlers = {
  'LaunchRequest': function () {
    console.log("inside of LaunchRequest");
  },

  //Entering our custom intent
  //Task 1: Replace <your-intent> with the intent you created through Alexa
  'GetData': function () {
    var intent_context= this
    console.log("inside custom intent")

},

  'Unhandled': function (){
    console.log("inside of unhandled");

  }
};
