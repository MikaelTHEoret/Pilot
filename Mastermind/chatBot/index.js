// index.js
const express = require('express');
const mongoose = require('mongoose');  // Added for MongoDB integration
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection setup with error handling
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();  // Connect to MongoDB

app.use(express.json());

// Define route for handling chat requests
app.use('/chat', require('./routes/chatRoutes'));

// MongoDB schema/model for chat history
const ChatHistory = require('./models/ChatHistory');  // Added for chat history storage

// POST request to store chat history
app.post('/chat/store', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});