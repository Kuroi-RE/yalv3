const { MessageEmbed } = require("discord.js");
const sendError = require("../../Database/error");

module.exports = {
  name: "add-role",
  description: "Menambah role ke user",
  permissions: ["MANAGE_ROLES"],
  guildOnly: true,
  usage: ["[user] [role]"],
  async execute(message, args) {
    const user =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    const itsRole =
      message.mentions.roles.first() || message.guild.roles.get(args[1]);

    if (!user) return sendError("User tidak dapat ditemukan.", message.channel);
    if (!itsRole)
      return sendError("Tidak dapat menemukan Role!", message.channel);
    message.delete({ timeout: 3000 });
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("<a:verify:799539329235025923> Role Ditambahkan!")
      .setDescription(`Role ${itsRole} telah diberikan ke ${user}`)
      .setFooter("Perintah dari " + message.author.username);
    await user.roles.add(itsRole);
    message.channel.send(embed);
  },
};
