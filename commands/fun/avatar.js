const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["pfp"],
  description: "Melihat photo profile dari user.",
  execute(message, args) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );
    if (!args.length) {
      message.channel.send(
        message.member.user.displayAvatarURL({ dynamic: true, size: 1024 })
      );
    }
    if (member) {
      message.channel.send(
        member.user.displayAvatarURL({ dynamic: true, size: 1024 })
      );
    }
  },
};
