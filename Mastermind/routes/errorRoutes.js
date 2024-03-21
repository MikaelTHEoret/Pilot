const express = require('express');
const router = express.Router();

// Route to handle 404 errors
router.use((req, res, next) => {
    try {
        res.status(404).send("404 - Page not found");
    } catch (error) {
        console.error('Error handling 404:', error);
        res.status(404).send("404 - Page not found");
    }
});

module.exports = router;