const { MessageEmbed } = require("discord.js");
const sendError = require("../../Database/error");
const role = {
  giveaway: "750397476476813362",
  pedofil: "744924147292962916",
  fuckboy: "744924152296898591",
  sadboy: "744923764935884890",
  sadgirl: "744924030359961640",
  notify: "749999044721508392",
  ads: "745227013387976784",
  noads: "768021798427557888",
};

module.exports = {
  name: "claim-roles",
  aliases: ["claim", "role"],
  usage: ["[role]"],
  description: "Claim roles secara gratis.",
  async execute(message, args) {
    if (message.channel.id !== "755771083575001108") {
      message.delete();
      message
        .reply(
          "Bukan disini tempat claimnya!\nkesini yaa! <#755771083575001108>"
        )
        .then((m) => m.delete({ timeout: 6000 }));
      return;
    }
    if (!args.length) {
      sendError(
        "Arguments tidak cukup! Gunakan perintah .help claim-roles untuk melihat contoh",
        message.channel
      );
    }
    const roleName = args[0];
    const members = message.member;
    const msg = new MessageEmbed()
      .setTitle("<a:verify:799539329235025923> Roles added")
      .setColor("GREEN")
      .setFooter(`Diclaim oleh ${message.author.username}`);

    switch (roleName) {
      case "giveaway":
        await members.roles.add(role.giveaway);
        message.channel.send(
          msg.setDescription("Role **Giveaway** berhasil ditambahkan!")
        );
        break;
      case "pedofil":
        await members.roles.add(role.pedofil);
        message.channel.send(
          msg.setDescription("Role **Pedofil** berhasil ditambahkan!")
        );
        break;
      case "fuckboy":
        await members.roles.add(role.fuckboy);
        message.channel.send(
          msg.setDescription("Role **FuckBoy** berhasil ditambahkan!")
        );
        break;
      case "sadboy":
        await members.roles.add(role.sadboy);
        message.channel.send(
          msg.setDescription("Role **SadBoy** berhasil ditambahkan!")
        );
        break;
      case "sadgirl":
        await members.roles.add(role.sadgirl);
        message.channel.send(
          msg.setDescription("Role **SadGirl** berhasil ditambahkan!")
        );
        break;
      case "notify":
        await members.roles.add(role.notify);
        message.channel.send(
          msg.setDescription("Role **Notify** berhasil ditambahkan!")
        );
        break;
      case "ads":
        await members.roles.add(role.ads);
        message.channel.send(
          msg.setDescription("Role **Ads** berhasil ditambahkan!")
        );
        break;
      case "noads":
        await members.roles.add(role.noads);
        message.channel.send(
          msg.setDescription("Role **No Ads** berhasil ditambahkan!")
        );
        break;
      default:
        break;
    }
  },
};
