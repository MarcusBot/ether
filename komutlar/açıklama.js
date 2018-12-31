const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
    const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
  let mesaj = args.join(" ").slice();
  if (!mesaj) return message.channel.send(`${basarisiz} Açıklama kısmınıza ne yazmak istiyorsanız lütfen belirtin. \nÖrnek: **v/açıklama Normal bir açıklama!**`);
 db.set(`aciklama_${message.author.id}`, mesaj)
  const basarili = client.emojis.find(emoji => emoji.name === "basarili");
  message.channel.send(`${basarili} Açıklama mesajınız başarılı bir şekilde kaydedilmiştir.`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  komut: 'açıklama',
  aciklama: 'Açıklama eklersiniz.',
  kullanim: 'açıklama'
};