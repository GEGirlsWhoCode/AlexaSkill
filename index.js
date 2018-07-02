'use strict';
//Required node packages
var alexa = require('alexa-sdk');
var request = require('request');

//this is the handler, when the lambda is invoked, this is what is called
exports.handler = function (event, context, callback) {
  var skill = alexa.handler(event, context);

//Task 1: Add your app ID from Alexa
  skill.appId = '<your app id>';
  skill.registerHandlers(handlers);
  skill.execute();
};

//List of Alexa handlers
var handlers = {
  'LaunchRequest': function () {
    var intent_context = this
    console.log("inside of LaunchRequest");
    var speechOutput = "Welcome to your skill"
    intent_context.response.speak(speechOutput).listen(speechOutput);
    intent_context.emit(':responseReady');
  },

  //Entering our custom intent
  //Task 1: Replace <your-intent> with the intent you created through Alexa
  'GetSong': function () {
    var intent_context = this
    console.log("inside GetSong")
    returnSong().then(function (body) {
      var speechOutput = body.results[0].trackName
      intent_context.response.speak(speechOutput).listen(speechOutput);
      intent_context.emit(':responseReady');
    },function (error) {
      console.log("You have an error in GetSong")
      var speechOutput = "Sorry your API returned an error"
      intent_context.response.speak(speechOutput).listen(speechOutput);
      intent_context.emit(':responseReady');
    })
  },

  'Unhandled': function (){
    var intent_context = this
    console.log("inside of unhandled");
    var speechOutput = "There was an error"
    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(':responseReady');

  }
};

var returnSong = function() {
  var url = "https://itunes.apple.com/search?term=maroon+5&limit=1"
  console.log("inside returnSong")

  return new Promise (function(resolve, reject){
    request.get(url, function (error, response, body){
      if (body) {
        console.log(body)
        resolve (JSON.parse(body))
      }

      if (error) {
        console.log(error)
        reject (error)
      }

    })

  });

}
