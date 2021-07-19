const { adminId } = require("../../Database/client.json");
const sendError = require("../../Database/error");
module.exports = {
  name: "set-status",
  aliases: ["status", "ss"],
  description: "Set bot status",
  usage: ["[set-status] [online|dnd|invisible|idle]"],
  cooldown: 15,
  async execute(message, args) {
    const status = args[0];
    if (!message.author.id == adminId)
      return sendError(
        "Hanya Owner yang dapat menggunakan ini.",
        message.channel
      );
    const client = message.client;
    if (!args.length)
      return sendError(
        "Arguments tidak ada! Contoh Perintah: [set-status] [online|dnd|invisible|idle]",
        message.channel
      );
    switch (status) {
      case "online":
        await client.user.setStatus("online");
        message.reply(
          "<:now_online:798001206936993795> Status diganti ke Online!"
        );
        break;
      case "dnd":
        await client.user.setStatus("dnd");
        message.reply("<:now_dnd:798001177529942026> Status diganti ke DND!");
        break;
      case "invisible":
        await client.user.setStatus("invisible");
        message.reply(
          "<:now_offline:794918750360436757> Status diganti ke Invisible!"
        );
        break;
      case "idle":
        await client.user.setStatus("idle");
        message.reply("<:now_idle:798001140146503680> Status diganti ke Idle!");
        break;
      default:
        sendError("Format tidak valid", message.channel);
        break;
    }
  },
};
