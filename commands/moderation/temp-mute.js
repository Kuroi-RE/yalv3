const { MessageEmbed } = require("discord.js");
const sendError = require("../../Database/error");
const ms = require("ms");

module.exports = {
  name: "temp-mute",
  aliases: ["mute"],
  guildOnly: true,
  description: "Mute member dengan waktu.",
  permissions: ["MANAGE_ROLES"],
  usage: ["[member] [time] [reason]"],
  async execute(message, args) {
    const member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    console.log(`${args[0]} ${args[1]}`);
    if (!member) {
      sendError(
        "Invalid syntax [Tidak dapat menemukan member]\n.temp-mute [member] [time] [reason]",
        message.channel
      );
    }
    const time = args[1];
    if (!time) {
      sendError(
        "Invalid syntax [Tidak dapat mendapatkan waktu!]\n.temp-mute [member] [time] [reason]",
        message.channel
      );
    }
    if (
      args[1].endsWith("d") &&
      args[1].endsWith("h") &&
      args[1].endsWith("m") &&
      args[1].endsWith("s")
    )
      return sendError(
        "Invalid syntax [Format waktu salah]\nContoh format: d(days), h(hours), m(minutes), s(second)"
      );
    const reaso = args.slice(2).join(" ");
    const reason = reaso ? reaso : "Unspecified";
    if (member.bot) {
      sendError("Invalid Member! [Tidak bisa mute bot]", message.channel);
    }
    const user = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setAuthor(`${user.tag} has been muted for ${time}`)
      .setDescription(`Reason: ${reason}`);
    message.channel.send(embed);
    const logCh = message.guild.channels.cache.get("744913294715781130");
    const embed1 = new MessageEmbed()
      .setAuthor("Your Another Logs", message.guild.iconURL())
      .setColor("RED")
      .addField("Type", "Temporary Mute")
      .addField("Reason", reason)
      .addField("Time", time)
      .addField("Member", user.tag)
      .addField("Moderator", message.author.tag)
      .setTimestamp();
    logCh.send(embed1);
    let mainrole = message.guild.roles.cache.find(
      (role) => role.name === "Another Life"
    );
    let role = message.guild.roles.cache.find((role) => role.name === "Muted");
    member.roles.add(role);
    member.roles.remove(mainrole);
    setTimeout(function () {
      member.roles.remove(role);
      member.roles.add(mainrole);
      const em = new MessageEmbed()
        .setAuthor(`${user.tag} has been unmute`)
        .setDescription(`Reason: ${reason}`);
      logCh.send(em);
    }, ms(args[1]));
  },
};
