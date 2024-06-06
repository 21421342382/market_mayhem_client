const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/investment', async (req, res) => {
    const investment = req.body;

    try {
        // Send the investment data to the main chart server
        const url = await axios.post('https://market-mayhem-main.onrender.com/investment', investment);
        console.log(url)
        res.status(200).send('Investment processed successfully');
    } catch (error) {
        res.status(500).send('Error processing investment');
    }
});

app.listen(4000, () => console.log('User actions server listening on port 4000'));
