'use strict';
//Required node packages
var alexa = require('alexa-sdk');
var request = require('request');

//this is the handler, when the lambda is invoked, this is what is called
exports.handler = function (event, context, callback) {
  var skill = alexa.handler(event, context);

//Task 1: Add your app ID from Alexa
  skill.appId = 'amzn1.ask.skill.9b1b227b-32be-47c3-8078-b3a48b8c3b57';
  skill.registerHandlers(handlers);
  skill.execute();
};

//List of Alexa handlers
var handlers = {
  'LaunchRequest': function () {
    var intent_context = this
    console.log("inside of LaunchRequest");
    var speechOutput = "Hello welcome to your skill"
    intent_context.response.speak(speechOutput).listen(speechOutput);
    intent_context.emit(':responseReady');
  },

  //Entering our custom intent
  //Task 1: Replace <your-intent> with the intent you created through Alexa
  'GetSong': function () {
    var intent_context = this
    console.log("inside GetSong")
    var speechOutput = returnSong()
    intent_context.response.speak(speechOutput).listen(speechOutput);
    intent_context.emit(':responseReady');
},

  'Unhandled': function (){
    var intent_context = this
    console.log("inside of unhandled");
    var speechOutput = "There was a problem"
    intent_context.response.speak(speechOutput).listen(speechPutput);
    intent_context.emit(':responseReady');

  }
};

var returnSong = function() {
  console.log("inside returnSong")
  return "You've reached the returnSong function!"

}
