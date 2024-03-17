const WebSocket = require('ws');

const chatWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
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
            console.error('WebSocket error:', error.message, error.stack); 
        });
    });

    wss.on('error', (error) => {
        console.error('WebSocket Server error:', error.message, error.stack); 
    });
};

module.exports = chatWebSocket;