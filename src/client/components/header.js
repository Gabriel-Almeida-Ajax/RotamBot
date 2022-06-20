const { MessageEmbed } = require("discord.js");

const logo =
  "https://cdn.discordapp.com/attachments/968635094984163398/987385222247116810/unnamed.jpg";
const header = (msg, withLogo) =>
  new MessageEmbed()
    .setColor("#f7b931")
    .setAuthor({
      name: "EB - Sistema de Ponto",
      iconURL: logo,
      url: "https://exercitobrasileiromt.wixsite.com/exercitobrasileiro"
    })
    .setThumbnail(withLogo ? logo : msg.author.avatarURL());

module.exports = header;
