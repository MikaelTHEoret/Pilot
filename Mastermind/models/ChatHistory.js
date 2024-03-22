const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    // Add more fields as needed, e.g., type, status, etc.
});

const chatHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Consider referencing the User model if applicable
        required: true,
        index: true, // Improve performance for queries filtering by userId
    },
    messages: [messageSchema],  // Using a subdocument schema for messages
    // The main timestamp can represent the creation time of the chat session
});

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);

module.exports = ChatHistory;
