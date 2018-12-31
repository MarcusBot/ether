const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
  if (!args[0]) return message.channel.send('Reklam engel özelliğini açmak veya kapatmak için `aç` veya `kapat` yazınız. \nÖrnek: **v/reklam-engel [aç-kapat]**')
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    db.set(`reklam_${message.guild.id}`, 'Açık').then(i => {
      const basarili = client.emojis.find(emoji => emoji.name === "basarili");
      message.channel.send(`${basarili} Reklam engelleyici **${message.guild.name}** adlı sunucuda başarılı bir şekilde açıldı! \nUyarı: **Üyeleri yasakla yetkisi olan kişilerin reklamları engellenmiyecektir**`)
    })
  }
  if (args[0] == 'kapat') {
    db.set(`reklam_${message.guild.id}`, 'Kapalı').then(i => {
      const basarili = client.emojis.find(emoji => emoji.name === "basarili");
      message.channel.send(`${basarili} Reklam engelleyici **${message.guild.name}** adlı sunucuda başarılı bir şekilde kapatıldı! Artık bu sunucuda reklam yapılabiliyor.`)
    })
  }

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  komut: 'reklam-engel',
  aciklama: 'reklamengel',
  kullanim: 'reklam-engel <aç-kapat>'
};