// bot.js
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

let botInterval;
let previousAmount = 100; // Initial starting point
let marketMove = 'normal';

function startBot() {
    console.log('Bot started.');
    botInterval = setInterval(sendRandomInvestment, 1000);
}

function stopBot() {
    console.log('Bot stopped.');
    clearInterval(botInterval);
}

function generateRandomInvestment(previousAmount, marketMove) {
    const teams = ['Team A', 'Team B', 'Team C'];
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];

    let variation = (Math.random() - 0.5) * 20; // Allow variation in any direction

    switch (marketMove) {
        case 'uptrend':
            variation += Math.random() * 10 + 10; // Add positive variation in uptrend
            break;
        case 'downtrend':
            variation -= Math.random() * 10 + 10; // Add negative variation in downtrend
            break;
        case 'bullish':
            variation += Math.random() * 20 + 20; // Add positive variation in bullish
            break;
        default:
            break;
    }

    const amount = previousAmount + variation;
    return {
        team: randomTeam,
        amount: Math.round(amount)
    };
}


async function sendRandomInvestment() {
    try {
        const investment = generateRandomInvestment(previousAmount);
        previousAmount = investment.amount;
        await axios.post('http://localhost:5000/investment', investment);
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
