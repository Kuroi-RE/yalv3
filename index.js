const Discord = require("discord.js");
const fs = require("fs");
const welcome = require("./client/welcome");
const msgListen = require("./client/listener");
const sendError = require("./Database/error.js");
const request = require("request");

const { prefix, token, name } = require("./Database/client.json");

const client = new Discord.Client();

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

client.login(token);
