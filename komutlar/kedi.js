  const Discord = require('discord.js'),
    superagent = require('superagent');
module.exports.run = async (client, message, args) => {
    let {
        body
    } = await superagent
        .get(`http://aws.random.cat/meow`);
        const kedi = client.emojis.find(emoji => emoji.name === "ferbcat");
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
    const catembed = new Discord.RichEmbed()
        .setTitle(`Miyav! ${kedi}`)
        .setColor("RANDOM")
        .setImage(body.file)
    message.channel.send(catembed);
})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  komut: 'kedi',
  aciklama: 'Kedi fotoğrafı atar.',
  kullanim: 'kedi'
};
