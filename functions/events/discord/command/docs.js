const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const txt = context.params.event.data.options[1].value.toLowerCase();

let type, color, image, url = ``;

switch(context.params.event.data.options[0].value.toLowerCase()) {
  case 'php':
    url = `https://php.net/` + fixedEncodeURIComponent(txt).replace(/%20/g, "+");
    color = 0x757ab3;
    image = `https://cdn.discordapp.com/attachments/925504155643179018/925504171493441616/php.jpg`;
    break;
  case 'mdn':
    url = `https://developer.mozilla.org/search?q=` + fixedEncodeURIComponent(txt).replace(/%20/g, "+");
    color = 0x000000;
    image = `https://cdn.discordapp.com/attachments/925504155643179018/925507866759147591/mdn.jpg`;
    break;
}

await lib.discord.channels['@0.2.0'].messages.create({
  "channel_id": context.params.event.channel_id,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Read more about: **${txt}**!`,
      "description": `${context.params.event.data.options[0].value.toUpperCase()} docs offered by <@!${context.params.event.member.user.id}>!\n${url}`,
      "color": color,
      "url": url,
      "thumbnail": {
        "url": image,
        "height": 160,
        "width": 160
      },
      "footer": {
        "text": `Please read the content of this page carefully before asking again.`
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