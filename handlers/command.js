const fs = require('fs');
require('colors')

module.exports = (client) => {
    try {
        try{
            console.log(`Loading commands...`.brightRed);
        }
        catch {}
        let commands = 0; // Count the number of commands.
        fs.readdirSync("./commands/").forEach(folder => { // Read the commands folder.
            const command = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js")); // Get the commands in the folder.
            for (let file of command) // For each command in the file.
            {
                let com = require(`../commands/${folder}/${file}`); // Get the command.
                if(com.name) // If the command has a name.
                {
                    client.commands.set(com.name, com); // Set the command.
                    commands++; // Increase the number of commands.
                }
                else
                {
                    console.log(`/${folder}/${file} error config.`);
                }

                if(com.aliases && Array.isArray(com.aliases)) // If the command has aliases.
                {
                    com.aliases.forEach(alias => { // For each alias.
                        client.aliases.set(alias, com.name); // Set the alias.
                    });
                }
            }
        });
        console.log(`Loaded ${commands} commands.`.blue);
    }
    catch(e){
        console.log(e); // Log the error.
    }
}