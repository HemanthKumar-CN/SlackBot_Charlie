const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN,
});

/* Add functionality here */

app.event("app_home_opened", ({ event, say }) => {
  console.log(event);

  say(`Hello, <@${event.user}>!`);
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
