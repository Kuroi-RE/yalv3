const { MessageEmbed } = require("discord.js");
const nsfw = require("nekos.life");
const neko = new nsfw();
const sendError = require("../../Database/error");
module.exports = {
  name: "blowjob",
  description: "Memberikan foto NSFW (BlowJob)",
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
      let target = await neko.nsfw.blowJob();
      const embed = new MessageEmbed()
        .setAuthor("BlowJob")
        .setColor(`RANDOM`)
        .setImage(target.url)
        .setFooter("Requested by " + message.author.username);
      message.channel.send(embed);
    }

    nsf();
  },
};
