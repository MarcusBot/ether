const Discord = require('discord.js');
module.exports = member => {
    //member.addRole(member.guild.roles.find(r => r.name.startsWith('Kullanıcılar')));
    const channel = member.guild.channels.find('name', 'gelen-giden');
    if (!channel) return;
   const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
   .setTitle('Üye katıldı;')
   .setDescription(`Sunucuya katıldı! [**${member.guild.memberCount} üye**]`)
   .setTimestamp()
   channel.send(embed);
};