exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
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
  if (message.channel.nsfw === true) {
          const get = require('superagent')
 .get('http://api.oboobs.ru/boobs/0/1/random')
 .end((err, res) => {
  message.channel.send(`http://media.oboobs.ru/${res.body[0].preview}`);
 });
    } else {
      message.channel.send("Bu bir NSFW kanalı değildir! Lütfen bir NSFW kanalında deneyiniz.")
    }
})
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
};

exports.help = {
komut: "boobs",
aciklama: "it sends boobs picture, what were you expected?",
kullanim: "boobs"
};