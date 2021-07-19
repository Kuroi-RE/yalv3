const { MessageEmbed } = require("discord.js");

/**
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
  let embed = new MessageEmbed()
    .setTitle("<:warning:865590180831428608> Syntax Error")
    .setColor("RED")
    .setDescription(`${text}`)
    .setThumbnail("https://i.giphy.com/media/TqiwHbFBaZ4ti/giphy.webp");
  await channel.send(embed);
};
