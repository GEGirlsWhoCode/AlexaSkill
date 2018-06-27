'use strict';
//Required node packages
var alexa = require('alexa-sdk');
var request = require('request');

//this is the handler, when the lambda is invoked, this is what is called
exports.handler = function (event, context, callback) {
  var skill = alexa.handler(event, context);

  skill.appId = '<your app id>';
  skill.registerHandlers(handlers);
  skill.execute();
};

//List of Alexa handlers
var handlers = {
  'LaunchRequest': function () {
    var intent_context = this
    console.log("inside of LaunchRequest");
   var speechOutput = "Hello welcome to your skill!";
   intent_context.response.speak(speechOutput).listen(speechOutput);
   intent_context.emit(':responseReady');

  },

  //Entering our custom intent
  'GetSong': function () {
    var intent_context = this
    console.log("inside GetSong")
    var speechOutput =  "Inside of GetSong"
    intent_context.response.speak(speechOutput).listen(speechOutput);
    intent_context.emit(':responseReady');
},

  'Unhandled': function (){
    var intent_context = this
    console.log("inside of unhandled");
    var speechOutput = "I didn't understand that.  Please try again";
    intent_context.response.speak(speechOutput).listen(speechOutput);
    intent_context.emit(':responseReady');
  }
};
