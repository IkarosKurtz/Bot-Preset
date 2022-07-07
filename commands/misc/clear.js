module.exports = {
    name: "clear",
    aliases: ["erase", "clean", "delete"],
    desc: "Elminar mensajes en el canal en el que fue enviado",
    run: async(client, message, args, prefix) => {
        if(args[0] === undefined) return;
        message.channel.bulkDelete(args[0]);
    }
}