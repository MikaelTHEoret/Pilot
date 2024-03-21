// codeRoute.js
const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

// Assume codeController methods are async and properly handle file operations

router.post('/save', codeController.saveCodeFile);
router.post('/run', codeController.runCodeFile);
router.delete('/delete', codeController.deleteCodeFile);
router.get('/files', codeController.getCodeFiles);

module.exports = router;
