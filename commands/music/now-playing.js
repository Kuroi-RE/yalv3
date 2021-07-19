const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "now-playing",
  aliases: ["np"],
  description: "Informasi dari lagu yang sedang didengar",
  async execute(message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "Kamu harus masuk kedalam saluran sebelum menggunakan perintah ini!"
      );
    let queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription(":x: Tidak ada lagu yang diputar diServer ini")
      );
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Now Playing",
          "https://img.icons8.com/color/2x/audio-wave--v2.gif"
        )
        .setColor("BLUE")
        .setDescription(
          queue.queue[0].name +
            " Requested By: " +
            "<@" +
            queue.queue[0].requested +
            ">"
        )
        .setThumbnail(queue.queue[0].thumbnail)
        .setFooter(
          "Ada " + queue.queue.length + " lagu yang akan diputar selanjutnya"
        )
    );
  },
};
