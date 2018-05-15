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
    //Task 2: Write the welcome message for your Alexa Skill here

  },

  //Entering our custom intent
  'GetAPOD': function () {
    var intent_context= this
    console.log("inside custom intent")
    //Task 2: Write the intent message here. For now, this will be a hard-coded string that she will respond back to us with.

},

  'Unhandled': function (){
    console.log("inside of unhandled");
    //Task 2: Write the unhandled message here. This will be what Alexa responds when she doesn't understand the intent request.

  }
};

var getData = function() {
  console.log("inside get data")

return "Hard-coded message from Get Data"
}
