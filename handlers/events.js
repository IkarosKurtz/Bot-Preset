const fs = require('fs');
require('colors')
const allEvents = []; // Array of events to load.

module.exports = async (client) => {
    try{
        try{
            console.log(`Loading events...`.brightRed);
        }
        catch {}
        let amount = 0; // Count the number of events.

        // Read the events folder.
        const events = (dir) =>{ 
            const files = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith(".js")); // Get the files in the folder.
            for(let file of files) // For each file.
            {
                try{
                    const event = require(`../events/${dir}/${file}`); // Get the event.
                    const eventName = file.split(".")[0]; // Get the event name.
                    allEvents.push(eventName); // Add the event name to the array.
                    client.on(eventName, event.bind(null, client)); // Bind the event to the client.
                    amount++; // Increase the number of events.
                }
                catch(e){
                    console.log(e); // Log the error if there is one.
                }
            }
        }

        await ["guild"].forEach(e => events(e)); // Load the guild event.
        console.log(`Loaded ${amount} events.`.blue);
        try{
            console.log(`Starting bot...`.green.bold);
        }
        catch (e){
            console.log(e); // Log the error if there is one.
        }
    }
    catch(e){
        console.log(e); // Log the error if there is one.
    }
}