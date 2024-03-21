const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    messages: [String],  // Updated field to store an array of messages
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);

module.exports = ChatHistory;