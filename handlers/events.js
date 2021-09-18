const  Discord = require('discord.js');
const  klaw = require('klaw');
const { parse, sep } = require('path');

class EventHandler extends Discord.Collection {
    constructor(client){
        super();
        this.client = client;
        this.path = './events';
    }

    async load() {

        const start = Date.now();

        klaw(this.path).on('data', item => {
            const evt_file = parse(item.path);
            if(!evt_file.ext || evt_file.ext !== '.js') return;
            const req_evt = require(evt_file.dir + sep + evt_file.base);
            const event = new req_evt(this.client);
            this.set(evt_file.name, event)
            if(event.once){
                this.client.once(evt_file.name, (...args) => event.run(...args));
            } else {
                this.client.on(evt_file.name, (...args) => event.run(...args));
            }
        }).on('end', () => {
            console.log(`Loaded ${this.size} Events in ${Date.now() - start}ms`);
            return this;
        });
    }
}
module.exports = EventHandler;