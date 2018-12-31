const Discord = require("discord.js");
var Jimp = require('jimp');
const db = require('quick.db');

exports.run = async (client, message, args) => {
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
    if (!message.guild) user = message.author;
  const basarisiz = client.emojis.find(emoji => emoji.name === "yukleniyor");
    message.channel.send(`${basarisiz} Fotoğraf işleniyor, lütfen bekleyin.`).then(m => m.delete(1000));

Jimp.read(user.avatarURL, (err, image) => {
    image.resize(315, 310)
    Jimp.read("https://cdn.discordapp.com/attachments/468850238409539636/468917003445600258/indir_2.png", (err, avatar) => {
        avatar.resize(315, 320)
        image.composite(avatar, 1, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
        }, 1000);
    });

});
})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tbc'],
    permLevel: 0
  };
  
  exports.help = {
    komut: 'atatürk-çerçeve',
    aciklama: 'tbc',
    kullanim: 'atatürk-çerçeve'
  };