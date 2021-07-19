const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "report",
  description: "Laporkan sebuah bug/error dari bot.",
  cooldown: 28800,
  async execute(message, args) {
    const text = args.slice(0).join(" ");
    const client = message.client;

    if (!text) {
      message.reply("Apa yang ingin kamu laporkan?");
      return;
    }
    const channel = client.guilds.cache
      .get("761313184107724810")
      .channels.cache.get("866340807342292992");
    const embed = new MessageEmbed()
      .setTitle("<:warning:865590180831428608> Laporan")
      .setDescription(text)
      .setFooter(`From ${message.author.tag}`);
    await channel.send(embed);

    message.reply("Laporanmu sudah dikirim!");
  },
};
