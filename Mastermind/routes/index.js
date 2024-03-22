const express = require('express');
const router = express.Router();

// Example route
router.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Mastermind App!' });
});

module.exports = router;
