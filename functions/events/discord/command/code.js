const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  channel_id: context.params.event.channel_id,
  content: [
    `<@!${context.params.event.member.user.id}> sent ${context.params.event.data.options[0].value.toUpperCase()} code:`,
    '```' + context.params.event.data.options[0].value.toLowerCase(),
    context.params.event.data.options[1].value,
    '```'
  ].join('\n')
});
