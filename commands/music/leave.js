const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["disconnect"],
    description: "Mengeluarkan Bot dari Saluran",
    async execute(message, args) {
        const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Kamu harus berada dalam saluran, Sebelum menggunakan perintah ini!"
    );

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Keluar dari saluran :white_check_mark: **")
      .setColor("BLUE")
  );
    }
}