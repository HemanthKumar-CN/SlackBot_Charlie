# Project Title

SlackBot_Charlie

## Demo link:

Backend yet to be deployed...

## Table of Content:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App

The bot is built using [slack.dev/bolt-js](https://github.com/slackapi/bolt-js) and has slash commands to execute functions.
- /charlie "<message to be sent"> : This command opens a conversation in slack workspace and sends the message you want to send of any length to all the members in the workspace.
This functionality is not available in official app, instead sending proffessional DMs is impossible while it creates a group of members you try to send message to.
The slash commands solves this hindrance.

- /charlie "<message>" @user1 @user2...: The above command does send message to each and everyone in the workspace but if any user need to be excluded you mention them using @-(slack mentioning convention).

Charlie bot will come up with more slash commands and functionalities very much helpful for eveyday slack users.

## Screenshots

- About 

![Home Page](https://i.ibb.co/QJmc3VM/Screenshot-212.png)

- charlie reply message

![Home Page](https://i.ibb.co/9pF8JkV/Screenshot-213.png)

## Technologies

The tech used are:

- [Boltjs](https://github.com/slackapi/bolt-js)

## Setup

- download or clone the repository
- run `npm install`
- cd SlackBot_Charlie
- nodemon index.js

## App Configuration
- [Visit this Url](https://api.slack.com/apps)
- Create New app -> From Sractch, Assign a name and workspace
-![Need to define features for you bot - Click on "Add features and functionality"]
(https://i.ibb.co/yQfJgFm/Screenshot-350.png)
- Define slash commands
  (https://ibb.co/yQfJgFm)
- Enable Socket mode -> provide a random token name and generate xapp token
  (https://ibb.co/QP6TvZc)
- On the Event Subscription tab -> Need to subscribe to bot events and Events on behalf of users
- Select all the events as shown in the image below
  (https://ibb.co/sVgtqYY)
  (https://ibb.co/PNFY2Tb)
- In the App home tab: need to - "Allow users to send Slash commands and messages from the messages tab" checkmark this true and continue
- Oauth/permissions tab: Define Oauth scopes for both Bot token scopes and user token scopes and hence as per these permissions your token will be generated (select permissions as shown below)
  (https://ibb.co/SV3PcQQ)
  (https://ibb.co/JrwV7y4)
- At the end Install the app to your workspace

## Approach

- Initially started with a slash command of greeting the user on opening the home tab of bot.
- to implement individual DMs the message conversation needs to be opened and then the message sent, documentation of slack.dev provides for methods to facilitate this.
- The local server providing backend runs on socket mode with slack [untill the app is deployed on backend server]

## Status
- Yet to be deployed on production workspace.

## Upcoming features
- /delete This will delete all the conversations in that particular channel/private conversation channel
- /weather This will pick up current location of user and using weather api will fetch the weather data of that place.
- Implementing sent and read status of messages sent to a user whether in channel or DM 

## Credits
List of contriubutors:

- [HemanthKumar-CN](https://github.com/HemanthKumar-CN)

## License
The MIT License (MIT)

Copyright (c) 2016-2018 Robots & Pencils
Copyright (c) 2019- Slack Technologies, LLC
