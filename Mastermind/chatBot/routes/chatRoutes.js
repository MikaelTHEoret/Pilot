const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');

// POST request to store chat history
router.post('/store', async (req, res) => {
    try {
        const { userId, message } = req.body;
        const newChat = new ChatHistory({ userId, message });
        await newChat.save();
        res.status(201).json({ success: true, data: newChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// GET request to fetch chat history
router.get('/history', async (req, res) => {
    try {
        const chatHistory = await ChatHistory.find();
        res.status(200).json({ success: true, data: chatHistory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// PUT request to update chat history
router.put('/update/:id', async (req, res) => {
    try {
        const { userId, message } = req.body;
        const updatedChat = await ChatHistory.findByIdAndUpdate(req.params.id, { userId, message }, { new: true });
        if (!updatedChat) {
            return res.status(404).json({ success: false, error: 'Chat not found' });
        }
        res.status(200).json({ success: true, data: updatedChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;