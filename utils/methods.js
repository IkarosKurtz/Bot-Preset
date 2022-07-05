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