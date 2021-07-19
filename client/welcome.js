module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    let charList = [
      `Welcome ${member} [${member.tag}], Let's hangout with other members!`,
      `${member} [${member.tag}] Just joined Server! Can anyone tell him/her the rules here?`,
      `Welcome ${member} [${member.tag}] You can read the rules of this server in the channel rules!`,
      `Welcome ${member} [${member.tag}], I hope you are happy on this server!`,
    ];
    const channelID = "744885700532371588";
    let guild = client.guilds.cache.get("744885612460507145");
    const channel = guild.channels.cache.get(channelID);
    const finalMsg = charList[Math.floor(Math.random() * charList.length)];
    channel.send(finalMsg);
  });

  client.on("guildMemberRemove", (member) => {
    const channelID = "861983412311294003";
    const guildself = client.guilds.cache.get("761313184107724810");
    const channel = guildself.channels.cache.get(channelID);
    channel.send(member.tag + " Just leaved the Server");
  });
};
