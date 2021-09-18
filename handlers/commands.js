const  Discord = require('discord.js');
const { parse, sep, } = require('path');
const klaw = require('klaw');

class CommandHandler extends Discord.Collection {
    constructor(client){
        this.client = client;
        this.path = './commands';
    }
    async load() {
        const start = Date.now();

        klaw(this.path).on('data', item => {
            const cmd_file = parse(item.path);
            if(!cmd_file.ext || cmd_file.ext !== '.js') return;
            const cmd_path = cmd_file.dir + sep + cmd_file.base;
            const cmdReq = require(cmd_path);
            const cmd = new cmdReq(this).help.path = cmd_path;
            this.set(cmd.help.name, cmd);
        }).on('end', () => {
            console.log(`Loaded ${this.size} Commands in ${Date.now() - start}ms`);
            return this;
        });
    }

    async reload(command_name) {
        const command = this.find(command_name);
        const cmd = require(command.help.path);
        const reload_command = new cmd().help.path = command.help.path;
        this.delete(command)
        this.set(reload_command.help.name, reload_command);
    }
}

module.exports = CommandHandler;