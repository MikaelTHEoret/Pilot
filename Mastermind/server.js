
const express = require('express');
const http = require('http'); 
const app = express();
const path = require('path'); 
const chatWebSocket = require('./utils/chatWebSocket'); 

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


app.get('/chat', (req, res) => {
    
    res.render('chat'); 
});


app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something went wrong!');
});

const server = http.createServer(app);


chatWebSocket(server);


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});