const Discord = require('discord.js');
exports.run = function(client, message, args) {
    const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
 let user = message.mentions.users.first();
  let embed = new Discord.RichEmbed() 
   .setColor("RANDOM") 
   .setImage(message.author.avatarURL) 
   .setDescription(`[Avatar link](${message.author.avatarURL})`) 
   .setTitle(`${message.author.username} adlı kişinin avatarı;`) 
 if (message.mentions.users.size < 1)  return message.channel.send(embed);
   
const avatar = new Discord.RichEmbed()
.setDescription(`[Avatar link](${user.avatarURL})`)
.setTitle(`${user.username} adlı kişinin avatarı;`)
.setImage(`${user.avatarURL}`)
.setColor("RANDOM")
return message.channel.sendEmbed(avatar);
};


exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 komut: 'avatar',
 aciklama: 'Etiketlediğiniz kişinin avatarını atar.',
 kullanim: 'avatar'
};
