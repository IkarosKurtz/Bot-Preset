const client = require("./utils/client.js");
const { MessageEmbed } = require("discord.js");
const LISTENERS = require("./listeners/messageCreate.js");
const ROLES = require("./constants/roles.js");
const CHANNELS = require("./constants/channels.js");    
const EMBEDS = require("./utils/embeds.js");
const { getChannel, getUser } = require("./methods.js");
const prefix = "?";
const a = "*";
var interval;
client.on('guildMemberUpdate', async (oldMember, newMember) => LISTENERS.welcomeMessage(oldMember, newMember));

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "ping":
            message.reply("pong");
            break;
    
        case "clear":
            if(args[0] === undefined) return;
            message.channel.bulkDelete(args[0]);
            break;

        case "help":
            const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Commandos')
            .setDescription("Estos son los comandos disponibles:")
            .setAuthor({
                name: message.member.guild.name,
                iconURL: message.member.guild.iconURL(),
            })
            .addFields(
                {
                    name : `?ping`,
                    value : `Muestra el ping del bot`,
                },
                {
                    name : `?clear [cantidad]`,
                    value : `Elminar mensajes en el canal en el que fue enviado`,
                }
            )
            .setThumbnail("https://cdn-icons-png.flaticon.com/512/57/57108.png")
            .setTimestamp();
            message.channel.send({embeds : [embed]});
            break;

        case "verify":
            const Canvas = require('canvas');
            const canvas = Canvas.createCanvas(700, 250);
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

        console.log(CHANNELS.RULES); 
    }
})