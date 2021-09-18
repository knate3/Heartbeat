const { ShardingManager } = require('discord.js');
const { CREDENTIALS } = require('./config.json');

const manager = new ShardingManager('./client.js', { token: CREDENTIALS.WORKING_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();