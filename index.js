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
    console.log("inside of LaunchRequest");
    var speech0utput = "Hello welcome to your skill"
    this.response.speak(speech0utput).listen(speech0utput);
    this.emit(':responseReady');
  },

  //Entering our custom intent
  //Task 1: Replace <your-intent> with the intent you created through Alexa
  'GetData': function () {
    console.log("inside GetData")
    var speech0utput = returnFact()
    this.response.speak(speech0utput).listen(speech0utput);
    this.emit(':responseReady');
},

  'Unhandled': function (){
    console.log("inside of unhandled");
    var speech0utput = "There was a problem"
    this.response.speak(speech0utput).listen(speech0utput);
    this.emit(':responseReady');

  }
};

var returnFact = function() {
  console.log("inside returnFact")
  return "You've reached the returnFact function!"

}
