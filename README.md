# GirlsWhoCode
Creating an Alexa fact-finding skill. This project walks through implementing an Alexa skill that makes an API call.

## Pre Work
To implement this skill, we will start by:
 
 1. Created the skill on the [Amazon Developer Portal](https://developer.amazon.com/alexa-skills-kit?&sc_channel=SEM&sc_category=Paid&sc_content=Skill_Related&sc_funnel=Visit&sc_campaign=Evergreen&sc_segment=Devs&sc_publisher=GO&sc_country=US&sc_trackingcode=SEM01&sc_place=&sc_detail=234231114424&sc_keyword=developement%20amazon&gclid=Cj0KCQjwu_jYBRD8ARIsAC3EGCIZfB9RCmCvX1ZvAs_mB2buWNOxl7_DpZ5AGuAVT9hmTeZHnShtiRUaAhRoEALw_wcB)
 2. Created the AWS Lambda function on the [AWS Console](https://console.aws.amazon.com/console/home?region=us-east-1). 
 3. Linked the skill to the Lambda function.

## Deploy
We'll be using a zip file to deploy this app - use this command in your terminal to zip the files together and upload them to your Lambda function:

### MacOS:
`zip -r MyAlexaApp.zip index.js node_modules`

### Windows:
right click --> send to --> Compressed (zipped) folder

## Tasks
After completing the prerequisites, follow the steps below to implement your Alexa Fact-Finding Skill!

### Task 1 - Alexa Skills Setup
In this task, we'll add the custom app ID that was generated on the Amazon Developers Portal to your Alexa Skill. We'll also link the custom Intent you created to the Skill.
1. Create the Alexa Skill through the Alexa Developer Console. Our skill is going to have Alexa return a song. Give your skill a unique name and invocation name, something like "KellySkill". 
2. Create a custom intent through the Developer Console. Call the intent `GetSong` and give the intent an utterance, like "what's my favorite song". 
3. Setup the Alexa Skill Service on the AWS Console using Lambda. Create a function with a unique name, like "KellyCostelloFunction" and give it an existing role, 'GirlsWhoCode'.
4. Setup a, Alexa Skills Kit trigger for your Lambda function. 
5. Link the Alexa skill to the service using the App Id ARN.  
6. Save and build the model.

Next, take the app id that we copied from the Alexa Developer console and link it to the code.  

### Task 2
In this task, we'll hard-code response messages that Alexa would say to a user if the user were to try to invoke the Skill. Have Alexa tell the user your favorite song or whatever else you want her to say - we'll use these messages to verify all the Alexa handlers are being correctly invoked.

There are three main Alexa handlers we'll be implementing. A handler is just a function for the intents. It is important to fill each handler with a unique message for now, as we're relying on these messages to signal that each handler is responding correctly. Can you identify which situation each of these handlers is responsible for?
1. the 'LaunchRequest' handler
2. the 'GetSong' handler - note that this has the same name as your intent!
3. the 'Unhandled' handler

Note that there's one more thing we need to add to each handler so that Alexa will actually *say* the message and then *listen* for a response. This will need to be added to each handler - but do you know where in the handler these should be added?
```
intent_context.response.speak(speechOutput).listen(speechOutput);
intent_context.emit(':responseReady');
```

### Task 3
Alright, at this point the Alexa skill should greet you when you invoke it and should handle situations where you would ask it for more information or where you would ask it to do something outside of it's skill level. Let's change the hard-coded speech output in your GetSong intent handler so that it calls another function that responds with a message instead. For now, let's keep this simple - create a function outside of the handlers that prints to the console and returns another hard coded filler string (it may be helpful to make this string different than what was previously used, so that you can be sure the change took effect).

Create the `returnSong` function:
```
var returnSong = function() {
  console.log("inside returnSong")
  return "another fact!"
}
```

Your `GetSong` handler should look like this:
```
  'GetSong': function () {
    var intent_context = this
    console.log("inside getSong")
    var speechOutput = returnFact()
    intent_context.response.speak(speechOutput).listen(speechOutput);
    intent_context.emit(':responseReady');
  },
```

### Task 4
The last step! Let's make an API call. Instead of returning hard-coded speech output, let's get information back *dynamically*.

For this, we'll make an http request. Just like entering a URL into your browser's search bar returns the information necessary to render a webpage, accessing a URL through your program can also retrieve information. Replacing the hard-coded data with an http request will take two steps:

1. Constructing a promise
A *promise* is an object that represents either the completion or failure of an operation. This is a powerful concept in web development - you could think of this as allowing your programs to multitask. Say you were sitting at your computer waiting for a webpage to load, but it was incredibly slow and was taking 30 seconds or more... you wouldn't just sit there staring at the screen, you would probably start doing something else! Your programs can do the same thing by using promises - your program doesn't need to stop everything it's doing just to wait for data to return. Instead it can continue operating other instructions and, once data does get returned, pick up where it left off.

To construct your promise, add a function called `returnSong` after your handlers function. Inside the function, create a vaariable named `url` that contains the url as a string:

```
var returnSong = function() {

  var url = "https://itunes.apple.com/search?term=maroon+5&limit=1"

}
```

Then return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object:

```
var returnSong = function() {
  var url = "https://itunes.apple.com/search?term=maroon+5&limit=1"

  // A promise is an object that *may* produce a single value sometime in the future
  return new Promise(function(resolve, reject) {});
}
```

Finally, construct the promise object. Getting data from the url using the `request.get()` function to handle the case where the data is returned correctly and the case where an error is returned instead. When you're done, your function should look like this:

```
var returnSong = function() {
  var url = "https://itunes.apple.com/search?term=maroon+5&limit=1"

  return new Promise(function(resolve, reject) {
    // A promise is an object that *may* produce a single value sometime in the future
    request.get(url, function(error, response,body) {
      if (error) {
        console.log(error)
        reject(error)

      } 
      if (body) {
        console.log(body)
        resolve(JSON.parse(body))
      }
    })
  });
}
```

Great! You've created a promise. Now, when the `GetSong` function operates, it will attempt to access a URL. If this request for data is successful, you can resolve the promise and return the data, else you reject the promise and return the error.

2. Handling the output from the promise
Now, handle the data output from the url after the promise is *resolved* or *rejected*. Recall that `returnSong` returns a promise that is out of order (or asynchronous) from the usual line-by-line, in-order operation of a program. we use the `then()` function to tell the promise what to do in the case of a resolution or rejection, like so:

```
returnSong().then(function(body) {}, function(error) {})
```
Note that the `then` function takes two functions as arguments - the first function handles the resolution of the promise (when data is returned) and the next function handles the rejection of the promise (when an error is returned). Alexa should handle each case differently - she either needs to say the result of the data or inform the user that she could not get any data back. Construct her speach output accordingly. In the end, your `GetSong` handler should call the `returnSong` function and have Alexa speak like so:

```
returnSong().then(function(body) {
  var speechOutput = body.resultCount[0].trackName;
  intent_context.response.speak(speechOutput).listen(speechOutput);
  intent_context.emit(':responseReady');
}, function(error) {
  var speechOutput = "I'm sorry. I couldn't process your request."
  intent_context.response.speak(speechOutput).listen(speechOutput);
  intent_context.emit(':responseReady');
})
```
