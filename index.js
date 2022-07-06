const client = require("./utils/client.js");
const LISTENERS = require("./listeners/messageCreate.js");
const ROLES = require("./constants/roles.js");
const CHANNELS = require("./constants/channels.js");    
const prefix = "?";
const a = "*";
const EMBEDS = require("./utils/embeds.js");
const { getChannel, getUser } = require("./utils/methods.js");

client.on('guildMemberUpdate', async (oldMember, newMember) => LISTENERS.welcomeMessage(oldMember, newMember));

client.on('messageCreate', async message => LISTENERS.messageCreate(message, prefix));

client.on('messageCreate', async message => LISTENERS.serverAuthentication(message));

client.on('guildMemberAdd', member => LISTENERS.userEnterServer(member));

client.on('guildMemberRemove', member => LISTENERS.userLeaveServer(member));

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(a)) return;
    const args = message.content.slice(a.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "embed") {
        EMBEDS.embed(message.channel, message.member);
    }
})