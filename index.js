const { App } = require("@slack/bolt");
const { WebClient, LogLevel } = require("@slack/web-api");

require("dotenv").config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN,
});

const client = new WebClient(process.env.OWN_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});

/* Add functionality here */

app.event("app_home_opened", ({ event, say }) => {
  // console.log(event);

  say(`Hello, <@${event.user}>!`);
});

app.command("/delete", async ({ command, ack, say }) => {
  // let conversationHistory, channel_id;
  try {
    // console.log(command);
    await ack();
    const result = await client.conversations.history({
      channel: command.channel_id,
    });
    // console.log(result);
    var timeStamp = getTs(result.messages);
    // console.log(timeStamp, result.messages.length);

    for (let msg of timeStamp) {
      await client.chat.delete({
        channel: command.channel_id,
        ts: msg,
      });
    }

    // say("Yaaay! that command works!");
  } catch (error) {
    console.log(error);
  }
});

function getTs(arr) {
  var res = [];

  for (let msg of arr) {
    res.push(msg.ts);
  }

  return res;
}

app.command("/charlie", async ({ command, ack, say }) => {
  try {
    await ack();
    // console.log(command);
    var myUser_id = command.user_id;
    var thisChannel = command.channel_id;
    var finalmsg = "";
    var x = "";
    x = command.text;
    finalmsg = x.replace(/<[^,]*>/, "");

    const result = await client.users.list();

    // console.log(result);
    var users = saveUsers(result.members);
    // console.log(users);

    var getting = x.match(/<[^>]*>/g);

    if (getting != null) {
      var excluders = filteringUsers(getting);
      // console.log(excluders, "-----------");

      users = users.filter((el) => {
        return !excluders.includes(el);
      });
    }

    var total_num = users.length;

    for (const singleUser of users) {
      const opening = await client.conversations.open({
        users: singleUser,
        return_im: true,
      });
      await client.chat.postMessage({
        channel: singleUser,
        text: finalmsg,
        as_user: true,
      });
    }

    //   const sending =
    //   console.log("----------------------------------------");
    //   console.log(sending);
    //   console.log("----------------------------------------");

    var attachments = [
      {
        color: "#f2c744",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Success! This message is being sent from you directly to the ${total_num} people in this channel. It may take a few minutes to reach everyone.`,
            },
          },
          {
            type: "divider",
          },
        ],
      },
    ];

    // say(message);

    await client.chat.postEphemeral({
      channel: thisChannel,
      user: myUser_id,
      text: "Invisible",
      attachments,
    });
  } catch (error) {
    // console.log("err");
    console.error(error);
  }
});

function saveUsers(usersArray) {
  var arr = [];
  let userId = "";
  usersArray.forEach(function (user) {
    userId = user["id"];
    arr.push(userId);
  });

  return arr;
}

function filteringUsers(users) {
  var rem = [];

  for (const single of users) {
    var x = single.split("");
    x.shift();
    x.shift();
    x.pop();

    var ready = x.join("").split("|");
    rem.push(ready[0]);
  }
  return rem;
}

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
