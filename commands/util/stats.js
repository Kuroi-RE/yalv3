const { MessageEmbed } = require("discord.js");
const ab = require("../../Database/client.json");
module.exports = {
  name: "stats",
  aliases: ["info", "bot"],
  description: "Stat/Informasi tentang bot",
  execute(message, args) {
    const client = message.client;
    const bot = client.user;

    const ramTotal = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    )}MB of 800MB RAM`;

    const embed = new MessageEmbed()
      .setAuthor(
        "Xyura Bots Stats (YAL)",
        bot.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setDescription("Dibawah ini adalah informasi tentang Xyura bots!")
      .addFields(
        { name: "Name", value: "Xyura Bots" },
        { name: "ID", value: bot.id },
        { name: "Owner", value: ab.owner + ` | <@459277813506244618>` },
        { name: "Status", value: bot.presence.status },
        { name: "Library", value: "Discord JS" },
        { name: "Version", value: "3.1" },
        { name: "Storage", value: ramTotal },
        { name: "Latecy", value: `${client.ws.ping}ms` },
        {
          name: "Uptime",
          value:
            Math.round(client.uptime / (1000 * 60 * 60)) +
            " hours, " +
            (Math.round(client.uptime / (1000 * 60)) % 60) +
            " minutes, and " +
            (Math.round(client.uptime / 1000) % 60) +
            " seconds",
        }
      );
    message.channel.send(embed);
  },
};
