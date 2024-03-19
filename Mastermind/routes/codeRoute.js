const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

// Define routes for code functionalities

// Route to save code file
router.post('/save', codeController.saveCodeFile); // Make sure saveCodeFile function is defined in the codeController

// Route to run code file
router.post('/run', codeController.runCodeFile); // Make sure runCodeFile function is defined in the codeController

// Route to delete code file
router.delete('/delete', codeController.deleteCodeFile); // Make sure deleteCodeFile function is defined in the codeController

// Route to get code files
router.get('/files', codeController.getCodeFiles); // Make sure getCodeFiles function is defined in the codeController

module.exports = router;