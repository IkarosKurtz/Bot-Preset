
exports.wasRoleRemoved = (oldUser, newUser, roleId) => 
    oldUser.roles.cache.has(roleId) && !newUser.roles.cache.has(roleId);

exports.onWelcome = (member, channelId, message) => {
    let channel = member.guild.channels.cache.get(channelId)

    if (channel) {
        channel.send(message);
    }
};

exports.getUser = (member, userId) => {
    var myUser = member.guild.users.cache.get(userId)
    return myUser;
};

exports.getChannel = (member, channelId) => {
    var myChannel = member.guild.channels.cache.get(channelId);
    return myChannel;
};