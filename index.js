'use strict';
//Required node packages
var alexa = require('./node_modules/alexa-sdk');
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
    var speech0utput = "Welcome to your skill"
    this.response.speak(speech0utput).listen(speech0utput);
    this.emit(':responseReady');
  },

  //Entering our custom intent
  //Task 1: Replace <your-intent> with the intent you created through Alexa
  'GetData': function () {
    var intent_context = this
    console.log("inside GetData")
    returnFact().then(function (body) {
      var speech0utput = body.results[0].trackName
      intent_context.response.speak(speech0utput).listen(speech0utput);
      intent_context.emit(':responseReady');
    },function (error) {
      console.log("You have an error in GetData")
      var speech0utput = "Sorry your API returned an error"
      intent_context.response.speak(speech0utput).listen(speech0utput);
      intent_context.emit(':responseReady');
    })
  },

  'Unhandled': function (){
    console.log("inside of unhandled");
    var speech0utput = "There was an error"
    this.response.speak(speech0utput).listen(speech0utput);
    this.emit(':responseReady');

  }
};

var returnFact = function() {
  var url = "https://itunes.apple.com/search?term=maroon+5&limit=1"
  console.log("inside returnFact")

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
