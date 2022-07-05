const ROLES = require("../constants/roles.js");
const CHANNELS = require("../constants/channels.js");
const MESSAGES = require("../constants/messages.js");
const { wasRoleRemoved, onWelcome } = require("../utils/methods.js");

module.exports = LISTENERS = {
    welcomeMessage: (oldMember, newMember) => {
        // If the user has been verified, remove the role and send a welcome message
        const wasRemove = wasRoleRemoved(oldMember, newMember, ROLES.NotVerified);
        if (wasRemove) {
            onWelcome(CHANNELS.PRESENTATION, MESSAGES.Welcome(newMember.user));
        }
    },

    messageCreate: (message, prefix) => {
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if(command === "ping") {
            message.reply("pong");
        }
    },

    userEnterToServer: (member) => { 
        // add the unverified role to the user
        if(!member.roles.cache.has(ROLES.NotVerified))
            member.roles.add(ROLES.NotVerified);
    },

    serverAuthentication: (message) => {
        if(message.author.bot) return;
        // listen for the password on the respective channel
        if(message.channelId === CHANNELS.VERIFICATION)
        {
            if(message.content === MESSAGES.PASSWORD)
            {
                // if the passowrd is correct remove the unverified role
                message.member.roles.remove(ROLES.NotVerified);
                message.channel.send("Te has verificado correctamente.");
            }
            else
            {
                // if the password is incorrect, send a message
                message.channel.send("Código incorrecto, recuerda que cambia cada dia.");
            }
        }
    },
}