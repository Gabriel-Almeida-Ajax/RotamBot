module.exports = async (client, msg, args = []) => {
  const topicName = args.join(" ");

  if(!topicName) {
    await msg.react("❌");

    setTimeout(() => {
      msg.delete();
    }, 5000)
    return 
  }
  
  const _msg = await msg.startThread({
    name: topicName,
    reason: "Solicitação de ponto",
    icon: "https://i.imgur.com/QQZQZ.png",
  })

  _msg.send({
    content: `<@${msg.author.id}>`,
  })
  
  msg.delete();
};
