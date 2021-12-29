const { Client } = require("discord.js");
const config = require('./config.json');

process.on('unhandledRejection', error => {
  console.error(
    "There was an error! Did you update the config.json file? " +
    "If you did, let me know what the error message says in an issue on the repo on GitHub. \n",
    error
  );
  process.exit();
});

console.log("Ready to level up!");
var timeToWait = 10000
var prune = false;
var messagesArr = ['Goedemiddag :)💪🏽', 'Sicke sneak peek inderdaad', 'thx', 'just grinding', 'i need level 10', 'есть русские?', 'какие ожидания по флору?', 'WAGMI', 'Yeppp', 'เลยครับ:kekww:'];

for (const token of config.botToken) {

  const client = new Client();
  client.config = config;

  try {
    client.on("message", async message => {
      if (message.author.id !== client.user.id || message.content.indexOf(client.config.prefix) !== 0) return;

      const prefix = config.prefix;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      if (command === "usernotify") {

        message.delete().catch(console.error);

        function sendSpamMessage() {

          var randomMessage = messagesArr[Math.floor(Math.random() * messagesArr.length)];

          message.channel.send(randomMessage)
          .then((msg) => {
            console.log("Message sended: ", randomMessage);
            setTimeout(function() {
            msg.delete();
          }, 100)});  

          if (!timeToWait)
            timeToWait = Math.floor(Math.random() * (maxTime - minTime)) + minTime;

          setTimeout(sendSpamMessage, timeToWait);
        }

        sendSpamMessage();
      }
    });
  } catch (error) {
    console.error("CAUGHT ERROR =>", error);
  }

  client.login(token);
}