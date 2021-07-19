const { MessageEmbed } = require("discord.js");
const lifes = require("nekos.life");
const neko = new lifes();
const sendError = require("../../Database/error");

module.exports = {
  name: "kiss",
  description: "Dapatkan ciuman atau memberikan ciuman!",
  usage: ["[user/not]"],
  cooldown: 8,
  async execute(message, args) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    const kiss = await neko.sfw.kiss();
    const embedSelf = new MessageEmbed().setImage(kiss.url).setColor(`RANDOM`);

    // Create Function
    async function self() {
      message.channel.send(
        embedSelf.setTitle("Kamu mendapatkan sebuah ciuman!!!")
      );
    }

    async function usr() {
      message.channel.send(
        embedSelf.setTitle(
          user.user.username +
            " Mendapatkan ciuman dari " +
            message.author.username
        )
      );
    }

    if (!args.length) {
      self();

      return;
    }
    if (!user) {
      sendError("User tidak dapat ditemukan!", message.channel);

      return;
    }

    if (user) {
      usr();

      return;
    }
  },
};
