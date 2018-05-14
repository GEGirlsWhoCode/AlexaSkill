'use strict';
//Required node packages
var alexa = require('./node_modules/alexa-sdk');
var request = require('request');

//this is the handler, when the lambda is invoked, this is whats called
exports.handler = function (event, context, callback) {
  var skill = alexa.handler(event, context);
  
  skill.appId = 'amzn1.ask.skill.b0c22d7c-e50e-4aaf-9322-1c577dca2770';
  skill.registerHandlers(handlers);
  skill.execute();
};

//Alexa handlers
var handlers = {
  'LaunchRequest': function () {
    console.log("inside of LaunchRequest");
    var speechOutput = "Hello from NASA!";
    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(':responseReady');
  },
  
  //Entering our main intent
  'GetAPOD': function () {
    var intent_context= this
    getData().then(function(body) {
      var speechOutput = body.explanation;
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
  var url = "https://api.nasa.gov/planetary/apod?api_key=R5qhAo9JxPvanhFNKIJz1ppc7Ll6paPsEP40atAs"
  console.log("inside get data")

  return new Promise(function(resolve, reject) {
    request.get(url, function(error, response,body) {
      if (error) {
        console.log(error)
        reject(error)

      } 
      if (body) {
        console.log(body)
        resolve(JSON.parse(body));
      }
    })
  });

  return "outside request"
}