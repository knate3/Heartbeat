if (process.version.slice(1).split('.')[0] < 12) throw new Error('Node 12.0.0 or higher is required. Update Node on your system.');
// Required dependencies
const Discord = require('discord.js');

// Required file paths
const Config = require('./config.json');
const Settings = require('./settings.json');

class Heartbeat extends Discord.client {
    constructor(options) {
        super(options);
        this.config = Config;
        this.settings = Settings;
    }
}
