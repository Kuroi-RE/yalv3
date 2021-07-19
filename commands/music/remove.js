const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "remove",
  description: "Menghapus lagu dari antrian",
  usage: ["[number]"],
  async execute(message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "Kamu harus berada dalam saluran, Sebelum menggunakan perintah ini!"
      );
    if (!args[0])
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: Tidak ada nomor musik yang diberikan")
          .setColor("RED")
      );
    if (isNaN(args[0]))
      return message.channel.send(
        new MessageEmbed()
          .setDescription(
            ":x: **Argumen harus berupa nomor [Contoh: .remove 2]**"
          )
          .setColor("RED")
      );
    let queue = message.client.queue.get(message.guild.id);
    if (args[0] == 1)
      return message.channel.send(
        new MessageEmbed()
          .setDescription(
            ":x: **Tidak dapat menghapus lagu yang sedang diputar, gunakan perintah .skip untuk melewati musik**"
          )
          .setColor("RED")
      );
    if (queue.queue.length == 1)
      return message.channel.send(
        new MessageEmbed()
          .setDescription(
            ":x: **Tidak bisa menghapus lagu, ketika hanya 1 lagu yang sedang diputar!**"
          )
          .setColor("RED")
      );
    if (args[0] > queue.queue.length)
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: **Antrian tidak memiliki banyak lagu**")
          .setColor("RED")
      );
    if (!queue)
      return message.channel.send(
        new MessageEmbed()
          .setDescription(":x: **Tidak ada lagu yang sedang diputar**")
          .setColor("RED")
      );
    var name = queue.queue[args[0] - 1].name;
    queue.queue.splice(args[0] - 1);
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          "**Menghapus" +
            " " +
            name +
            " " +
            "dari antrian :white_check_mark: **"
        )
        .setTimestamp()
        .setColor("BLUE")
    );
  },
};
