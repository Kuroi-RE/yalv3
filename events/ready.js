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
   
    const sol = `
    ${chalk.red("====================================")}
    =  ${chalk.blue("RUNNING THE BOTS")}            
    =  ${chalk.green.bold("BOT READYY")}
    =  ${chalk.green.bold("WELCOME TO DISCORD")}            
    ${chalk.red("====================================")}
    `;
    client.user.setActivity("Ended service at April!", {type: "WATCHING"})
    client.user.setStatus("dnd")
    console.log(sol);
  },
};
