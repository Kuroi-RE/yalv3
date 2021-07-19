const request = require("request");

module.exports = {
  name: "chat",
  description: "Chat dengan bot",
  usage: ["[anything]"],
  async execute(message, args) {
    const msg = args.slice(0).join(" ");
    request(
      `https://api.simsimi.net/v1/?text=${msg}&lang=id`,
      function (error, response, body) {
        if (!error & (response.statusCode === 200)) {
          const res = JSON.parse(body);
          message
            .reply(res.success)
            .catch((Error) => message.channel.send(Error));
        }
      }
    );
  },
};
