const filter = require("package-here");

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (
    filter.some((substring) =>
      message.content.includes(substring.toLowerCase())
    )
  ) {
    await message.delete();
    message
      .reply("Dont toxic in here!")
      .then((m) => m.delete({ timeout: 8000 }));

    return;
  }
});
