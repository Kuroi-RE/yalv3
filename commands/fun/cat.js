const { MessageEmbed } = require("discord.js");
const lifes = require("nekos.life");
const neko = new lifes();

module.exports = {
  name: "cat",
  description: "Memberikan foto kucing (Kucing beneran bukan 2d)",
  cooldown: 6,
  async execute(message) {
    async function cat() {
      const meow = await neko.sfw.meow();
      const embed = new MessageEmbed()
        .setTitle("Meoowwww")
        .setColor(`RANDOM`)
        .setImage(meow.url);
      message.channel.send(embed);
    }

    cat();
  },
};
