//package

const request = require("request");

// MEssage listener !

module.exports = (client) => {
  // IF BOT HAS TAGGED
  client.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.mentions.has(client.user.id)) {
      msg.reply(
        "I will be die in april because Discord JS 12 is die too"
      );
    }
  });

  client.on("message", async (message) => {
    const guild = client.guilds.cache.get("744885612460507145");
    const channel = guild.channels.cache.get("808629249849163796");
    if (!channel) return;
    if (message.channel === channel) {
      const word = message.content.split(" ").join(" ");
      if (message.author.bot) return;
      request(
        `https://api.simsimi.net/v2/?text=${word}&lc=id`,
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var res = JSON.parse(body);
            channel
              .send(res.success)
              .catch((Error) => message.channel.send(Error));
          }
        }
      );
    }
  });
};
