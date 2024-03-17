
const express = require('express');
const router = express.Router();


router.get('/chat', (req, res) => {
    res.render('chat'); // Render the 'chat.ejs' view
});

module.exports = router;