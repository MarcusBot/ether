const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
   const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
  let mesaj = args.join(" ").slice();
  if (!mesaj) return message.channel.send(`${basarisiz} Lütfen etiketinize birşey belirtiniz.`);
 db.set(`etiket_${message.author.id}`, mesaj)
  const basarili = client.emojis.find(emoji => emoji.name === "basarili");
  message.channel.send(`${basarili} Etiketiniz kaydedildi.`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  komut: 'etiket',
  aciklama: 'Etiket eklersiniz.',
  kullanim: 'etiket'
};