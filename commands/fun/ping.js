const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Melihat ping dari bot.",
  cooldown: 5,
  execute(message, args) {
    const client = message.client;
    const embed = new MessageEmbed()
      .setDescription(
        `<a:unyu:761179248156999691> PONG! Latency: ${client.ws.ping}ms`
      )
      .setColor("RANDOM");
    message.channel.send(embed);
  },
};
