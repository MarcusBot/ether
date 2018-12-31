const Discord = require('discord.js');
var Jimp = require('jimp');

module.exports.run = async (bot, message, args) => {
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

  var user = message.mentions.users.first() || message.author;
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

  const basarisiz = bot.emojis.find(emoji => emoji.name === "yukleniyor");
    message.channel.send(`${basarisiz} Fotoğraf işleniyor, lütfen bekleyin.`).then(m => m.delete(1000));
        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(5)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
})
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  komut: 'wasted',
  aciklama: 'wasted.',
  kullanim: 'wasted'
};