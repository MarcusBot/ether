const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
    let mesaj = args.join(' ');
    if (!mesaj) return message.channel.send(`${basarisiz} Lütfen çekilişin ödülünü belirtin.`);

  let kisiler = [
    "lookie",
    "guaqar"
    ]
  var kisilers = kisiler[Math.floor(Math.random(1) * kisiler.length)]
    const embedcekilis = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(`Çekiliş Ödülü`, mesaj)
    .addField(`Çekiliş Kazananı`, kisilers)
    message.channel.send(embedcekilis);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['giveaway'],
  permLevel: 0
};

exports.help = {
  komut: 'çekiliş',
  aciklama: 'Sunucuda çekiliş yapar.',
  kullanim: 'çekiliş [ödül]'
};