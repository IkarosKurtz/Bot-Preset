//^ Packages

const ROLES = require("../constants/roles.js");
const CHANNELS = require("../constants/channels.js");
const MESSAGES = require("../constants/messages.js");
const { getChannel, wasRoleRemoved, onWelcome } = require("../methods.js");
const EMBEDS = require("../utils/embeds.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, loadImage, registerFont } = require('canvas');
const { join } = require('path');
const config = require('../config/config.json');
require("colors")

//^ Packages

module.exports = LISTENERS = {
    userEnterServer: (member, client) => { 
        if(member.user.bot) // bypass bots
        {
                var channel = getChannel(member, CHANNELS.PRESENTATION);
                if(channel)
                {
                    channel.send(MESSAGES.Welcome(member.user));
                }
                return;
        }

        member.roles.add(ROLES.NotVerified); // add the unverified role
        var channel =  getChannel(member, CHANNELS.VERIFICATION) // get the verification channel
        setTimeout(() => {
            client.users.fetch(member.guild.ownerId)
            .then(user => {
                EMBEDS.VerificationMessage(channel, user);
            })
            .catch(console.error);
        }, 1500); // send the embed after 1.5 seconds
    },
    
    serverAuthentication: (message) => {
        if(message.author.bot) return;
        if(!message.member.roles.cache.has(ROLES.NotVerified)) return;
        // listen for the password on the respective channel
        if(message.channelId === CHANNELS.VERIFICATION)
        {
            if(message.content === MESSAGES.PASSWORD)
            {
                // if the passowrd is correct remove the unverified role
                message.member.roles.remove(ROLES.NotVerified);
                message.member.roles.add(ROLES.USER);
            }
            else
            {
                // if the password is incorrect, send a message
                message.channel.send("Código incorrecto, recuerda que cambia cada dia.");
            }
        }
    },

    welcomeMessage: async (oldMember, newMember) => {
        // If the user has been verified, remove the role and send a welcome message
        const wasRemove = wasRoleRemoved(oldMember, newMember, ROLES.NotVerified);
        if (wasRemove) {

            let msg = config.welcomeMessages[Math.random() * config.welcomeMessages.length | 0];
            msg = msg.replace("{user}", newMember.user);
            
            if(msg.includes("{channel}"))
                msg = msg.replace("{channel}", getChannel(newMember, CHANNELS.RULES));

            if(msg.includes("{server}"))
                msg = msg.replace("{server}", newMember.guild.name);

            onWelcome(newMember, CHANNELS.PRESENTATION, msg);

            registerFont(join(__dirname, './../src/fonts','Ubuntu-Bold.ttf'), { family: 'ubuntuB' });
            registerFont(join(__dirname, './../src/fonts','Ubuntu-Regular.ttf'), { family: 'ubuntuR' });
            registerFont(join(__dirname, './../src/fonts','Ubuntu-Medium.ttf'), { family: 'ubuntuM' });

            const { guild } = newMember;

            const canvas = createCanvas(1920, 1080);
            const ctx = canvas.getContext('2d');

            const background = await loadImage(join(__dirname, './../img', 'bg.jpg'));
            const pfp = await loadImage(newMember.user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 }));
            let x = 0;
            let y = 0;
            ctx.drawImage(background, x, y, canvas.width, canvas.height);
            
            console.log((canvas.height / 3.5) - 22);
            
            
            
            ctx.fillStyle = '#131313';
            ctx.font = 'bold 150px ubuntuB';
            let text = `Welcome ${newMember.user.username}`;
            x = canvas.width / 2 - ctx.measureText(text).width / 2;
            y = canvas.height - (canvas.height / 3);
            ctx.fillText(text, x, y);
            
            ctx.fillStyle = '#A7C5EB';
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

            const me = new MessageEmbed()
            .setColor('#A7C5EB')
            .setTitle('Welcome to the server')
            .setImage("attachment://welcome.png")
            .setDescription('Welcome to the server, please read the rules and follow them.');

            const channel = getChannel(newMember, CHANNELS.PRESENTATION);
            try {
                channel.send({ embeds : [me], files : [attachment] });
            }
            catch (e){
                console.log(e.Red);
            }
        }
    },

    userLeaveServer: (member) => {
        if(member.roles.cache.has(ROLES.NotVerified)) return;
        member.guild.channels.cache.find(
            channel => channel.id === CHANNELS.PRESENTATION
        ).send(`${member.user.username} ha salido del servidor.`);
    }
}