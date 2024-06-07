// bot.js
const axios = require('axios');

let botInterval;
let previousAmount = 0;
let marketMove = 'normal';

function startBot() {
    console.log('Bot started.');
    botInterval = setInterval(sendRandomInvestment, 1000);
}

function stopBot() {
    console.log('Bot stopped.');
    clearInterval(botInterval);
}

function generateRandomInvestment(previousAmount) {
    const teams = ['Team A', 'Team B', 'Team C'];
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];

    let variation = (Math.random() - 0.5) * 20;

    switch (marketMove) {
        case 'uptrend':
            if (Math.random() < 0.7) { // 70% chance for uptrend
                variation += Math.random() * 10 + 10;
            } else { // 30% chance for downtrend
                variation -= Math.random() * 10 + 10;
            }
            break;
        case 'downtrend':
            if (Math.random() < 0.7) { // 70% chance for downtrend
                variation -= Math.random() * 10 + 10;
            } else { // 30% chance for uptrend
                variation += Math.random() * 10 + 10;
            }
            break;
        case 'bullish':
            if (Math.random() < 0.5) { // 50% chance for uptrend
                variation += Math.random() * 20 + 20;
            } else { // 50% chance for downtrend
                variation -= Math.random() * 10 + 10;
            }
            break;
        default:
            break;
    }

    const amount = previousAmount + variation;
    return {
        team: randomTeam,
        amount: Math.max(1, Math.round(amount))
    };
}

async function sendRandomInvestment() {
    try {
        const investment = generateRandomInvestment(previousAmount);
        previousAmount = investment.amount;
        const response = await axios.post('https://market-mayhem-main.onrender.com/investment', investment);
        console.log('Random investment sent successfully:', investment);
    } catch (error) {
        console.error('Error sending random investment:', error);
    }
}

function setMarketMove(move) {
    marketMove = move;
    console.log('Market move set to:', marketMove);
}

function setStartingPoint(amount) {
    previousAmount = amount;
    console.log('Starting point set to:', previousAmount);
}

module.exports = { startBot, stopBot, setMarketMove, setStartingPoint };
