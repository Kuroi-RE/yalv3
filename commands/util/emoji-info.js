const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emoji-info",
  aliases: ["emoji", "ei"],
  description: "Show info of emoji",
  usage: ["[emoji name]"],
  execute(message, args) {
    if (!args.length) return message.reply("Cannot find the emoji");
    const emoji = message.guild.emojis.cache.find(
      (emoji) => emoji.name == args[0]
    );
    if (!emoji) {
      message.reply("Invalid format!");
    }
    const embed = new MessageEmbed()
      .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.png`, {
        size: 1024,
        dynamic: true,
      })
      .setAuthor("EMOJI INFO")
      .setDescription("Ini info yang saya dapat dari emoji yang anda berikan.")
      .addField(`EMOJI ID:`, `\`\`\`${emoji.id}\`\`\``)
      .addField(`EMOJI TAG:`, `\`\`\`${emoji}\`\`\``)
      .addField(`EMOJI ANIMATED:`, `\`\`\`${emoji.animated}\`\`\``);
    message.channel.send(embed);
  },
};
