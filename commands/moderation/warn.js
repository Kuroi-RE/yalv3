const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  permissions: ["ADMINISTRATOR"],
  description: "Warned member",
  guildOnly: true,
  usage: "[member] <reason>",
  async execute(message, args) {
    // ? message.delete({ timeout: 3000 });
    const sendError = require("../../data/error");
    const warned = message.mentions.users.first();
    const reason = args.slice(1).join(" ");
    const chan = message.guild.channels.cache.get("744913294715781130");
    const reasonn = reason ? reason : "Unspecified";
    if (warned.bot) {
      sendError("You cannot warn bot!", message.channel);
    } else {
      const emb = new MessageEmbed()
        .setAuthor(
          `${warned.username} has been warned!`,
          warned.displayAvatarURL()
        )
        .setDescription(`Reason: ${reasonn}`);
      message.channel.send(emb);
      const embe = new MessageEmbed()
        .setAuthor("Your Another Logs", message.guild.iconURL())
        .setColor("RED")
        .addField("Type", "Warn")
        .addField("Reason", reasonn)
        .addField("Member", warned.tag)
        .addField("Moderator", message.author.tag)
        .setTimestamp();
      chan.send(embe);
    }
  },
};
