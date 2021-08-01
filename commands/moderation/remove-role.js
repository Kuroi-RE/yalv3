const { MessageEmbed } = require("discord.js");
const sendError = require("../../Database/error");

module.exports = {
  name: "remove-role",
  aliases: ["delrole"],
  description: "Menghapus role dari user",
  guildOnly: true,
  permissions: ["MANAGE_ROLES"],
  usage: ["[user] [role]"],
  async execute(message, args) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const itsRole =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!user) return sendError("User tidak dapat ditemukan.", message.channel);
    if (!itsRole)
      return sendError("Tidak dapat menemukan Role!", message.channel);
    message.delete({ timeout: 3000 });
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("<a:verify:799539329235025923> Role Dihapus!")
      .setDescription(`Role ${itsRole} telah dihapus dari ${user}`)
      .setFooter("Perintah dari " + message.author.username);
    await user.roles.remove(itsRole);
    message.channel.send(embed);
  },
};
