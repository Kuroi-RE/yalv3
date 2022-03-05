const chalk = require("chalk");
const { Client } = require("discord.js")
const { prefix } = require("../Database/client.json");
module.exports = {
  name: "ready",
  once: true,
   /**
     * 
     * @param {Client} client
     */
  execute(client) {
    client.user.setActivity("Ended service at April!", {type: "WATCHING"});
    client.user.setStatus("dnd");
    console.log("Connected");
  },
};
