/**
 *
 * @param {*} client
 * @param {*} msg
 * @param {[id mensagem, tempo inicio, tempo fim]} args
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { PontoIndividual } = require("../repository/pontos");
const header = require("../client/components/header.simple");

module.exports = async (client, msg, [MESSID, CALCULAR]) => {
  try {
    await msg.delete();

    const channel = await client.channels.fetch(msg.channelId);
    const message = await channel.messages.fetch(MESSID);

    const ping = header(message, true);

    const qtd = await prisma.r030pon.findFirst({
      where: {
        MESSID: MESSID
      }
    });

    const date = new Date(qtd.DATSAI);

    let ponto = await prisma.r030pon.update({
      where: {
        MESSID: MESSID
      },
      data: {
        DATSAI: new Date(date.getTime() + CALCULAR * 60 * 1000),
        TRATOT: date.getTime() + CALCULAR * 60 * 1000
      }
    });

    const repo = new PontoIndividual({
      author: message.author,
      timeStart: ponto.DATENT,
      timeEnd: ponto.DATSAI,
      message: message
    });

    const end = ping.addFields(
      { name: "Data do Ponto:", value: repo.getDate() },
      { name: "Horário de entrada:", value: repo.getTimeStart(), inline: true },
      { name: "Horário de Saída:", value: repo.getTimeEnd(), inline: true },
      { name: "Total de Horas:", value: repo.getTotalHours(), inline: true }
    );

    message.edit({ embeds: [message.embeds[0], end] });
    message.react("✍️");
  } catch (error) {
    const ping = header();

    const start = ping.addFields({
        name: "Nome:",
        value: `<@${msg.author.id}> Oops! Algo deu errado...`
      });
  
      const _msg = await msg.channel.send({ embeds: [start] });
      _msg.react("❌");
  
      setTimeout(() => _msg.delete(), 15000);

  }
};
