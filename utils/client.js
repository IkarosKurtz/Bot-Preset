const {Client, Intents, Collection} = require("discord.js");
const { getChannel } = require("../methods.js");
const CHANNELS = require("../constants/channels.js");
require("dotenv").config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

var guild = require("../config/config.json").guildId;

// Search for the token in the .env file, dont share your token
const token = process.env.TOKEN;

client.once('ready', (bot) => {
    console.log('Its showtime 😎');
    setInterval(() => {
        client.guilds.cache.get(guild).channels.cache.get(CHANNELS.VERIFICATION).bulkDelete(100);
    },5000);
});

client.commands = new Collection();
client.aliases = new Collection();

function requestHnadlers() {
    ["command", "events"].forEach(handler => {
        try {
            require(`../handlers/${handler}`)(client);
        }
        catch (e) {
            console.error(e);
        }
    })
}

requestHnadlers();
client.login(token);

module.exports = client