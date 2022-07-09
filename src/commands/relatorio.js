const { PrismaClient, Prisma } = require("@prisma/client");
const {
  differenceToTime,
  getYesterday,
  getTomorrow
} = require("../utils/datetime");

const prisma = new PrismaClient();
const header = require("../client/components/header");

module.exports = async (
  client,
  msg,
  [START = getYesterday(), END = getTomorrow()]
) => {
  try {
    START = new Date(START);
    END = new Date(END);
    msg.delete();
    const sql = await prisma.$queryRaw(Prisma.sql`
        SELECT "CADFUN", SUM("TRATOT") "TRATOT" FROM r030pon
          WHERE "DATENT" BETWEEN ${new Date(START)} AND ${new Date(END)}
          AND "DATSAI" IS NOT NULL
        GROUP BY "CADFUN"
      `);

    const start = header(msg, true);

    sql.forEach(async (ponto) => {
      start.addFields(
        { name: "Nome:", value: `<@${ponto.CADFUN}>` },
        {
          name: "Data do Fechamento:",
          value: new Date().toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo"
          }),
          inline: true
        },
        {
          name: "Total de Horas:",
          value: differenceToTime(ponto.TRATOT),
          inline: true
        }
      );
    });

    const _msg = await msg.channel.send({
      content: `${START.toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo"
      })} - ${END.toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo"
      })}`,
      embeds: [start]
    });
    _msg.react("✅");
  } catch (error) {
    console.log(error);
  }
};
