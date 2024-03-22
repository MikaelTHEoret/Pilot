const express = require("express");
const router = express.Router();

// Import the userController
const userController = require('../controllers/userController');

// Define the route for user registration with a callback function
router.post("/register", userController.register);

// Add more routes as needed
// For example:
// router.get("/profile", userController.profile);
// router.post("/update", userController.updateProfile);

module.exports = router;
