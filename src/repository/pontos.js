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
  constructor({ author }) {
    this.author = author;
    this.timeStart = new Date();
    this.timeEnd = null;
    this.message = null;
  }

  getDate() {
    return this.timeStart.toLocaleDateString();
  }

  getTimeStart() {
    return this.timeStart.toLocaleTimeString();
  }

  getTimeEnd() {
    if (!this.timeEnd) return "Em Serviço...";
    return this.timeEnd.toLocaleTimeString();
  }

  getTotalHours() {
    if (!this.timeEnd) return " ... ";
    return getDifference(this.timeEnd, this.timeStart);
  }

  getOut() {
    if (this.timeEnd) return;
    this.timeEnd = new Date();
  }

  setMessage(message) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }
}

class Pontos {
  constructor() {
    this.pontos = new Map();
  }

  open(author) {
    const ponto = new PontoIndividual({ author });
    this.pontos.set(author.id, ponto);
    return ponto;
  }

  get(id) {
    return this.pontos.get(id);
  }

  close(id) {
    this.get(id).getOut();
  }
}

module.exports = new Pontos();
