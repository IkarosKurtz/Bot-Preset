module.exports = {
    name: "ping",
    aliases: ["ms", "latency"],
    desc: "Ping command.",
    run: async(client, message, args, prefix) => {
        message.reply(`Pong! Latency is \`${client.ws.ping}ms\`.`);
    }
}