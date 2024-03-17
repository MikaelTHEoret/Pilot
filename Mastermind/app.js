const express = require('express');
const app = express();
const http = require('http');

const PORT = 3001; 

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;