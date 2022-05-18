const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const what = context.params.event.data.options[0].value.toLowerCase();

let url, title, description, footer = ``;

switch(what) {
  case '0':
    url = `https://dontasktoask.com/`;
    title = `Please: **don't ask to ask**. Just ask!`;
    description = `<@!${context.params.event.member.user.id}> suggest you to read this:\n${url}`;
    footer = `Look at #rules and prove that you have read it or you will not be able to expect answers to your questions.`;
    break;
  case '1':
    url = `https://dontasktoask.com/`;
    txtitlet = `Please: **don't say you need help**. Just ask!`;
    description = `<@!${context.params.event.member.user.id}> suggest you to read this:\n${url}`;
    footer = `Look at #rules and prove that you have read it or you will not be able to expect answers to your questions.`;
    break;
}

await lib.discord.channels['@0.2.0'].messages.create({
  "channel_id": context.params.event.channel_id,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": title,
      "description": description,
      "color": 0xfe0000,
      "url": url,
      "thumbnail": {
        "url": `https://cdn.discordapp.com/attachments/500061004378669067/976212221665366086/stop.jpg`,
        "height": 160,
        "width": 160
      },
      "footer": {
        "text": footer
      }
    }
  ]
});