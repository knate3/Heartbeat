// Required dependencies
const Discord = require('discord.js');
const os = require('os');
// Required file paths
const {
    CREDENTIALS, 
    SETTINGS
} = require('./config.json');
//const Database = require('./structure/datebase.js');
const Eventhandler = require('./handlers/events.js');
//const Commandhandler = require('./handlers/commands.js');


class Heartbeat extends Discord.Client {
    constructor(options) {
        super(options);
        this.credentials = CREDENTIALS;
        this.config = SETTINGS;
     //   this.database = new Database(this.credentials);
        this.events = new Eventhandler(this);
       // this.commands = new Commandhandler(this);
    }
    async Ready() {
        await this.events.load();
        this.login(os.hostname() == "ubuntu" ? this.credentials.WORKING_TOKEN : this.credentials.DEV_TOKEN)
    }
}
const Client = new Heartbeat({ intents: [Discord.Intents.FLAGS.GUILDS] }).Ready()
