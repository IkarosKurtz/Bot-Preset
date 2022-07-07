const fs = require('fs');
const allEvents = [];

module.exports = async (client) => {
    try{
        try{
            console.log("Loading events...");
        }
        catch {}
        let amount = 0;
        const events = (dir) =>{
            const files = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith(".js"));
            for(let file of files)
            {
                try{
                    const event = require(`../events/${dir}/${file}`);
                    const eventName = file.split(".")[0];
                    allEvents.push(eventName);
                    client.on(eventName, event.bind(null, client));
                    amount++;
                }
                catch(e){
                    console.log(e);
                }
            }
        }
        await ["guild"].forEach(e => events(e));
        console.log(`Loaded ${amount} events.`);
        try{
            console.log(`Starting bot...`);
        }
        catch (e){
            console.log(e);
        }
    }
    catch(e){
        console.log(e);
    }
}