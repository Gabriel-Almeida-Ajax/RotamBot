module.exports = async (client, msg, [ammount = 100]) => {
  try {
    await msg.delete();
    const channel = await client.channels.fetch(msg.channelId);
    await channel.bulkDelete(ammount, true);
  } catch (error) {
    console.log(error);
  }
};
