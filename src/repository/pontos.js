const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const differenceToTime = (difference) => {
  const hours = Math.floor(difference / 3600000);
  const minutes = Math.floor((difference - hours * 3600000) / 60000);
  const seconds = Math.floor(
    (difference - hours * 3600000 - minutes * 60000) / 1000
  );
  return `${hours}h ${minutes}m ${seconds}s`;
};

const getDifference = (time1, time2, arg) => {
  const difference = time1 - time2;
  if (arg === "-n") {
    return difference;
  }
  return differenceToTime(difference);
};

class PontoIndividual {
  constructor({ author, timeStart, message = null, timeEnd = null }) {
    this.author = author;
    this.timeStart = new Date(timeStart ? timeStart : new Date());
    this.timeEnd = timeEnd;
    this.message = message;
  }

  getDate() {
    return this.timeStart.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo"
    });
  }

  getTimeStart() {
    return this.timeStart.toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo"
    });
  }

  getTimeEnd() {
    if (!this.timeEnd) return "Em Serviço...";
    return this.timeEnd.toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo"
    });
  }

  getTotalHours() {
    if (!this.timeEnd) return " ... ";
    return getDifference(this.timeEnd, this.timeStart);
  }

  async getOut() {
    if (this.timeEnd) return;
    const sixHours = 21600000;
    this.timeEnd = new Date();
    const diference = getDifference(this.timeEnd, this.timeStart, "-n");
    await prisma.r030pon.update({
      where: {
        MESSID: this.message.id
      },
      data: {
        DATSAI: this.timeEnd,
        TRATOT: diference
      }
    });

    if (diference > sixHours) {
      return this.message.react("🚨");
    }

    this.message.react("✅");
  }

  async setMessage(message, authorId) {
    this.message = message;
    await prisma.r030pon.create({
      data: {
        CADFUN: authorId,
        DATENT: this.timeStart,
        DATSAI: null,
        TRATOT: null,
        MESSID: message.id,
        CHATID: message.channelId
      },
      select: {
        MESSID: true
      }
    });
  }

  async getMessage() {
    return this.message;
  }
}

class Pontos {
  constructor() {
    this.pontos = new Map();
  }

  async start(client) {
    this.client = client;

    const pontosAbertos = await prisma.r030pon.findMany({
      where: {
        DATSAI: null
      },
      select: {
        MESSID: true,
        CHATID: true,
        CADFUN: true,
        DATENT: true
      }
    });

    pontosAbertos.forEach(async (ponto) => {
      const channel = await client.channels.fetch(ponto.CHATID);
      const message = await channel.messages.fetch(ponto.MESSID);

      const pontoIndividual = new PontoIndividual({
        author: message.author,
        timeStart: ponto.DATENT,
        message: message
      });
      this.pontos.set(ponto.CADFUN, pontoIndividual);
    });
  }

  open(author) {
    const ponto = new PontoIndividual({ author });
    this.pontos.set(author.id, ponto);
    return ponto;
  }

  get(id, msm) {
    return this.pontos.get(id);
  }
}

module.exports = new Pontos();
