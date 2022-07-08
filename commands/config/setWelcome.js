const { setWelcome } = require('../../utils/embeds.js');

module.exports = {
    name: "setWelcome",
    aliases: ["welcome", "setwelcome", "greetings"],
    desc: "Ping command.",
    run: async(client, message, args, prefix) => {
        setWelcome(client, message);
    }
}