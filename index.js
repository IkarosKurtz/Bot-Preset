const client = require("./utils/client.js");
const LISTENERS = require("./listeners/messageCreate.js");
const ROLES = require("./constants/roles.js");
const CHANNELS = require("./constants/channels.js");    
const prefix = "?";

client.on('guildMemberUpdate', async (oldMember, newMember) => LISTENERS.welcomeMessage(oldMember, newMember));

client.on('messageCreate', async message => LISTENERS.messageCreate(message, prefix));

client.on('messageCreate', async message => LISTENERS.serverAuthentication(message));

client.on("guildMemberAdd", member => LISTENERS.userEnterToServer(member));