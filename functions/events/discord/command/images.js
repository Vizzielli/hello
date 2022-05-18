const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const roles = await lib.discord.guilds['@0.1.2'].roles.list({
  guild_id: context.params.event.guild_id
});
const imageRoleId = roles.find(r => r.name === "images").id;
const modRoleId = roles.find(r => r.name === "moderators").id;

if(context.params.event.member.roles.includes(modRoleId)) {
  switch(context.params.event.data.options[0].value) {
    case '0':
      // Remove role
      await lib.discord.guilds['@0.1.3'].members.roles.destroy({
        role_id: imageRoleId,
        user_id: context.params.event.data.options[1].value,
        guild_id: context.params.event.guild_id
      });
      break;
    case '1':
      // Add role
      await lib.discord.guilds['@0.1.2'].members.roles.update({
        role_id: imageRoleId,
        user_id: context.params.event.data.options[1].value,
        guild_id: context.params.event.guild_id
      });
  }
}