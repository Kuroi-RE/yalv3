const chalk = require("chalk");
const { prefix } = require("../Database/client.json");
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    const sol = `
    ${chalk.red("====================================")}
    =  ${chalk.blue("RUNNING THE BOTS")}            
    =  ${chalk.green.bold("BOT READYY")}
    =  ${chalk.green.bold("WELCOME TO DISCORD")}            
    ${chalk.red("====================================")}
    `;
    const activityList = [
      "Another Life Bots V3",
      "Feat Xyura",
      `${prefix}help for commands list`,
    ];
    // Create function
    function bots() {
      let activity =
        activityList[Math.floor(Math.random() * activityList.length)];
      client.user.setActivity(activity, { type: "LISTENING" });
    }
    setInterval(() => {
      bots();
    }, 12000);
    console.log(sol);
  },
};
