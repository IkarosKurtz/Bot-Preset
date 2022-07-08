const { MessageEmbed } = require('discord.js');
const { name } = require('../commands/misc/help');
const greetings = require('../config/config.json').welcomeMessages;

exports.VerificationMessage = (channel, member) => {
    const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Verificacion de cuenta')
    .setAuthor({
        name: member.username,
        iconURL: member.displayAvatarURL(),
    })
    .setDescription('Escribe la contraseña para verificar tu cuenta y tener acceso al server,' +
    ' ten en cuenta que cambia cada dia.')
    .addField('La contraseña se pondra en las redes y el canal de twitch del admin', 'https://www.twitch.tv/ikaroskurtz\n' +
    'https://twitter.com/IkarosKurtz')
    .setThumbnail(member.displayAvatarURL())
    .setTimestamp()

    channel.send({embeds: [embed]});
}

exports.setWelcome = (client, message) =>{
    const me = new MessageEmbed()
    .setAuthor(
        {
            name: message.guild.name,
            iconURL: message.guild.iconURL()
        }
    )
    .setColor('#0099ff')
    .setTitle('Configuracion de la bienvenida')
    .setDescription('Estos son los mensajes que se mostraran en el canal de bienvenida.\n{user} = usuario, {channel} = canal de reglas, {server} = server\n'
    + '\n**?AddGreeting [mensaje] para agregar un saludo.\n?DeleteGreeting [numero] para eliminar un saludo.**'
    );

    for(let i = 0; i < greetings.length; i++){
        me.addField(`${i + 1}`,`${greetings[i]}`);
    }
    message.reply({embeds: [me]});
}