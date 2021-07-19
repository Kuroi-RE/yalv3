const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Lewati musik yang sedang diputar",
  async execute(message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "Kamu harus berada dalam saluran, Sebelum menggunakan perintah ini!"
      );
    let queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: Tidak ada lagu yang diputar diServer ini!")
          .setColor("RED")
      );
    queue.connection.dispatcher.end("skipped");
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Melewati musik :white_check_mark: **")
        .setColor("BLUE")
    );
  },
};
