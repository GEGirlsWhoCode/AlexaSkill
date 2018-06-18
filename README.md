# AlexaSkill
Creating an Alexa fact-finding skill. This project walks through implementing an Alexa skill that makes an API call.

## Prerequisites
To implement this skill, it is assumed that you have:
 
 1. Created the skill on the Amazon Developer Portal https://developer.amazon.com/alexa/console/ask
 2. Created the AWS Lambda function https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions
 3. Linked the skill to the Lambda function

## Tasks
After completing the prerequisites, follow the steps below to implement your Alexa Fact-Finding Skill!

### Task 1
In this task, we'll add the custom app ID that was generated on the Amazon Developers Portal to your Alexa Skill. We'll also link the custom Intent you created to the Skill. Find the two places in the code where you need put this information.

### Task 2
In this task, we'll hard-code response messages that Alexa would say to a user if the user were to try to invoke the Skill. These messages are just filler for now - we'll use these messages to verify all the Alexa handlers are being correctly invoked.

There are three main Alexa handlers we'll be implementing. It is important to fill each handler with a unique message for now, as we're relying on these messages to signal that each handler is responding correctly. Can you identify which situation each of these handlers is responsible for?
1. the 'LaunchRequest' handler
2. the '<your-custom-intent>' handler
3. the 'Unhandled' handler

Note that there's one more thing we need to add to each handler so that Alexa will actually *say* the message and then *listen* for a response. This will need to be added to each handler - but do you know where in the handler these should be added?
```
this.response.speak(speechOutput).listen(speechOutput);
this.emit(':responseReady');
```

### Task 3
Alright, at this point the Alexa skill should greet you when you invoke it and should handle situations where you would ask it for more information or where you would ask it to do something outside of it's skill level. Let's change the hard-coded speech output in your custom intent handler so that it calls another function that responds with a message instead. For now, let's keep this simple - create a function outside of the handlers that prints to the console and returns a different hard coded string.

### Task 4
The last step! Let's make an API call. Instead of returning hard-coded speech output, let's get information back *dynamically*.

For this, we'll make an http request. 
