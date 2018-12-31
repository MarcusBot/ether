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
      const get= require('superagent')
            .get('https://nekobot.xyz/api/image')
            .query({ type: '4k'})
            .end((err, res) => {
              message.channel.send({ file: res.body.message });
            });
      } else {
        message.channel.send({embed: {
            description: "Bu bir NSFWF kanalı değildir! Lütfen bir NSFW kanalında deneyiniz."
        }})
      }
                           });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  komut: "4kporn",
  aciklama: "it sends 4k porn picture, what were you expected?",
  kullanim: "4kporn"
};