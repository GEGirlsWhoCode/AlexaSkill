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
   var speechOutput = "Hello from NASA!";
   this.response.speak(speechOutput).listen(speechOutput);
   this.emit(':responseReady');

  },

  //Entering our custom intent
  'GetAPOD': function () {
    var intent_context= this
    console.log("inside custom intent")
    getData().then(function() {
      //Task 4: Handle the response from the promise returned from getData. After doing this, Alexa will wait for response before saying anything
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

var getData = function() {
  console.log("inside get data")
  var speechOutput= "Hi, Alexa has reached your getData function"
  //Task 4: Instead of returning a hard coded string, make an http request to the URL you were given to retrieve the data.

return speechOutput
}
