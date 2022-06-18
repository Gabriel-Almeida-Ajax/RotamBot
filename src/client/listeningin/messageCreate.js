const client = require("../ready");

module.exports = {
  event: "messageCreate",
  handler: (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;

    const prefix = process.env.PREFIX ?? "!";
    const messageArray = msg.content.split(" ");
    const command = messageArray[0].replace(prefix, "");
    const args = messageArray.slice(1);
    try {
      if(command === "ponto" || command === "fecharponto") {
        const exec = require(`../../commands/ponto.js`);
        exec(client, msg, args);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
