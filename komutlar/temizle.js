const Discord = require('discord.js');
exports.run = function(client, message, args) {

  if (!message.guild) {
    return message.author.send('`temizle` komutu sadece sunucularda kullanılabilir.');
  }
  let mesajsayisi = parseInt(args.join(' '));
  if (mesajsayisi.length < 1) return message.channel.send('Kaç mesaj silmem gerektiğini belirtmedin.')
  if (mesajsayisi > 1000) return message.channel.send('Botumuz ``1000`` adet mesajdan fazla silemez.');
  message.channel.bulkDelete(mesajsayisi + 1);
  message.channel.send(`**${mesajsayisi}** kadar mesaj silinip süpürüldü!`).then(m => m.delete(3000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  komut: 'temizle',
  aciklama: 'Belirlenen miktar mesajı siler.',
  kullanim: 'temizle <temizlenecek mesaj sayısı>'
};
