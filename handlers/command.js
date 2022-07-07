const fs = require('fs');

module.exports = (client) => {
    try {
        let commands = 0;
        fs.readdirSync("./commands/").forEach(folder => {
            const command = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
            for (let file of command)
            {
                let com = require(`../commands/${folder}/${file}`);
                if(com.name)
                {
                    client.commands.set(com.name, com);
                    commands++;
                }
                else
                {
                    console.log(`/${folder}/${file} error config.`);
                }

                if(com.aliases && Array.isArray(com.aliases))
                {
                    com.aliases.forEach(alias => {
                        client.aliases.set(alias, com.name);
                    });
                }
            }
        });
        console.log(`Loaded ${commands} commands.`);
    }
    catch(e){
        console.log(e);
    }
}