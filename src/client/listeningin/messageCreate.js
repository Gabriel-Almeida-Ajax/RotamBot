module.exports = {
  event: "messageCreate",
  handler: (msg, client) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;

    const prefix = process.env.PREFIX ?? "!";
    const messageArray = msg.content.split(" ");
    const command = messageArray[0].replace(prefix, "");
    const args = messageArray.slice(1);
    try {
      const exec = require(`../../commands/${command}.js`);
      exec(client, msg, args);
    } catch (error) {
      // console.log(error);
    }
  }
};
