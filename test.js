const axios = require('axios');

// Function to generate random investment data
function generateRandomInvestment(previousAmount) {
  const teams = ['Team A', 'Team B', 'Team C'];
  const randomTeam = teams[Math.floor(Math.random() * teams.length)];
  
  // Random variation between -10 and 10
  let variation = (Math.random() - 0.5) * 20; 

  // Randomly trigger a huge market cap event (1% chance)
  if (Math.random() < 0.01) { // 1% chance of a huge market cap event
    variation += (Math.random() * 200) + 200; // Increase by a random amount between 200 and 400
  }

  const amount = previousAmount + variation;
  return {
    team: randomTeam,
    amount: Math.max(1, Math.round(amount)) // Ensure the amount is at least 1 and round it to an integer
  };
}

let previousAmount = 0; // Initial amount

// Function to send random investment data to the server
function sendRandomInvestment() {
  const investment = generateRandomInvestment(previousAmount);
  previousAmount = investment.amount;
  axios.post('http://localhost:5000/investment', investment)
    .then(response => {
      console.log('Random investment sent successfully:', investment);
    })
    .catch(error => {
      console.error('Error sending random investment:', error);
    });
}

// Interval to send random investment data every 5 seconds
setInterval(sendRandomInvestment, 1000);
