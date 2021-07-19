const {} = require("discord.js");
const { adminId } = require("../../Database/client.json");
module.exports = {
  name: "set-avatar",
  aliases: ["sp", "set-pfp"],
  description: "Set new pfp for bot",
  usage: ["[new|dafult] [url|nourl]"],
  cooldown: 30,
  async execute(message, args) {
    const url = args[1];
    const client = message.client;
    if (!message.author.id == adminId)
      return message.reply("You are not Admin!");

    if (!args.length)
      return message.reply(
        "Missing Arguments! For Example: [new|dafult] [url|nourl]"
      );

    if (args[0] == "new") {
      if (!url.endsWith(".jpg" || ".png" || ".jpeg"))
        return message.reply("Sorry, Invalid format!");
      try {
        message
          .reply("Please wait, Uploading Avatar!")
          .then((message) => message.delete({ timeout: 6000 }));
        await client.user.setAvatar(url);
        message.reply("Successfully changed bot's Avatar!");
      } catch (Error) {
        message.channel.send(Error);
      }
    } else if (args[0] == "reset") {
      try {
        await client.user
          .setAvatar(
            "https://cdn.discordapp.com/attachments/811050641589665813/864496538118389760/profile.jpg"
          )
          .then((u) => message.reply("Reseted Profile!"))
          .catch((Error) => message.reply(Error));
      } catch (Error) {
        message.reply(Error);
      }
    }
  },
};
