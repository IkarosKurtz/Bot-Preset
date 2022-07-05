const {Client, Intents} = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

// Search for the token in the .env file, dont share your token
const token = process.env.TOKEN;

client.once('ready', (bot) => {
    console.log('Its showtime 😎');
});

client.login(token);

module.exports = client