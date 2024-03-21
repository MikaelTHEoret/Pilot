document.addEventListener('DOMContentLoaded', () => {
    // Code to initialize and handle the chat interface
    initializeChat();

    // Code to handle the display of code output
    initializeCodeOutput();
});

function initializeChat() {
    // WebSocket connection setup
    const socket = new WebSocket('ws://localhost:3001'); // Adjust the URL as needed

    // Event listeners for WebSocket
    socket.onopen = function() {
        console.log('Chat WebSocket connection established');
    };

    socket.onmessage = function(event) {
        const messageData = JSON.parse(event.data);
        displayChatMessage(messageData);
    };

    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };

    // Additional logic for sending messages, etc.
}

function displayChatMessage(messageData) {
    // Logic to display chat messages on the page
}

function initializeCodeOutput() {
    // Logic to handle displaying code output, possibly fetched from the server or updated in real-time
}
