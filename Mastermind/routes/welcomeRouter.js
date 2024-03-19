const express = require('express');

const welcomeRouter = express.Router();

// Welcome route sending a message to the client
welcomeRouter.get('/', (req, res) => {
  try {
    res.send('Welcome to Mastermind App!'); // Message to be sent to the client
  } catch (error) {
    console.error('Error in sending welcome message:', error); // Logging error message and trace in case of an error
    res.status(500).send('Internal Server Error'); // Sending an internal server error response if an error occurs
  }
});

// Route to handle the /welcome route
welcomeRouter.get('/welcome', (req, res) => {
  try {
    res.send('Welcome to Mastermind App!'); // Send a welcome message to the client when accessing /welcome
  } catch (error) {
    console.error('Error in sending welcome message:', error); // Log any error that occurs
    res.status(500).send('Internal Server Error'); // Return an internal server error response if there's an error
  }
});

module.exports = welcomeRouter;