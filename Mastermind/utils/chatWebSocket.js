const WebSocket = require('ws');

const chatWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket.');

        ws.on('message', (message) => {
            console.log('Received message:', message);
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed.'); 
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error); 
        });
    });

    wss.on('error', (error) => {
        console.error('WebSocket Server error:', error); 
    });
};

module.exports = chatWebSocket;
