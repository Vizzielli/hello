const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if(context.params.event.data.options.length > 0) {
  // Use the parameter value
  await lib.discord.guilds['@0.2.4'].members.update({
    user_id: context.params.event.member.user.id,
    guild_id: context.params.event.guild_id,
    nick: nickBeautify(context.params.event.data.options[0].value, context.params.event.member.user.discriminator)
  });
}
else {
  // Use username without a parameter value
   await lib.discord.guilds['@0.2.4'].members.update({
     user_id: context.params.event.member.user.id,
     guild_id: context.params.event.guild_id,
     nick: nickBeautify(context.params.event.member.user.username, context.params.event.member.user.discriminator)
   });
}

function nickBeautify(inputNickname, userDiscriminator) {
  // Allow A-Z a-z 0-9 chars and convert in lowercase
  const validChars = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "-", "_",
                "á", "à", "â", "ä", "ã", "å", "ç", "é", "è", "ê", "ë", "í", "ì",
                "î", "ï", "ñ", "ó", "ò", "ô", "ö", "õ", "ø", "ú", "ù", "û", "ü" ];
  const spaceChars = [ " ", "-", "_" ];
  // Vars
  let nickname = "";
  let spacesBefore = 1;
  let nicknameChars = inputNickname.toLowerCase().split("");
  // Loop chars
  nicknameChars.forEach(function(c) {
    // Remove unwanted chars
    if(!validChars.includes(c)) {
      c = "";
    }
    else {
    // Manage valid chars
      if(!spaceChars.includes(c)) {
      // Valid chars only
        if(spacesBefore > 0) {
          c = c.toUpperCase();
          spacesBefore = 0;
        }
      }
      else {
          // Space or dash only
        if(spacesBefore > 0) {
          c = "";
        }
        else {
          spacesBefore++;
        }
      }
    }
    // Add the char to the nickname
    nickname += c;
  });
  // If length is zero
  if(nickname.length < 1) {
    nickname = `User${userDiscriminator}`
  }
  return nickname;
}