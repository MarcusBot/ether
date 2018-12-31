const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
 
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${ayarlar.botad}: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${ayarlar.botad}: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("do not disturb");
client.user.setGame(`Müzik komutları! v/çal vs.`)
client.on('ready', () => {
  const channel = client.channels.get("448137003834277889")
  channel.send(`${client.user.username} botu açıldı!`)
});
};                                                                    
