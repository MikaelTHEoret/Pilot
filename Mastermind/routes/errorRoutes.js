const express = require('express');
const router = express.Router();

// Route to handle 404 errors
router.use((req, res, next) => {
    res.status(404).send("404 - Page not found");
});

module.exports = router;