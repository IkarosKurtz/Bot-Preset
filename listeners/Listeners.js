const ROLES = require("../constants/roles.js");
const CHANNELS = require("../constants/channels.js");
const MESSAGES = require("../constants/messages.js");
const { getChannel, wasRoleRemoved, onWelcome } = require("../methods.js");
const EMBEDS = require("../utils/embeds.js");

module.exports = LISTENERS = {
    welcomeMessage: (oldMember, newMember) => {
        // If the user has been verified, remove the role and send a welcome message
        const wasRemove = wasRoleRemoved(oldMember, newMember, ROLES.NotVerified);
        if (wasRemove) {
            onWelcome(newMember, CHANNELS.PRESENTATION, MESSAGES.Welcome(newMember));
        }
    },

    messageCreate: (message, prefix) => {
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        switch (command) {
            case "ping":
                message.reply("pong");
                break;
        
            case "clear":
                message.channel.bulkDelete(args[0]);
        }
    },

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
            client.users.fetch(ROLES.ADMIN)
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

    userLeaveServer: (member) => {
        if(member.roles.cache.has(ROLES.NotVerified)) return;
        member.guild.channels.cache.find(
            channel => channel.id === CHANNELS.PRESENTATION
        ).send(`${member.user.username} ha salido del servidor.`);
    }
}