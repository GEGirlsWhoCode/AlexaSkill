'use strict';
//Required node packages
var alexa = require('./node_modules/alexa-sdk');
var request = require('request');

//this is the handler, when the lambda is invoked, this is what is called
exports.handler = function (event, context, callback) {
  var skill = alexa.handler(event, context);

  skill.appId = 'amzn1.ask.skill.b0c22d7c-e50e-4aaf-9322-1c577dca2770';
  skill.registerHandlers(handlers);
  skill.execute();
};

//List of Alexa handlers
var handlers = {
  'LaunchRequest': function () {
    console.log("inside of LaunchRequest");
   var speechOutput = "Hello welcome to your skill!";
   this.response.speak(speechOutput).listen(speechOutput);
   this.emit(':responseReady');

  },

  //Entering our custom intent
  'GetAPOD': function () {
    var intent_context= this
    console.log("inside custom intent")
    returnFact().then(function() {
      //Task 3: Replace the hard-coded speech0utput. Call the 'returnFact' function to get the response back.
      var speechOutput = "Hi, Alexa has reached your custom intent";
      intent_context.response.speak(speechOutput).listen(speechOutput);
      intent_context.emit(':responseReady');
    })
},

  'Unhandled': function (){
    console.log("inside of unhandled");
    var speechOutput = "I didn't understand that.  Please try again";
    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(':responseReady');
  }
};

var returnFact = function() {
  console.log("inside returnFact")
  return "Another Fact!"
}
