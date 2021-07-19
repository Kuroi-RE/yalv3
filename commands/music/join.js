const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "join",
  aliases: ["connect"],
  description: "Membuat bot bergabung ke dalam Saluran.",
  async execute(message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send("Kamu harus berada didalam Saluran!");

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
      return error("Saya tidak memiliki akses untuk masuk ke dalam Saluran");

    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
      return error("Saya tidak memiliki akses untuk berbicara!");

    await channel.join();

    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Bergabung ke dalam Saluran :white_check_mark: **")
        .setColor("BLUE")
    );
  },
};
