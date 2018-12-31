const discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs');

exports.run = async (client, message, args) => {
  const ferbuser = client.emojis.find(emoji => emoji.name === "ferbuser");
  const fmoney = client.emojis.find(emoji => emoji.name === "fmoney");

  let dbaçıklama = await db.fetch(`aciklama_${message.author.id}`)
  let etiket = await db.fetch(`etiket_${message.author.id}`)
  let yas = await db.fetch(`yas_${message.author.id}`)
  let günlük = await db.fetch(`currency_${message.author.id}`)
  
  let acıklama;
  if(!dbaçıklama) { acıklama = "Normal bir açıklama!" } else { acıklama = dbaçıklama }
  
  let e;
  if(!etiket) { e = `${ferbuser}` } else { e = etiket }

  	let y;
  if(!yas) { y = "Yaş ayarlanmamış" } else { y = yas}
  
  let g;
  if(!günlük) { g = "0" } else { g = günlük }

  const profiles = new discord.RichEmbed()
  .setColor("RANDOM")
  .addField(`Yaşınız`, y, true)
  .addField(`Açıklamanız`, `${acıklama}`, true)
  .addField(`FMoney`, `${fmoney} ${g} FMoney`)
  .setThumbnail(message.author.displayAvatarURL)
  .setTitle(`${message.author.username}#${message.author.discriminator} ${e}`, message.author.displayAvatarURL)
  return message.channel.sendEmbed(profiles);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['profile'],
  permLevel: 0
};

exports.help = {
  komut: 'profil',
  aciklama: 'Botun eğlence komutlarını gösterir.',
  kullanim: 'profil'
};