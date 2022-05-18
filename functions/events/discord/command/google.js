const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const txt = context.params.event.data.options[0].value.toLowerCase();
const url = `https://google.com/search?q=` + fixedEncodeURIComponent(txt).replace(/%20/g, "+");

await lib.discord.channels['@0.2.0'].messages.create({
  "channel_id": context.params.event.channel_id,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Cool results here: **${txt}**!`,
      "description": `GOOGLE search offered by <@!${context.params.event.member.user.id}>!\n${url}`,
      "color": 0xffffff,
      "url": url,
      "thumbnail": {
        "url": `https://cdn.discordapp.com/attachments/925504155643179018/925509341149286430/google.jpg`,
        "height": 160,
        "width": 160
      },
      "footer": {
        "text": `Please always put some efforts on search engines before asking for help.`
      }
    }
  ]
});

// Encode URLs
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}