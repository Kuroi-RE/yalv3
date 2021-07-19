const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../Database/client.json");
const sendError = require("../../Database/error");

module.exports = {
  name: "kick",
  guildOnly: true,
  permissions: ["KICK_MEMBERS"],
  description: "Mengeluarkan member",
  usage: ["[member] [reason]"],
  async execute(message, args) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!args.length) {
      sendError(
        "Kamu harus menandai user atau memberikan id dari user!",
        message.channel
      );
      return;
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      sendError(
        "Saya tidak memiliki akses untuk mengeluarkan member!",
        message.channel
      );
    }

    if (!member) {
      sendError("Tidak dapat menemukan member.");
      return;
    }

    if (member) {
      const reaso = args.slice(0).join(" ");
      const reason = reaso ? reaso : "Unspecified";
      await member
        .kick({ reason: reason })
        .then(() => {
          const mbed = new MessageEmbed()
            .setAuthor(
              `${member.user.tag} Telah dikeluarkan!`,
              member.user.displayAvatarURL()
            )
            .setDescription(`Reason: ${reason}`);
          message.channel.send(mbed);
          const logCh = message.guild.channels.cache.get("861983412311294003");
          const embed = new MessageEmbed()
            .setAuthor("Your Another Logs", message.guild.iconURL())
            .setColor("RED")
            .addField("Type", "Kick")
            .addField("Reason", reason)
            .addField("Member", member.user.tag)
            .addField("Moderator", message.author.tag)
            .setTimestamp();
          logCh.send(embed);
        })
        .catch((DiscordAPIError) =>
          sendError(
            "Tidak memiliki akses untuk mengeluarkan member",
            message.channel
          )
        );
    }
  },
};
