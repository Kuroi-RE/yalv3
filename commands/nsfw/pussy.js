const { MessageEmbed } = require("discord.js");
const nsfw = require("nekos.life");
const neko = new nsfw();
const sendError = require("../../Database/error");
module.exports = {
  name: "pussy",
  description: "Memberikan foto NSFW (Pussy)",
  cooldown: 8,
  async execute(message, args) {
    if (!message.channel.nsfw) {
      sendError(
        "Perintah ini hanya dapat digunakan di Saluran NSFW",
        message.channel
      );

      return;
    }
    async function nsf() {
      let target = await neko.nsfw.pussy();
      const embed = new MessageEmbed()
        .setAuthor("Pussy")
        .setColor(`RANDOM`)
        .setImage(target.url)
        .setFooter("Requested by " + message.author.username);
      message.channel.send(embed);
    }

    nsf();
  },
};
