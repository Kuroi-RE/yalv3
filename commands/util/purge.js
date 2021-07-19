const sendError = require("../../Database/error");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["clear", "d-mes"],
  description: "Menghapus message",
  usage: ["[total pesan]"],
  permissions: ["MANAGE_MESSAGES"],
  async execute(message, args) {
    const amount = args[0];
    const embed = new MessageEmbed()
      .setDescription(
        "Anda akan menghapus brapa pesan? [Maksimal 99pesan]\nTidak jadi? jawab dengan [close]"
      )
      .setFooter("Waktu konfirmasi 30detik")
      .setAuthor("Konfirmasi Perintah " + message.author.username);
    const filter = (m) => m.author.id === message.author.id;
    // konfirmasi
    if (!amount) {
      message.channel.send(embed).then(() => {
        message.delete({ timeout: 30000 });
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .then(async (message) => {
            message = message.first();
            if (!isNaN(message.content)) {
              if (parseInt(message.content) > 99)
                return message.reply(
                  "Kamu hanya bisa menghapus maksimal 99 Pesan!"
                );
              await message.channel.bulkDelete(parseInt(message.content) + 1);
              message.channel
                .send(
                  `<a:verifv2:797994876633219083> Menghapus ${message.content} Pesan!`
                )
                .then((m) => m.delete({ timeout: 5000 }));
            } else if (message.content.toLowerCase() === "close") {
              message
                .reply("Keluar dari sesi!")
                .then((m) => m.delete({ timeout: 5000 }));
              message.delete();
            }
          });
      });
    } else {
      if (isNaN(amount)) return message.reply("Argumen harus berupa Nomor!");
      if (parseInt(amount) > 99)
        return message.reply("Kamu hanya bisa menghapus maksimal 99 Pesan!");
      await message.channel.bulkDelete(parseInt(amount) + 1);
      message.channel
        .send(`<a:verifv2:797994876633219083> Menghapus ${amount} Pesan!`)
        .then((m) => m.delete({ timeout: 5000 }));
    }
  },
};
