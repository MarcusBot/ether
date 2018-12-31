const discord = require('discord.js')
const db = require('quick.db')
const send = require('quick.hook')
var currencyFormatter = require('currency-formatter')
var ms = require('parse-ms');

module.exports.run= async (bot, message, args) => {
  
  
  try {
    let worklog = bot.channels.get('519145455242838046') // MODIFY - This is used to log any work processed & if failed logged as well.
    let cooldown = 3.76e+7//8 Hours in ms
    let amount = Math.floor((Math.random() * 100) + 100); // Cost
    let workplace = ["Ofis", "Alışveriş Merkezi", "Restorant", "Market", "Güvenlik", "İnternet Kafe"] // Different outputs match below, from 0 to 5 with an included error system.
    let workDaily = await db.fetch(`workDaily_${message.author.id}`) // Used for fetching the time on when work is available.
    let result = Math.floor((Math.random() * workplace.length))
    let timeObj = ms(cooldown - (Date.now() - workDaily))
    const fwait = bot.emojis.find(emoji => emoji.name === "fwait");
    const fm = bot.emojis.find(emoji => emoji.name === "fmoney");
    
    let workEmbed = new discord.RichEmbed()
    .setDescription(`**${message.author.username}** çalıştın ve paranı kazandın. ${currencyFormatter.format(amount, { code: 'USD' })} :money_with_wings:`)
    .setColor(`GREEN`)

    let dailytEmbed = new discord.RichEmbed()
    .setDescription(`${message.author.username} şuan iş yeri kapalı! \nKalan zaman: **${timeObj.hours} saat, ${timeObj.minutes} dakika, and ${timeObj.seconds} saniye**`)
    .setColor(`RED`)

    
    try {
    db.fetch(`currency_${message.author.id}`).then(rm => { // MODIFY - This checks your account to see if your account has a valid amount
    if(rm == null || 0){
        db.set(`currency_${message.author.id}`, 1)} // MODIFY - This wipes any data & updates the account if it isn't a valid number

    else if (workDaily !== null && cooldown - (Date.now() - workDaily) > 0) {
        

        message.channel.send(`${fwait} ${message.author.username}, günlük paranı almak için **${timeObj.hours} saat, ${timeObj.minutes} dakika, ${timeObj.seconds} saniye** beklemek zorundasın!`)
    } else if (`${result}` == "0"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`currency_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            message.channel.send(`${message.author.username}, müzede çalıştı ve ${fm} **${currencyFormatter.format(amount, { code: 'TL' })}** kazandı!`)
        })}
    else if (`${result}` == "1"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`currency_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            message.channel.send(`${message.author.username}, ofiste çalıştı ve ${fm} **${currencyFormatter.format(amount, { code: 'TL' })}** kazandı!`)
        })}
    else if (`${result}` == "2"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`currency_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            message.channel.send(`${message.author.username}, restoran'da çalıştı ve ${fm} **${currencyFormatter.format(amount, { code: 'TL' })}** kazandı!`)
        })}
    else if (`${result}` == "3"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`currency_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            message.channel.send(`${message.author.username}, AVM'de çalıştı ve ${fm} **${currencyFormatter.format(amount, { code: 'TL' })}** kazandı!`)
        })}
    else if (`${result}` == "5"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`currency_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
           message.channel.send(`${message.author.username}, manavda çalıştı ve ${fm} **${currencyFormatter.format(amount, { code: 'TL' })}** kazandı!`)
        })}
      else if (`${result}` == "6"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`currency_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            message.channel.send(`${message.author.username}, markette çalıştı ve :money_with_wings: **${currencyFormatter.format(amount, { code: 'TL' })}** kazandı!`)
        })}
    else {
        message.channel.send(`Oof.. you've hit a massive error. Please send a report in, \`-!support <work> <error>\``)
        console.log(result)
    }
    })} catch(err) {console.log(err)}
    } catch(err) {console.log(`Error with work \n${err}`)}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['daily'],
  permLevel: 0
};

exports.help = {
  komut: 'günlük',
  aciklama: 'Çalışıp para kazanırsınız.',
  kullanim: 'günlük'
};