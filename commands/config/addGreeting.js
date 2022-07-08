module.exports = {
    name: "addgreeting",
    aliases: ["addG", "addW"],
    desc: "Añadir un mensaje de bienvenida.",
    run: async(client, message, args, prefix) => {
        message.reply(`Lo siento todavia no esta disponible.`);
    }
}