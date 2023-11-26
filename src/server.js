const express = require('express');
const fetch = require('node-fetch'); // You can use 'node-fetch' for making requests

const app = express();

app.get('/riot-api', async (req, res) => {
  try {
    const response = await fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/chillycakes', {
      headers: {
        'X-Riot-Token': 'RGAPI-1bee5259-51ab-45d2-b36f-8b39a8f06167', // Use your Riot Games API key here
      }
    });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers ', 'Origin, Content-Type, Accept');
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});