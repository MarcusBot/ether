const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db');

exports.run = async (client, message, member, guild) => {

 let gc = await JSON.parse(fs.readFileSync("./jsonlar/gc.json"))
 let otorol = await JSON.parse(fs.readFileSync("./otorol.json"))

 const acik  = client.emojis.find(emoji => emoji.name === "ferbacik");
const kapali = client.emojis.find(emoji => emoji.name === "ferbkapali");

 
 let gcs = await db.fetch(`gkanal.${message.guild.id}`)
 let küfürs = await db.fetch(`kufur_${message.guild.id}`)
 let reklams = await db.fetch(`reklam_${message.guild.id}`)
 let otorols = await db.fetch(`otorol_${message.guild.id}`)
 let sayacs = await db.fetch(`sayacSayi_${message.guild.id}`)
 let sayac = await db.fetch(`sayacKanal_${message.guild.id}`).then(i => {
    
 let s;
 if(!gcs) { s = "Giriş kanalı ayarlanmamış" } else { s = gcs }
  
  let o;
  if(!otorols) { o = "Otorol ayarlanmamış" } else { o = otorols }
   
   let k;
   if(!i) { k = "Sayaç kanal ayarlanmamış" } else { k = i }
   
   let j;
   if(!sayacs) { j = "Sayaç sayı ayarlanmamış" } else { j = sayacs}
   
   let r;
   if(!reklams) { r = "Reklam ayarlanmamış" } else { r = reklams }
   
   let kü;
   if(!küfürs) { kü = "Küfür engel ayarlanmamış" } else { kü = küfürs}
   
  
   
 const panel = new Discord.RichEmbed()
.setColor("RANDOM")
 .addField(`Giriş Çıkış Kanalı`, `#${s}`, true)
 .addField(`Otorol`, o, true)
 .addField(`Sayaç Kanal/Sayı`, `<#${k}> / ${j}`, true)
 .addField(`Reklam Engel`, r, true)
 .addField(`Küfür Engel`, kü, true)
 .setFooter(`${message.guild.name} adlı sunucunun ayarları`, message.guild.iconURL)
 .setDescription(" ")
 return message.channel.send(panel);

  });
 };
                                                                    

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ayarlar'],
    permLevel: `0`
};

exports.help = {
    komut: 'panel',
    aciklama: 'Sunucu ayarlarını gösterir.',
    kullanim: 'panel'
};