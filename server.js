// server.js
const express = require('express');
const { startBot, stopBot, setMarketMove, setStartingPoint } = require('./bot');

const app = express();
const port = 3000;

app.use(express.json());

// Serve the dashboard page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

// Endpoint to start the bot
app.post('/start-bot', (req, res) => {
  startBot();
  res.sendStatus(200);
});

// Endpoint to stop the bot
app.post('/stop-bot', (req, res) => {
  stopBot();
  res.sendStatus(200);
});

// Endpoint to apply a market move
app.post('/apply-market-move', (req, res) => {
    const { marketMove } = req.body;
    setMarketMove(marketMove);
    res.sendStatus(200);
});

// Endpoint to apply the starting point
app.post('/apply-starting-point', (req, res) => {
    const { startingAmount } = req.body;
    setStartingPoint(parseInt(startingAmount));
    res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
