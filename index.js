const Discord = require("discord.js");
const fs = require("fs");
const { MessageMenu, MessageMenuOption } = require("discord-buttons");
const welcome = require("./client/welcome");
const msgListen = require("./client/listener");
const sendError = require("./Database/error.js");

const { prefix, token, name } = require("./Database/client.json");

const client = new Discord.Client();
require("discord-buttons")(client);
client.queue = new Map();
// CLIENT //
welcome(client);
msgListen(client);

// EVent Files //

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type === "dm") {
    return sendError(
      "Saya tidak bisa menerima perintah ini didalam Direct Message!",
      message.channel
    );
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return sendError(
        "Perintah ini hanya bisa dilakukan oleh role tertentu.",
        message.channel
      );
    }
  }

  if (command.args && !args.length) {
    let reply = `kamu tidak memberikan sebuah argumen, ${message.author}!`;

    if (command.usage) {
      reply += `\nPenggunaan yang benar: \`${prefix}${command.name} ${command.usage}\``;
    }

    return sendError(reply, message.channel);
  }

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return sendError(
        `Mohon mengunggu selama ${timeLeft.toFixed(
          1
        )} Untuk melakukan perintah \`${command.name}\` kembali.`,
        message.channel
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    sendError(
      "Perintah mengembalikan kode Error, Mohon melapor ke Owner!",
      message.channel
    );
  }
});

const role = {
  giveaway: "750397476476813362",
  pedofil: "744924147292962916",
  fuckboy: "744924152296898591",
  sadboy: "744923764935884890",
  sadgirl: "744924030359961640",
  // notify: "749999044721508392",
  // ads: "745227013387976784",
  // noads: "768021798427557888",
};

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.author.id === "459277813506244618") return;
  if (message.content.startsWith("ramrole")) {
    const role1 = new MessageMenuOption()
      .setLabel("Giveaway")
      .setValue("giveaway")
      .setDescription("role untuk notif giveaway.");
    // .setEmoji("woman_red_haired");
    const role2 = new MessageMenuOption()
      .setLabel("Pedofil")
      .setValue("pedofil")
      .setDescription("Role untuk pedofil");
    // .setEmoji("man_red_haired");
    const role3 = new MessageMenuOption()
      .setLabel("Fuckboy")
      .setValue("fuckboy")
      .setDescription("Role untuk Fuckboy!");
    // .setEmoji("man_red_haired");
    const role4 = new MessageMenuOption()
      .setLabel("Sadboy")
      .setValue("sadboy")
      .setDescription("Role untuk Sadboy!");
    // .setEmoji("man_red_haired");
    const role5 = new MessageMenuOption()
      .setLabel("Sadgirl")
      .setValue("sadgirl")
      .setDescription("Role untuk Sadgirl!");
    // .setEmoji("man_red_haired");
    const menu = new MessageMenu()
      .setID("menu")
      .setPlaceholder("Choose your Roles!")
      .addOption(role1)
      .addOption(role2)
      .addOption(role3)
      .addOption(role4)
      .addOption(role5);
    const guild = client.guilds.cache.get("744885612460507145");
    const channel = guild.channels.cache.get("871373544121053195");
    const act = new Discord.MessageEmbed()
      .setAuthor(guild.name + " Role Menu")
      .setDescription(
        "Ini adalah menu dari role gratis yang diberikan, silahkan pilih apa yg ingin kamu pilih!"
      );
    channel.send(act, menu);

    client.on("clickMenu", async (menu) => {
      switch (menu.values[0]) {
        case "giveaway":
          menu.reply.defer();
          await menu.clicker.member.roles.add(role.giveaway);
          menu.channel
            .send(`${menu.clicker.user} Choose a new role! Giveaway.`)
            .then((m) => m.delete({ timeout: 12000 }));
          break;
        case "pedofil":
          menu.reply.defer();
          await menu.clicker.member.roles.add(role.pedofil);
          menu.channel
            .send(`${menu.clicker.user} Choose a new role! Pedofil.`)
            .then((m) => m.delete({ timeout: 12000 }));
          break;
        case "fuckboy":
          menu.reply.defer();
          await menu.clicker.member.roles.add(role.fuckboy);
          menu.channel
            .send(`${menu.clicker.user} Choose a new role! Fuckboy.`)
            .then((m) => m.delete({ timeout: 12000 }));
          break;
        case "sadboy":
          menu.reply.defer();
          await menu.clicker.member.roles.add(role.sadboy);
          menu.channel
            .send(`${menu.clicker.user} Choose a new role! Sadboy.`)
            .then((m) => m.delete({ timeout: 12000 }));
          break;
        case "sadgirl":
          menu.reply.defer();
          await menu.clicker.member.roles.add(role.sadgirl);
          menu.channel
            .send(`${menu.clicker.user} Choose a new role! Sadgirl.`)
            .then((m) => m.delete({ timeout: 12000 }));
          break;
        default:
          menu.reply.defer();
          break;
      }
    });
  }
});

client.login(token);
