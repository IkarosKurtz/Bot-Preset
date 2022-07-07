const CHANNELS = require("./channels.js");
const { getChannel } = require("../methods.js");

module.exports = MESSAGES = {
    Welcome: user => `Binvenido a la sinapsis ${user.user} favor de leer ${getChannel(user, CHANNELS.RULES)}`,
    PASSWORD: "1233"
};