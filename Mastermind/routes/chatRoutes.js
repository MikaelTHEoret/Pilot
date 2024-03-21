const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');

// Route to get all chat history
router.get('/chatHistory', async (req, res) => {
    try {
        const chatHistory = await ChatHistory.find();
        res.json(chatHistory);
    } catch (error) {
        console.error('Error getting chat history:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to add a new chat message to history
router.post('/chatHistory', async (req, res) => {
    const { message, user } = req.body;

    if (!message || !user) {
        return res.status(400).json({ message: 'Message and User are required fields' });
    }

    try {
        const newMessage = new ChatHistory({
            message,
            user,
            timestamp: new Date()
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error adding chat message to history:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;