//index.js
const express = require('express');
const app = express();
const port = 3001;

// Updated welcome message
console.log('Welcome to Mastermind App!');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});