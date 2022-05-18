// Add the welcome message via dm?
// Check for new users and post the message every x00 users? If so, store data to avoid msg repetition in low-term timing.

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const guild = await lib.discord.guilds['@0.1.0'].retrieve({
  guild_id: context.params.event.guild_id
});

const roles = await lib.discord.guilds['@0.1.2'].roles.list({
  guild_id: context.params.event.guild_id
});

const memberInfo = await lib.discord.guilds['@0.1.2'].members.retrieve({
  user_id: context.params.event.author.id,
  guild_id: context.params.event.guild_id
});

const membersRoleId = roles.find(r => r.name === "members").id;

let prefix = "!";
let reply = [];

// Avoid tries to edit owner nickname and his message deletion
if (context.params.event.author.id !== process.env.SERVER_OWNER) {
  
  // If members role not assigned before, assign it after the user first message
  if(!context.params.event.member.roles.includes(membersRoleId)) {
    await lib.discord.guilds['@0.1.2'].members.roles.update({
      role_id: membersRoleId,
      user_id: context.params.event.author.id,
      guild_id: context.params.event.guild_id
    });
  }
  
  // Nickname check and update
  if(memberInfo.nick !== "" && memberInfo.nick !== null && memberInfo.nick !== nickBeautify(memberInfo.nick, memberInfo.user.discriminator)) {
    // Use the nickname as reference
    await lib.discord.guilds['@0.1.2'].members.update({
      user_id: context.params.event.author.id,
      guild_id: context.params.event.guild_id,
      nick: nickBeautify(memberInfo.nick, memberInfo.user.discriminator)
    });
  }
  else if(memberInfo.user.username !== nickBeautify(memberInfo.user.username, memberInfo.user.discriminator)) {
    // Use the username as reference
    await lib.discord.guilds['@0.1.2'].members.update({
      user_id: context.params.event.author.id,
      guild_id: context.params.event.guild_id,
      nick: nickBeautify(memberInfo.user.username, memberInfo.user.discriminator)
    });
  }
  
}

// Prefix commands (remove this after multi-line params in slash commands update)
if (context.params.event.content.startsWith(prefix)) {
  let message = context.params.event.content.substr(1);
  let command = message.split(' ')[0].toLowerCase();
  let array_values = message.split(' ').slice(1);
  let text_content = array_values.join(' ');
  
  // !code command
  if (command === 'code') {
    reply = reply.concat([
      `<@${context.params.event.author.id}> sent ${array_values[0].toUpperCase()} code:`,
      '```' + array_values[0].toLowerCase() + '\n',
      array_values.slice(1).join(' ').replace(/\`/g, '\`') + '\n',
      '```'
    ]);
    await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: reply.join('\n')
    });
    // Remove users message (if not the owner, avoid errors)
    if (context.params.event.author.id !== process.env.SERVER_OWNER) {
      await lib.discord.channels['@0.0.3'].messages.destroy({
        message_id: context.params.event.id,
        channel_id: context.params.event.channel_id,
      });
    }
    
  }
  
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