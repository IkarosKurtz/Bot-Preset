const { MessageEmbed } = require('discord.js');

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

exports.HelpMessage = (channel, member) => {
    const embed = new MessageEmbed()
    .setColor('BLURPLE')
    .setTitle('Commandos')
    .setAuthor({
        name: member.guild.name,
        iconURL: member.guild.iconURL(),
    })
}