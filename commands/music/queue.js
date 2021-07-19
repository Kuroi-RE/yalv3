const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Melihat antrian lagu",
  async execute(message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "Kamu harus berada dalam saluran, Sebelum menggunakan perintah ini!"
      );
    const queue = message.client.queue.get(message.guild.id);
    var status;
    var np;
    var count = 0;
    if (!queue) status = "Tidak ada antrian lagu!";
    else
      status = queue.queue
        .map((x) => {
          count += 1;
          return (
            "• " +
            "`" +
            count +
            "." +
            "`" +
            x.name +
            " -Requested by " +
            `<@${x.requested.id}>`
          );
        })
        .join("\n");
    if (!queue) np = status;
    else np = queue.queue[0].name;
    if (queue) thumbnail = queue.queue[0].thumbnail;
    else thumbnail = message.guild.iconURL();
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Music Queue",
          "https://img.icons8.com/color/2x/rhombus-loader.gif"
        )
        .setThumbnail(thumbnail)
        .setColor("GREEN")
        .addField("Now Playing", np, true)
        .setDescription(status)
    );
  },
};
