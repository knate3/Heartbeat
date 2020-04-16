const { ShardingManager } = require('discord.js');
const { working_token } = require('./config.json');

const manager = new ShardingManager('./client.js', { token: working_token });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));