const client = require("./utils/client.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const LISTENERS = require("./listeners/Listeners.js");
const ROLES = require("./constants/roles.js");
const CHANNELS = require("./constants/channels.js");
const { createCanvas, loadImage, registerFont } = require('canvas');
const { join } = require('path');
const { getChannel } = require("./methods.js");
const config = require("./config/config.json");
require("colors")
const fs = require("fs");

const prefix = "?";
const a = "*";

client.on('guildCreate', async guild => {
})

client.on('guildMemberUpdate', async (oldMember, newMember) => LISTENERS.welcomeMessage(oldMember, newMember));

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "b":
            let msg = config.welcomeMessages[Math.random() * config.welcomeMessages.length | 0];
            msg = msg.replace("{user}", message.member.user);

            if(msg.includes("{channel}"))
                msg = msg.replace("{channel}", getChannel(message.member, CHANNELS.RULES));

            if(msg.includes("{server}"))
                msg = msg.replace("{server}", message.member.guild.name);

            message.reply(msg);
            break;
        case "a":
            registerFont(join(__dirname, './src/fonts','Ubuntu-Bold.ttf'), { family: 'ubuntuB' });
            registerFont(join(__dirname, './src/fonts','Ubuntu-Regular.ttf'), { family: 'ubuntuR' });
            registerFont(join(__dirname, './src/fonts','Ubuntu-Medium.ttf'), { family: 'ubuntuM' });

            const { guild } = message.member;

            const canvas = createCanvas(1920, 1080);
            const ctx = canvas.getContext('2d');

            const background = await loadImage(join(__dirname, './img', 'bg.jpg'));
            let avatar;

            if(!message.member.user.avatar)
                avatar = join(__dirname, './img', 'default.png');
            else
                avatar = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 512 });

            const pfp = await loadImage(avatar);
            let x = 0;
            let y = 0;
            ctx.drawImage(background, x, y, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0C209C';
            ctx.font = 'bold 150px ubuntuB';
            let text = `Welcome ${message.member.user.username}`;
            x = canvas.width / 2 - ctx.measureText(text).width / 2;
            y = canvas.height - (canvas.height / 3);
            ctx.fillText(text, x, y);
            
            ctx.fillStyle = '#FFDA61';
            ctx.font = 'bold 150px ubuntuM';
            text = `to ${guild.name}`;
            x = canvas.width / 2 - ctx.measureText(text).width / 2;
            y = canvas.height - (canvas.height / 5);
            ctx.fillText(text, x, y);
            
            
            ctx.beginPath();
            ctx.arc((canvas.width / 2) - 1, (canvas.height / 3.5) - 22, 243, 0, Math.PI * 2, true);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.closePath();
            ctx.clip();
            
            x = canvas.width / 2 - pfp.width / 2;
            y = 30;
            ctx.drawImage(pfp, x, y, pfp.width, pfp.height);

            const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png');

            message.channel.send({files: [attachment]});
            break;
    }
});

client.on('messageCreate', async message => LISTENERS.serverAuthentication(message));

client.on('guildMemberAdd', async member => LISTENERS.userEnterServer(member, client));

client.on('guildMemberRemove',async member => LISTENERS.userLeaveServer(member));

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(a)) return;
    const args = message.content.slice(a.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if(command === "embed") {
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Verificacion de cuenta')
        .setAuthor({
            name: message.member.user.username,
            iconURL: message.member.displayAvatarURL(),
        })
        .setDescription('Escribe la contraseña para verificar tu cuenta y tener acceso al server,' +
        ` ten en cuenta que cambia cada dia.`)
        .addField('La contraseña se pondra en las redes y el canal de twitch del admin', 'https://www.twitch.tv/ikaroskurtz\n' +
        'https://twitter.com/IkarosKurtz')
        .setThumbnail(message.member.displayAvatarURL(),)
        .setTimestamp()
    
        message.channel.send({embeds: [embed]});
    }
});