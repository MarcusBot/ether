const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
let kanal = JSON.parse(fs.readFileSync("./././otorol.json", "utf8"));
module.exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  
let rol = args.slice(0).join('+');
  const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
  if(!rol) return message.channel.send(`${basarisiz} Lütfen otorol yapmak istediğiniz rolü yazınız. \nÖrnek: **v/oto-rol @rol**`)
  db.set(`otorol_${message.guild.id}`,rol)
       if(!kanal[message.guild.id]){
      
        kanal[message.guild.id] = {
            rol: rol
        };
      }
    fs.writeFile("./././otorol.json", JSON.stringify(kanal), (err) => {
        console.log(err)
    })
      const basarili = client.emojis.find(emoji => emoji.name === "basarili");
  message.channel.send(`${basarili} Otorol başarılı bir şekilde ${rol} olarak ayarlandı.`)
  
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['otorol-ayarla'],
    permLevel: `0`
};

exports.help = {
    komut: 'oto-rol',
    aciklama: 'Giriş çıkış kanalını ayarlar.',
    kullanim: 'oto-rol [rol]'
};