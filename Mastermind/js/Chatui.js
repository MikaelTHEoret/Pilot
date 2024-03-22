document.addEventListener('DOMContentLoaded', () => {
    // Dynamically determine the WebSocket connection URL
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${wsProtocol}://${window.location.host}`;
    const ws = new WebSocket(wsUrl);

    const chatBox = document.getElementById('chat-box') || document.createElement('div');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Attempt to retrieve a stored user ID; if none exists, generate a new one
    let userId = sessionStorage.getItem('userId');
    if (!userId) {
        userId = generateUniqueId();
        sessionStorage.setItem('userId', userId);
    }

    ws.onopen = () => {
        console.log('Connected to the chat server');
        // Optionally announce the user has joined
        sendMessage({ type: 'join', userId });
    };

    ws.onmessage = event => {
        const message = JSON.parse(event.data);
        // Extend to handle different message types
        switch (message.type) {
            case 'chat':
                displayMessage(message);
                break;
            case 'notification':
                displayNotification(message);
                break;
            // Future message types can be added here
        }
    };

    ws.onclose = () => console.log('Disconnected from the chat server');
    ws.onerror = error => console.error('WebSocket error:', error);

    sendButton.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (text) {
            sendMessage({ type: 'chat', text, userId, timestamp: new Date().toISOString() });
            messageInput.value = '';
        }
    });

    function sendMessage(message) {
        ws.send(JSON.stringify(message));
        // For user messages, display immediately for a responsive UI
        if (message.type === 'chat') {
            displayMessage({ ...message, fromUser: true });
        }
    }

    function displayMessage({ text, timestamp, fromUser }) {
        const timeString = timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();
        const messageElement = document.createElement('div');
        messageElement.textContent = `[${timeString}] ${text}`;
        messageElement.className = fromUser ? 'message user' : 'message';
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
    }

    function displayNotification({ text }) {
        // Implement as needed, e.g., displaying in a dedicated notification area
        console.log('Notification:', text);
    }

    function generateUniqueId() {
        return `user_${Math.random().toString(36).substr(2, 9)}`;
    }
});
