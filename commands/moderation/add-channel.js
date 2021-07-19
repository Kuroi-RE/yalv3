const {} = require("discord.js");
const sendError = require("../../Database/error");

module.exports = {
  name: "add-channel",
  description: "Menambah sebuah saluran Baru",
  permissions: ["MANAGE_CHANNELS"],
  guildOnly: true,
  usage: ["[nama] [type] [idCategory]"],
  cooldown: 60,
  async execute(message, args) {
    const { channel, guild } = message;
    const newChannel = args[0];
    const typee = args[1];
    const category = args[2];
    if (!newChannel)
      return sendError(
        "Berikan sebuah nama channel baru! Contoh perintah: .add-channel [namachannel] [voice|text] [idCategory]",
        message.channel
      );
    if (isNaN(category)) {
      sendError("Argumen harus berupa nomor [ID CATEGORY]", message.channel);
    }
    if (!isNaN(category)) {
      await guild.channels
        .create(newChannel, {
          type: typee,
          parent: category,
        })
        .then((chn) => {
          message.reply(
            `<a:verify:799539329235025923> Channel baru telah dibuat! [ ${chn} ]`
          );
        });
    }
  },
};
