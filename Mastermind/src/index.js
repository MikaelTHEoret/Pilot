const express = require('express');
const path = require('path');
const http = require('http'); // Import the HTTP module
const WebSocket = require('ws');
const chatWebSocket = require('./utils/chatWebSocket'); // Adjust the path as necessary
const router = require('./routes'); // Adjust the path as necessary, assuming routes are at the root level of src

const app = express();
const port = process.env.PORT || 3001;

// Create an HTTP server and pass the Express app as the handler
const server = http.createServer(app);

// Initialize WebSocket server with the HTTP server
chatWebSocket(server);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Use the router for your application's routes
app.use('/', router);

// Fallback route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Listen on the HTTP server, not the Express app
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Welcome to Mastermind App!');
});
