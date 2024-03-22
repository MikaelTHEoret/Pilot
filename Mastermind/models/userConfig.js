// File: models/UserConfig.js

const mongoose = require('mongoose');

const userConfigSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  theme: {
    type: String,
    default: 'default',
  },
  notifications: {
    type: Boolean,
    default: true,
  },
  apiEndpoint: {
    type: String,
    default: 'http://localhost:3000/api',
  },
  apiKey: {
    type: String,
    default: '',
  },
  chatModel: {
    type: String,
    default: 'default',
  },
  chatEndpoint: {
    type: String,
    default: 'http://localhost:3000/chat',
  },
  chatApiKey: {
    type: String,
    default: '',
  },
  httpHeaders: {
    type: Object,
    default: {},
  },
  httpTimeout: {
    type: Number,
    default: 5000,
  },
  maxChatHistory: {
    type: Number,
    default: 100,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  sendOnEnter: {
    type: Boolean,
    default: true,
  },
  messageSound: {
    type: Boolean,
    default: true,
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: Number,
    default: 14,
  },
  fontFamily: {
    type: String,
    default: 'Arial',
  },
  // Add more configuration options as needed
});

const UserConfig = mongoose.model('UserConfig', userConfigSchema);

module.exports = UserConfig;