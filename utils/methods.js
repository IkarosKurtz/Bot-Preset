const client = require("./client.js");

exports.wasRoleRemoved = (oldUser, newUser, roleId) => 
    oldUser.roles.cache.has(roleId) && !newUser.roles.cache.has(roleId);

exports.onWelcome = (channelId, message) => {
    const channel = client.channels.cache.find(
        channel => channel.id === channelId
    );

    if (channel) {
        channel.send(message);
    }
}

exports.getUser = (userId, member) => {
    const user = member.guild.members.cache.find(user => user.id === userId);
    return user;
}

exports.getChannel = (channelId) => {
    const channel = client.channels.cache.find(channel => channel.id === channelId);
    return channel;
}