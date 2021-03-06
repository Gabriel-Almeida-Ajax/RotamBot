const PontosRepository = require("../repository/pontos");
const header = require("../client/components/header");

module.exports = async (client, msg, args) => {
  try {
    msg.delete();
    const ping = header(msg)
    const has = PontosRepository.pontos.has(msg.author.id);
    if (has) {
      const ponto = PontosRepository.get(msg.author.id, 'module');
      ponto.getOut();

      const end = ping.addFields(
        { name: "Militar:", value: `<@${msg.author.id}>`, inline: true },
        { name: "Data do Ponto:", value: ponto.getDate(), inline: true },
        { name: "Horário de entrada:", value: ponto.getTimeStart() },
        { name: "Horário de Saída:", value: ponto.getTimeEnd(), inline: true },
        { name: "Total de Horas:", value: ponto.getTotalHours(), inline: true }
      );

      ponto.message.edit({ embeds: [end] });
      
      return PontosRepository.pontos.delete(msg.author.id);
    }

    const ponto = PontosRepository.open(msg.author);
    const start = ping.addFields(
      { name: "Nome:", value: `<@${msg.author.id}>`, inline: true },
      { name: "Data do Ponto:", value: ponto.getDate(), inline: true },
      { name: "Horário de entrada:", value: ponto.getTimeStart() },
      { name: "Horário de Saída:", value: ponto.getTimeEnd(), inline: true },
      { name: "Total de Horas:", value: ponto.getTotalHours(), inline: true }
    );

    ponto.setMessage(
      await msg.channel.send({ embeds: [start] }),
      msg.author.id
    );
  } catch (error) {
    console.log(error);
  }
};
