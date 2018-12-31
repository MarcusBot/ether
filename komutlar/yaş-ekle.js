const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
    const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
  if (!args[0]) return message.channel.send(`${basarisiz} Lütfen yaşınızı belirtiniz! \nÖrnek: **v/yaş-ekle 100**`);
  if (isNaN(args[0])) return message.channel.send(`${basarisiz} Lütfen geçerli bir sayı giriniz!`)
 db.set(`yas_${message.author.id}`, args[0])
  const basarili = client.emojis.find(emoji => emoji.name === "basarili");
  message.channel.send(`${basarili} Yaşınız başarılı bir şekilde kaydedilmiştir.`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  komut: 'yaş-ekle',
  aciklama: 'Yaşınızı girersiniz.',
  kullanim: 'yaş-ekle'
};