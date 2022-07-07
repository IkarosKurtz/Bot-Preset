const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    aliases: ["h", "commands"],
    desc: "Un despliegue de todos los comandos disponibles.",
    run: async(client, message, args, prefix) => {
        const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Commandos')
            .setDescription("Estos son los comandos disponibles:")
            .setAuthor({
                name: message.member.guild.name,
                iconURL: message.member.guild.iconURL(),
            })
            .addFields(
                {
                    name : `?ping`,
                    value : `Muestra el ping del bot`,
                },
                {
                    name : `?clear [cantidad]`,
                    value : `Elminar mensajes en el canal en el que fue enviado`,
                }
            )
            .setThumbnail("https://cdn-icons-png.flaticon.com/512/57/57108.png")
            .setTimestamp();
            message.reply({embeds : [embed]});
    }
}