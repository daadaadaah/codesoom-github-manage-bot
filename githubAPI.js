const axios = require('axios');

const { gihtubToken } = require('./config.js');

const BASIC_GITHUB_API_URL = 'https://api.github.com/repos';

const owner = 'codesoom'; 
// const owner = 'gringrape-juice';

const getAllPRsFromRepository = async (repository) => {
  const URL =  `${BASIC_GITHUB_API_URL}/${owner}/${repository}/pulls`;

  const reponse = await axios.get(URL, {
    headers: {
      "content-type": "application/json",
      "User-Agent": "node/https",
      Authorization: `token ${gihtubToken}`,
    },
  });

  const openPRs = reponse.data;

  const numbers = openPRs.map((openPR) => openPR.number);

  return numbers;
}

const mergePR = ({repository, PRNumber}) => {
  const URL =  `${BASIC_GITHUB_API_URL}/${owner}/${repository}/pulls/${PRNumber}/merge`;

  return axios.put(URL, {
    merge_method: 'merge'
  }, {
    headers: {
      "content-type": "application/json",
      "User-Agent": "node/https",
      Authorization: `token ${gihtubToken}`,
    },
  });
}

const mergePRs = async ({repository, PRNumbers}) => {
  const responses = await Promise.allSettled(PRNumbers.map((PRNumber) => mergePR({ repository, PRNumber })));

  const results = [];
  responses.forEach(async (result, index) => {


    if (result.status === 'fulfilled') {
      results.push({
        PRNumber: PRNumbers[index],
        status: 'fulfilled',
        result: JSON.stringify(result.value.data) 
      });
    }

    if (result.status === 'rejected') {
      const { } = 
      
      results.push({
        PRNumber: PRNumbers[index],
        status: 'rejected',
        result: JSON.stringify(result.reason)
      });
    }
  });

  return results
}

module.exports = { getAllPRsFromRepository, mergePR, mergePRs };