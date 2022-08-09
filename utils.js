const getRepository = ({ commandName }) => { // 예 : react-week4-2
  const reactWeekNumber = commandName.slice(0, commandName.length-2); // 예 : 'react-week4'
  const assignmentNumber = commandName.slice(-2, commandName.length); // 예 : -2

  return `${reactWeekNumber}-assignment${assignmentNumber}`; // react-week4-assignment-2  
}

module.exports = { getRepository };