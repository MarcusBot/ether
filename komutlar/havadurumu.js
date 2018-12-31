const Discord = require('discord.js');
const weather = require("weather-js");
exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':no_entry: UYARI :no_entry:', '`havadurumu` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }

  let mesaj = args.slice(0).join(' ');
    const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
  if (mesaj.length < 1) return message.reply(`${basarisiz} Bir şehir adı girmelisin. \nÖrnek: **/havadurumu Balıkesir**`);
  weather.find({search: mesaj, degreeType: 'C'}, function(err, result) { 
    if (err) message.channel.send({embed: {
color: Math.floor(Math.random() * (0xFFFFFF + 1)),
description: (`Hata Oluştu: ${err}`)

}}); 
    if (!result) {
      message.channel.send({embed: {
color: Math.floor(Math.random() * (0xFFFFFF + 1)),
description: (`Hata: Belirli bir şehir giriniz.`)

}}) 
        return; 
    }
    var current = result[0].current; 
    if (!current) {
        const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
        message.channel.send({embed: {
color: Math.floor(Math.random() * (0xFFFFFF + 1)),
description: (`${basarisiz} Belirli bir şehir giriniz.`)

}}) 
        return; 
    }
  
    var location = result[0].location;   
        message.channel.send(`**${mesaj}** adlı şehirin anlık derecesi; \`${current.temperature} Derece\``);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['hd'],
  permLevel: 0
};

exports.help = {
  komut: 'havadurumu',
  aciklama: 'Adını girdiğiniz şehirin havadurumu bilgilerini gösterir.',
  kullanim: 'havadurumu şehir adı'
};
