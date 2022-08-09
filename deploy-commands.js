const { SlashCommandBuilder, Routes, PermissionFlagsBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.js');
const { springRepositorys, reactRepositorys } = require('./assets.js');

const repositorys = [...springRepositorys, ...reactRepositorys];

const commandRepositorys = repositorys.map((repository) => {
  return new SlashCommandBuilder()
  .setName(`${repository}`)
  .setDescription(`${repository} 의 모든 PR을 Merge 합니다`)
})

const commands = commandRepositorys.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('성공했습니다'))
  .catch(console.error);
