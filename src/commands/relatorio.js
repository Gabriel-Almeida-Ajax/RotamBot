const PontosRepository = require("../repository/pontos");

const { MessageEmbed } = require("discord.js");

module.exports = async (client, msg, args) => {
  try {
    msg.delete();
    const logo =
      "https://seeklogo.com/images/R/ROTAM_-_PMGO-logo-E1242CE8B6-seeklogo.com.png";
    const ping = () =>
      new MessageEmbed()
        .setColor("#f7b931")
        .setAuthor({
          name: "ROTAM - Sistema de Ponto",
          iconURL: logo,
          url: "https://discord.js.org"
        })
        .setThumbnail(logo);

    const ponto = PontosRepository.open(msg.author);
    const start = ping()
      .addFields(
        { name: "Nome:", value: `<@${msg.author.id}>` },
        { name: "Data do Fechamento:", value: ponto.getDate(), inline: true },
        {
          name: "Total de Horas:",
          value: ponto.getTotalHours() + " 👌",
          inline: true
        }
      )
      .addFields(
        { name: "Nome:", value: `<@${msg.author.id}>` },
        { name: "Data do Fechamento:", value: ponto.getDate(), inline: true },
        {
          name: "Total de Horas:",
          value: ponto.getTotalHours() + " 😢",
          inline: true
        }
      )
      .addFields(
        { name: "Nome:", value: `<@${msg.author.id}>` },
        { name: "Data do Fechamento:", value: ponto.getDate(), inline: true },
        {
          name: "Total de Horas:",
          value: ponto.getTotalHours() + " 👌",
          inline: true
        }
      )
      .addFields(
        { name: "Nome:", value: `<@${msg.author.id}>` },
        { name: "Data do Fechamento:", value: ponto.getDate(), inline: true },
        {
          name: "Total de Horas:",
          value: ponto.getTotalHours() + " 👌",
          inline: true
        }
      );

    ponto.setMessage(await msg.channel.send({ embeds: [start] }));
  } catch (error) {
    console.log(error);
  }
};
