module.exports = {
    name: "clear",
    aliases: ["erase", "clean", "delete"],
    desc: "Elminar mensajes en el canal en el que fue enviado",
    run: async(client, message, args, prefix) => {
        const { hasAdminRole, hasModRole } = require('../../methods.js');
        if(hasAdminRole(message.member) || hasModRole(message.member)) 
        {
            if(args[0] === undefined) return;
            message.channel.bulkDelete(args[0]);
        }
    }
}