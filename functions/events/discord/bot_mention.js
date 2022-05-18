const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let replies = [
  `Hello! Yes, It's me.`,
  `Please stop to ping me!`,
  `Who is asking to be banned?`,
  `Did you call me?`,
  `Did you miss me?`,
  `No.`
];
let messageResponse = await lib.discord.channels['@0.3.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: [
    replies[Math.floor(Math.random() * replies .length)]
  ].join('\n'),
  message_reference: {
    message_id: context.params.event.id,
  },
  tts: false
});