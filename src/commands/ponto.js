const PontosRepository = require("../repository/pontos");

const { MessageEmbed } = require("discord.js");

module.exports = async (client, msg, args) => {
  try {
    msg.delete();
    const logo =
      "https://cdn.discordapp.com/attachments/968635094984163398/987385222247116810/unnamed.jpg";
    const ping = () =>
      new MessageEmbed()
        .setColor("#f7b931")
        .setAuthor({
          name: "EB - Sistema de Ponto",
          iconURL: logo,
          url: "https://exercitobrasileiromt.wixsite.com/exercitobrasileiro"
        })
        .setThumbnail(msg.author.avatarURL());

    const has = PontosRepository.pontos.has(msg.author.id);
    if (has) {
      PontosRepository.close(msg.author.id);
      const ponto = PontosRepository.get(msg.author.id);

      const end = ping().addFields(
        { name: "Militar:", value: `<@${msg.author.id}>`, inline: true },
        { name: "Data do Ponto:", value: ponto.getDate(), inline: true },
        { name: "Horário de entrada:", value: ponto.getTimeStart() },
        { name: "Horário de Saída:", value: ponto.getTimeEnd(), inline: true },
        { name: "Total de Horas:", value: ponto.getTotalHours(), inline: true }
      );
      ponto.getMessage().edit({ embeds: [end] });
      return PontosRepository.pontos.delete(msg.author.id);
    }

    const ponto = PontosRepository.open(msg.author);
    const start = ping().addFields(
      { name: "Nome:", value: `<@${msg.author.id}>`, inline: true },
      { name: "Data do Ponto:", value: ponto.getDate(), inline: true },
      { name: "Horário de entrada:", value: ponto.getTimeStart() },
      { name: "Horário de Saída:", value: ponto.getTimeEnd(), inline: true },
      { name: "Total de Horas:", value: ponto.getTotalHours(), inline: true }
    );

    ponto.setMessage(await msg.channel.send({ embeds: [start] }));
  } catch (error) {
    console.log(error);
  }
};
