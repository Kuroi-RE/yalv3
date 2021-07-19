const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "copyright",
  aliases: "source-code",
  description: "Memberikan informasi tentang kode bot",
  async execute(message, args) {
    const embed = new MessageEmbed()
      .setAuthor("Xyura Source code")
      .setColor("RED")
      .setDescription(
        `This bot code is not made by myself, I am looking for code ideas from other people such as music commands, I searched digithub and modified it! If you want to know the source code of the commands please contact the Owner!`
      )
      .setFooter(`Thanks for using this bot:)`);
    message.channel.send(embed).then((msg) => msg.delete({ timeout: 12000 }));
  },
};
