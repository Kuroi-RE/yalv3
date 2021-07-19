const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "my-profile",
  aliases: ["profile"],
  cooldown: 10,
  description: "Melihat profile",
  async execute(message) {
    const self = message.author;

    const isAdmin = message.member.hasPermission("ADMINISTRATOR", {
      checkAdmin: true,
    })
      ? message.member.hasPermission("ADMINISTRATOR", { checkAdmin: true })
      : false;
    const embed = new MessageEmbed()
      .addField(`Nama`, self.username)
      .addField("ID", self.id)
      .addField("Admin?", isAdmin)
      .setThumbnail(self.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor(message.member.displayHexColor || "RANDOM");
    message.channel.send(embed);
  },
};
