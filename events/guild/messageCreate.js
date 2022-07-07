const config = require(`../../config/config.json`);

module.exports = async(client, message) => {
    if(!message.guild || message.author.bot || !message.channel) return;

    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c =>
        c.aliases && c.aliases.includes(cmd));

    if(command)
    {
        command.run(client, message, args, config.prefix);
    }
    else
    {
        return message.reply("🔴 Command not found.");
    }

}