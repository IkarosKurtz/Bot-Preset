const CHANNELS = require("./channels.js");
const { getChannel } = require("../utils/methods.js");

module.exports = MESSAGES = {
    Welcome: user => `Binvenido a la sinapsis ${user} favor de leer ${getChannel(CHANNELS.RULES)}`,
    PASSWORD: "1233"
};