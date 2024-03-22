const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid'); // For generating unique client IDs

const chatWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        // Assign a unique ID to each client
        ws.id = uuidv4();
        console.log(`Client connected: ${ws.id}`);

        ws.on('message', (data) => {
            try {
                // Attempt to parse the incoming message
                const message = JSON.parse(data);
                // Add server timestamp to the message
                const enrichedMessage = {
                    ...message,
                    timestamp: new Date(),
                    senderId: ws.id // Include sender ID
                };

                // Broadcast the enriched message to all connected clients except the sender
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(enrichedMessage));
                    }
                });
            } catch (error) {
                console.error('Error processing message:', error);
                // Optionally, send an error message back to the sender
                ws.send(JSON.stringify({ error: 'Error processing your message.' }));
            }
        });

        ws.on('close', () => {
            console.log(`WebSocket connection closed: ${ws.id}`);
        });

        ws.on('error', (error) => {
            console.error(`WebSocket error from ${ws.id}:`, error);
        });
    });

    wss.on('error', (error) => {
        console.error('WebSocket Server error:', error);
    });
};

module.exports = chatWebSocket;
