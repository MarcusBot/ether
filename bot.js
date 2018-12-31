const { Client, Util } = require('discord.js');
const Discord = require('discord.js')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyC0wNMZke-tFM4pVk6tdnZBXeHjW0zqfFQ');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
const chalk = require('chalk');
const Jimp = require('jimp');
const ytdl = require('ytdl-core')
const ayarlar = require('./ayarlar.json');
const queue = new Map();

let prefix = "v/"
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir(`./komutlar/`, (err, files) => {
  let jsfiles = files.filter(f => f.split(".").pop() === "js")

  if(jsfiles.length <= 0) {
    console.log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
  } else {
    if (err) {
      console.error(`${chalk.redBright("Hata çıktı;")}\n${err}\n\n${chalk.greenBright("Hatayı düzeltmen için bir kaç tavsiye vereceğim. İlk öncelikle ayarları doğru girdiğinden ve boş bırakmadığından emin ol. Daha sonra kendin eklediğin komutlara iyice bak ve örnek komutla karşılaştır. Hatan varsa düzelt. Eğer kodda hata olduğunu düşünüyorsan bildirmekten çekinme!")}`)
    }
    console.log(`${chalk.yellow(jsfiles.length)} komut yüklenecek.`)

    jsfiles.forEach(f => {
      let props = require(`./komutlar/${f}`)
      client.commands.set(props.help.komut, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.komut)
      })
      console.log(`Yüklenen komut: ${props.help.komut}`)
    })
  }
})

client.on("message", async message => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  var command = message.content.split(' ')[0].slice(prefix.length)
  var args = message.content.split(' ').slice(1)
  var cmd = ''

  if (client.commands.has(command)) {
    var cmd = client.commands.get(command)
  } else if (client.aliases.has(command)) {
    var cmd = client.commands.get(client.aliases.get(command))
  }

  if (cmd) {
    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmuyor! ${prefix}yardım ${cmd.help.komut} yazarak gerekli yetkiyi görüntüleyebilirsin!`)
          .setTimestamp()
        message.channel.send({embed})
        return
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmuyor! ${prefix}yardım ${cmd.help.komut} yazarak gerekli yetkiyi görüntüleyebilirsin!`)
          .setTimestamp()
        message.channel.send({embed})
        return
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmuyor! ${prefix}yardım ${cmd.help.komut} yazarak gerekli yetkiyi görüntüleyebilirsin!`)
          .setTimestamp()
        message.channel.send({embed})
        return
      }
    }
    if (cmd.conf.permLevel === 4) {
      const x = await client.fetchApplication()
      if (x.owner.id !== message.author.id) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmuyor! ${prefix}yardım ${cmd.help.komut} yazarak gerekli yetkiyi görüntüleyebilirsin!`)
          .setTimestamp()
        message.channel.send({embed})
        return
      }
    }
    if (cmd.conf.enabled === false) {
      const embed = new Discord.RichEmbed()
        .setDescription(`Bu komut devredışı bırakılmış!`)
        .setTimestamp()
      message.channel.send({embed})
      return
    }
    if(message.channel.type === "dm") {
      if (cmd.conf.guildOnly === true) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Bu komut özel mesajlarda devredışı bırakılmış!`)
          .setTimestamp()
        message.channel.send({embed})
        return
      }
    }
    cmd.run(client, message, args)
}
})
let name = "Ferb and Fineas";
client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log(`Bot ${name} adı ile aktif edildi!`));

client.on('disconnect', () => console.log('Bağlantım kesildi, bildiğinizden emin olun, şimdi tekrar bağlanacağım...'));

client.on('reconnecting', () => console.log('Tekrar bağlanıyorum!'));

  
client.on("message", async msg => {
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
        const kufur = ["oç","oc","amk","ananı sikiyim","ananıskm","piç","amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye","mq", "aq", "amq", "fuck", "son of a bitch", "fucking", "bitch", "pussy", "fuck", "pezevenk", "sakso", "seks", "amını", "OROSPU", "SİK", "AMCIK", "AM", "AMINI", "am k", "y arrak", "y a r r a k", "s i k", "s ik", "p ezenvenk", "AMK", "YARRAK", "OÇ", "OC", "ANANI SİKİYİM", "ANANISKM", "PİÇ", "AMSK", "SİKİM", "SİKİYİM", "KAHPE", "PİÇ KURUSU", "MAL", "SİKİMİ YE", "MQ", "AQ", "AMQ", "FUCK", "SON OF A BITCH", "SON OF A BİTCH", "FUCKING", "FUCKİNG", "BITCH", "BİTCH", "PUSSY", "FUCK"]
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Küfür engelleyici tarafında küfür bulundu ve engellendi.')
               
             }              
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {
 
}
   
})
});

client.on("message", async msg => {
  db.fetch(`reklam_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
        
    const reklam = ["discordapp", ".xyz", ".tk", "gulu", ".pw", ".io", ".me", ".gg",".gl",".com",".ve"]
        if (reklam.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  msg.reply('Reklam engelleyici tarafından reklam bulundu ve atılması engellendi!')
               msg.author.send(`${client.msg.name} sunucusunda reklam içeren mesajın silindi! Şuan ${client.msg.name} sunucusunda şuan reklam engelleyici açık durumda!`)
             }              
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {
 
}
   
})
});

client.on('guildMemberAdd', async member => {
  const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
  if (member.id !== `439820061939597312`) {
  }else{
      const ferbstaff = client.emojis.find(emoji => emoji.name === "ferbstaff");
  hgK.send(`${ferbstaff} **İşe bak! Kurucum sunucunuza katıldı.**`)
  }
  });

client.on("guildMemberAdd", async (member, message, channel) => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
         
                        const bg = await Jimp.read("https://raw.githubusercontent.com/Serhann/sohbet-ve-oyun/master/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        
    })
client.on("guildMemberRemove", async (member, message) => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
         
                        const bg = await Jimp.read("https://raw.githubusercontent.com/Serhann/sohbet-ve-oyun/master/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        
    })

client.on("message", async message => {
    let prefix = "v/";
    let cont = message.content.slice(prefix.length).split(" ")
    let args = cont.slice(1)
    if (message.content.startsWith(prefix + 'sayaç-ayarla')) {
      const basarisiz = client.emojis.find(emoji => emoji.name === "basarisiz");
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`${basarisiz} Sayaç ayarlamak için **Sunucuyu Yönet** yetkisine sahip olman gerek.`) 
    if (!args[0]) return message.channel.send(`${basarisiz} Sayaç ayarlamak için bir sayı gir! \nÖrnek: **/sayaç-ayarla 100 #sayaç**`)
    if (args[0] <= message.guild.memberCount) return message.channel.send(`${basarisiz} Sayaç sayısı sunucudaki kişi sayısından az yada eşit olamaz!`)
    let kanal = message.mentions.channels.first();
    if (!kanal) return message.channel.send(`:no_entry: Sayaç ayarlamak için bir kanal etiketleyin! \nÖrnek: **/sayaç-ayarla 100 #sayaç**`)
    if (isNaN(args[0])) return message.channel.send(`${basarisiz} Lütfen geçerli bir sayı giriniz!`) 
    db.set(`sayacSayi_${message.guild.id}`, args[0]).then(o => {
    db.set(`sayacKanal_${message.guild.id}`, message.mentions.channels.first().id).then(i => {
      const basarili = client.emojis.find(emoji => emoji.name === "basarili");
message.channel.send(`${basarili} Sayaç kanalınız <#${i}> olarak, sayaç sayınız ${o} olarak başarılı bir şekilde kaydedilmiştir.`)    })
    })
  }
})


client.on('guildMemberAdd', (member, guild) => {
  db.fetch(`sayacKanal_${member.guild.id}`).then(kanal => {
  db.fetch(`sayacSayi_${member.guild.id}`).then(i => {
    const giris = client.emojis.find(emoji => emoji.name === "giris");
    if (!i) return
    if (!kanal) return    
    member.guild.channels.get(kanal).send(`${giris} Yeni bir kişi katıldı! \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı! \nKatılan Kişi; **${member.user.username}#${member.user.discriminator}**`) 
  })
  })
})
client.on('guildMemberRemove', member => {
  db.fetch(`sayacKanal_${member.guild.id}`).then(kanal => {
  db.fetch(`sayacSayi_${member.guild.id}`).then(i => {  
      const cikis = client.emojis.find(emoji => emoji.name === "cikis");
    if (!i) return
    if (!kanal) return  
    member.guild.channels.get(kanal).send(`${cikis} Bir kişi sunucudan ayrıldı! \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı! \nÇıkan Kişi; **${member.user.username}**`)
  })
  })
})

const GIFEncoder = require('gifencoder');

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "trigger") {
        const options = {
            size: 256,
          
            frames: 16
        }
    const basarisiz = client.emojis.find(emoji => emoji.name === "yukleniyor");
    message.channel.send(`${basarisiz} Fotoğraf işleniyor, lütfen bekleyin.`).then(m => m.delete(1000));

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const args = message.content.split(' ').slice(1);
        let member = message.mentions.users.first()
        if (args[0] === undefined) member = message.author;
        let avatarurl = member.avatarURL;
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
        }
        const base = new Jimp(options.size, options.size);
        const avatar = await Jimp.read(avatarurl);
        const text = await Jimp.read('https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410');
        const tint = await Jimp.read('https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373');
        avatar.resize(320, 320);
        tint.scaleToFit(base.bitmap.width, base.bitmap.height);
        tint.opacity(0.2);
        text.scaleToFit(280, 60);
        const frames = [];
        const buffers = [];
        const encoder = new GIFEncoder(options.size, options.size);
        const stream = encoder.createReadStream();
        let temp;

        stream.on('data', async buffer => await buffers.push(buffer));
        stream.on('end', async () => {
            return await message.channel.send({
                files: [{
                    name: 'triggered.gif',
                    attachment: Buffer.concat(buffers)
                }]
            });
        });
        for (let i = 0; i < options.frames; i++) {
            temp = base.clone();
            if (i === 0) {
                temp.composite(avatar, -16, -16);
            } else {
                temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
            }
            temp.composite(tint, 0, 0);
            if (i === 0) temp.composite(text, -10, 200);
            else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));
            frames.push(temp.bitmap.data);
        }
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (const frame of frames) {
            encoder.addFrame(frame);
        }
        encoder.finish();
    }
});

 client.on("guildMemberAdd", member => {
 const db = require('quick.db')  
          const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
var role =  gc[member.guild.id].rol

  const rol = member.guild.roles.find('name', role);
  let channel = client.channels.get("name", "gelen-giden")
    if (!rol) return
    member.addRole(rol);   
  ;
}); 

client.on('message', async msg => { // eslint-disable-line
  let prefix = "v/"
    const muzik = client.emojis.find(emoji => emoji.name === "muzik");
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(msg.guild.id);

  let command = msg.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length)

   if (command === 'espri' || command === 'espriyap') {
var request = require('request');

request('https://api.eggsybot.xyz/espri', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var info = JSON.parse(body);
      msg.channel.send(info.soz)
    }
})
    }
  if (command === 'atatürk' || command === 'atatürkresim') {
    var request = require('request');
    request('https://api.eggsybot.xyz/ataturk', function (error, response, body) {
      if (error) return console.log('Hata:', error);
      else if (!error) {
        var info = JSON.parse(body);
        const ataturk = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(" ")
        .setImage(info.link)  
        msg.channel.send(ataturk)
      }
    })
  }
 
  if (command === 'dbl' || command === 'dbloy') {
  msg.author.send(`Buyrunuz; https://discordbots.org/bot/525212159517523979/vote`)
  };
  if (command === "lyrics") {
var lyr = require('lyrics-fetcher');
    let x = msg.content.split(` `).slice(1)[0]
    let y = msg.content.split(` `).slice(1)[1]
 
lyr.fetch(x, y, function (err, lyrics) {
    msg.channel.send(err || lyrics);
});
  };
  if (command === 'yardım' || command === 'help') {
     const kedi = client.emojis.find(emoji => emoji.name === "ferbcat");
    const köpek = client.emojis.find(emoji => emoji.name === "ferbdog");
    const trig = client.emojis.find(emoji => emoji.name === "triggered");
    const wasted = client.emojis.find(emoji => emoji.name === "wasted");
    const atatürk = client.emojis.find(emoji => emoji.name === "ataturk");
    const trans = client.emojis.find(emoji => emoji.name === "translate");
    const fc = client.emojis.find(emoji => emoji.name === "funcry");
   msg.reply('Özel mesajlarınızı kontrol ediniz.')
   msg.author.send(`**Müzik Komutları** \nv/çal - İstediğiniz müziği çalar. \nv/geç - Listedeki diğer şarkıya geçer. \nv/ses - Sesi arttırmanıza yardımcı olur. \nv/kuyruk - Kuyrukta kaç tane şarkı olduğunu gösterir. \nv/devam - Duraklattığınız şarkı devam ettirir. \nv/durdur - Müziği durdurur. \nv/kapat - Müziği kapatır. \nv/çalınan - Çalınan şarkıyı gösterir. \n\n**Sunucu Komutları** \nv/ping - Botun pingini gösterir. \nv/avatar - Etiketlediğiniz kişinin veya kendinizin avatarını gösterir. \nv/panel - Sunucu ayarlarını gösterir. \nv/davet - Botun davet linkini yollar. \n\n**Yetkili Komutları** \nv/giriş-çıkış-ayarla - Giriş çıkış fotoğrafını nereye atacağını belirlersin. \nv/oto-rol - Otorolü ayarlarsınız. \nv/temizle - Mesajları silmenizi sağlar. \nv/reklam-engel [aç-kapat] - Reklam engel özelliğini açar veya kapatır. \nv/küfür-engel [aç-kapat] - Küfür engel özelliğini açar veya kapatır. \n\n**Profil Komutları** \nv/profil - Profilinizi gösterir. \nv/açıklama - Açıklamanızı düzenlersiniz. \nv/yaş-ekle - Yaşınızı düzenlersiniz. \nv/günlük - Günlük olarak paranızı alırsınız. \nv/rank - Levelinize bakarsınız. \n\n**NSFW Komutları** \nv/pgif - Porno gifleri atar. \nv/boobs - Koca koca memeler atar. \nv/pussy - Am fotoğrafı atar. \nv/ass - Göt fotoğrafı atar. \nv/anal - Anal seks fotoğrafı atar. \nv/4kporn - 4k sapık fotoğraflar atar. \n\n**Eğlence ve Ekstra Komutlar** \nv/trigger - Avatarınıza trigger efekti ekler. \nv/wasted - Wasted efekti ekler. \nv/espri - Çok komik espriler yapar. \nv/atatürk - Atatürk'ün fotoğraflarını atar. \nv/çeviri - Yazdığınız yazıyı istediğiniz dile çevirir. \nv/köpek - Köpek fotoğrafları atar. \nv/kedi - Kedi fotoğrafları atar. \nv/havadurumu - Yazdığınız şehirin kaç derece olduğunu söyler. \nv/atatürk-çerçeve - Avatarınıza atatürk çerçevesi ekler.`)

  }

  if (command === 'ping' || command === 'gecikmesüresi') {
    const pingpong = client.emojis.find(emoji => emoji.name === "pingpong");
msg.channel.send(`${pingpong} Ping; ${client.ping } ms`)
  };
  
  if (command === 'davet') {
  msg.reply(`Davet linki özel mesajlarınızdan gönderildi!`)
  msg.author.send(`Bu linkten botu ekleyebilirsin. \n\nhttps://discordapp.com/api/oauth2/authorize?client_id=525212159517523979&permissions=8&scope=bot`)
  };

  if (command === 'çal' || command === 'play') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('Çal komutunu kullanmak için ilk önce bir sesli kanala giriş yapman gerekiyor.'));
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('Şuan olduğunuz kanala giremiyorum.'));
    }
    if (!permissions.has('SPEAK')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // ehehehehu videomuzu bulalım
        await handleVideo(video2, msg, voiceChannel, true); // ve gönderelim
      }
      return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setDescription(`${playlist.title} kuyruğa eklendi!`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 5);
          let index = 0;
          msg.channel.sendEmbed(new Discord.RichEmbed()
                                .setTitle(`${muzik} Şarkı Listesi`)
      .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
       .setFooter('1 ve 5 arası bir sayı yazınız. 30 saniye sonra komut iptal edilecektir.')
          .setColor('RANDOM'));
          // en fazla 5 tane 
          try {
            var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
              maxMatches: 1,
              time: 30000,
              errors: ['time']
            });
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription(`${muzik} Şarkı seçimi iptal edildi. Sebep; Süre aşımı`));
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription('Böyle bir şarkı veya bir video yok/bulunamadı.'));
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === 'geç' || command === 'skip') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Bu komut özel mesajlarda kullanılamaz.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.send('Kuyrukta şarkı/video olmadığı için geçemiyorum.');
    serverQueue.connection.dispatcher.end('Geç komudu kullanıldı.');
    return undefined;
  } else if (command === 'kapat' || command === 'close') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('Şuanda şarkı/video çalmıyor.'));
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end('Kapat komutu kullanıldı!');
    return undefined;
  } else if (command === 'ses' || command === 'volume') {
      if (!msg.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setDescription(`You can not use commands here.`)
        return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
  .setDescription('Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription('Şuanda kuyrukta şarkı/video bulunmuyor.'));
    if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(` 🔊 | Ses seviyesi: **${serverQueue.volume}**`));
    serverQueue.volume = args[1];
        if (args[1] > 5) return msg.channel.send({
            embed: {
                title: "",
                color: 0xE50000,
                description: "Lütfen 5'den az yada 5 olarak bir sayı belirtin."
            }
        });
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription('Ses seviyesi ' + `**${args[1]}**` + ' olarak ayarlandı.'));
  } else if (command === 'çalınan') {
    
    
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Şu anda hiçbir şey çalmıyorum.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('Şuanda kuyrukta şarkı/video bulunmuyor.'));
    msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField(`${muzik} Şarkı ismi`, `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm} dakika ${serverQueue.songs[0].durations} saniye`, true))
  } else if (command === 'kuyruk' || command === 'queue') {
    if (!serverQueue) return msg.channel.send('Şuanda kuyrukta şarkı/video bulunmuyor.');
    let index = 0;
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField(`${muzik} Şu anda çalınan: ` + `${serverQueue.songs[0].title}`);
  } else if (command === 'durdur' || command === 'stop') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Bu komut özel mesajlarda kullanılamaz.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription(`${muzik} | Müzik durduruldu.`)
      .setColor('RANDOM'));
    }
    return msg.channel.send('Şuanda kuyrukta şarkı/video bulunmuyor.');
  } else if (command === 'devam' || command === 'resume') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Burada komutu kullanamazsınız.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('Müzik devam ediyor.'));
    }
    return msg.channel.send('Şuanda kuyrukta şarkı/video bulunmuyor.');
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title, 
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views,
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`HATA | Ses kanalına katılamadım: ${error}`);
    }
  } else {
    const muzik = client.emojis.find(emoji => emoji.name === "muzik");
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return msg.channel.send(`${muzik} **__${song.title}__** adlı şarkı başarılı bir şekilde kuyruğa eklendi!`);
  }

  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on('end', reason => {
      if (reason === 'Akış yeterince hızlı diğil.') console.log('Şarkı Durduruldu.');
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  const muzik = client.emojis.find(emoji => emoji.name === "muzik");
   serverQueue.textChannel.send(`**__${song.title}__** adlı şarkı çalmaya başladı!`);
};
const string = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.on("message", message => {
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== "439820061939597312") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send((evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`HATA\` \`\`\`xl\n${(err)}\n\`\`\``);
    }
  }
});
client.login(ayarlar.token);