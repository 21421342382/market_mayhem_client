const axios = require('axios');
const http = require('http');

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
  axios.post('https://market-mayhem-main.onrender.com/investment', investment)
    .then(response => {
      console.log('Random investment sent successfully:', investment);
    })
    .catch(error => {
      console.error('Error sending random investment:', error);
    });
}

// Interval to send random investment data every 5 seconds
setInterval(sendRandomInvestment, 1000);

// Define content for the response page
const responsePageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bot is Alive</title>
</head>
<body>
    <h1>Bot is Alive!</h1>
    <p>This page confirms that the bot script is running and accessible.</p>
</body>
</html>
`;

// Create a simple HTTP server to serve the response page
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(responsePageContent);
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Response server is running and accessible at http://localhost:3000');
});
