// Authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let guilds = await lib.discord.guilds['@0.0.6'].list({
  limit: 100
});

let channels = await lib.discord.guilds['@0.0.6'].channels.list({
  guild_id: guilds[0].id
});

// Status update
await lib.discord.users['@0.1.4'].me.status.update({
  activity_name: 'coding'
});