const { Client, GatewayIntentBits } = require('discord.js');

const { token } = require('./config.js');

const { getAllPRsFromRepository, mergePR, mergePRs } = require('./githubAPI.js');

const { getRepository } = require('./utils.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

  const repository = getRepository({ commandName });
  // const repository = "trio";

  try {
    const openPRNumbers = await getAllPRsFromRepository(repository);

    if(openPRNumbers.length === 0) {
      await interaction.reply(`${repository} 에는 Merge 할 PR이 없습니다!`);
      return
    }

    const results = await mergePRs({ repository, PRNumbers: openPRNumbers });
    const totalPRsSize = results.length;

    const successResults = results.filter((result) => result.status === 'fulfilled');
    const totalSuccessResultsSize = successResults.length;

    const rejectedResults = results.filter((result) => result.status === 'rejected');
    const totalRejectedResultsSize = rejectedResults.length;

    const rejectedPRURLs = rejectedResults.map((rejectedResult) => {
      const owner = 'codesoom'; 
      // const owner = "gringrape-juice";

      return `https://github.com/${owner}/${repository}/pull/${rejectedResult.PRNumber}`
    });

    if(totalPRsSize === totalSuccessResultsSize) {
      const successMessage = `${repository} 에 모든 PR(${totalPRsSize}개)이 모두 Merge에 성고하였습니다! 🎉`;

      await interaction.reply(successMessage);
    
    } else {
      let failedMessage = `
      ${repository} 에서 총 ${totalPRsSize}개의 PR 중 아래 ${totalRejectedResultsSize}개의 PR이 Merge에 실패했습니다. 한번 확인해주세요! 😅
< 📝 실패한 PR >`;

rejectedPRURLs.forEach((rejectedPRURL)=> {
      failedMessage = failedMessage+`
- ${rejectedPRURL}`})

      await interaction.reply(failedMessage);
    }
  } catch (error) {
    console.log(error)
  }
});

client.login(token);
