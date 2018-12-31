//amk noluyor
// ananskm
const superagent = require('superagent')
const Discord = require('discord.js')
exports.run = async (client, message, args, tools) => {
    
    const { body } = await superagent
    .get('https://dog.ceo/api/breeds/image/random');
    const köpek = client.emojis.find(emoji => emoji.name === "ferbdog");
  const DBL = require('dblapi.js')
  const express = require('express')
const http = require('http')
  let dbltoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyNTIxMjE1OTUxNzUyMzk3OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ2MTA0NjA2fQ.koaBJQrdGBA7OTw2HpyxSlnqCs_VIinuwPCKSb9hew4';
const app = express();
const server = http.createServer(app);
const dbl = new DBL(dbltoken, { webhookAuth: 'password', webhookServer: server });
  let user = message.mentions.users.first();
  
dbl.hasVoted(message.author.id).then(voted => {
    if (!voted) return message.channel.send(`Bu komutu kullanmak için botumuza DBL'den oy vermen gerekiyor. Oy vermek için **v/dbloy**`);
    const embed = new Discord.RichEmbed()
    .setColor(0x954D23)
    .setTitle(`Hav! ${köpek}`)
    .setImage(body.message)
    message.channel.send({embed})
    
})
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  komut: 'köpek',
  aciklama: 'Köpek fotoğrafı atar.',
  kullanim: 'köpek'
};
