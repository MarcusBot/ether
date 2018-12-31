const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');
let kanal = JSON.parse(fs.readFileSync("././jsonlar/gc.json", "utf8"));

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
      const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
        message.channel.send(`${basarisiz} Lütfen giriş-çıkış fotoğrafı atılacak kanalı seçiniz. \nÖrnek: **v/giriş-çıkış-ayarla <#kanal>**`)
        return
    }

    if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            gkanal: channel.id
        };
    }
   db.set(`gkanal.${message.guild.id}`, channel.name)
    fs.writeFile("././jsonlar/gc.json", JSON.stringify(kanal), (err) => {
        console.log(err)
    })
  
  const basarili = client.emojis.find(emoji => emoji.name === "basarili");
    message.channel.send(`${basarili} Giriş çıkış mesajlarınız artık ${channel} adlı kanala gönderilecektir.`)
  

};
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['giriş-çıkış'],
    permLevel: `2`
};

exports.help = {
    komut: 'giriş-çıkış-ayarla',
    aciklama: 'Giriş çıkış kanalını ayarlar.',
    kullanim: 'giriş-çıkış-ayarla <#kanal>'
};