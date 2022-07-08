const config = require(`../../config/config.json`);

module.exports = async(client, message) => {
    if(!message.guild || message.author.bot || !message.channel) return; // If the message is not in a guild or is from a bot, return.

    if(!message.content.startsWith(config.prefix)) return; // If the message doesn't start with the prefix, return.

    // Split the message into an array of words.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase(); // Get the command.
    const command = client.commands.get(cmd) || client.commands.find(c =>
        c.aliases && c.aliases.includes(cmd)); //Search for the command.

    if(command)
    {
        command.run(client, message, args, config.prefix); // Run the command.
    }
    else
    {
        return message.reply("🔴 Command not found."); // If the command doesn't exist, return.
    }

}