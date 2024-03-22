const express = require('express');
const axios = require('axios');


const welcomeRouter = express.Router();

// Route handler for GET /welcome
welcomeRouter.get('/', (req, res) => {
  res.send(welcomeMessage);// Use the imported welcome message
});

// Route handler for POST /welcome/ai-assist
welcomeRouter.post('/ai-assist', (req, res) => {
  const { inputText } = req.body;

  if (!inputText) {
    return res.status(400).send('Input text is required');
  }

  // Make API request using Axios
  axios.post('https://api.openai.com/v1/chat/completions', { inputText })
    .then(response => {
     //Handle successful response
      res.json(response.data); // Send the response data back to the client
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
      res.status(500).send('An error occurred while processing your request');
    });
});

module.exports = welcomeRouter;
