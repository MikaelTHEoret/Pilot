const express = require('express');
const app = express();
const welcomeRouter = require('./routes/welcomeRouter');
const errorRoutes = require('./routes/errorRoutes'); // Ensure this file exports a router

// Middleware for parsing JSON payloads
app.use(express.json());

// Define the route for handling the /welcome path
app.use('/welcome', welcomeRouter);

// The errorRoutes would typically be mounted after all other route definitions
// Assuming errorRoutes is defined with proper error handling in its module

// General error handling middleware, which catches any errors that might occur in the above routes
// It's best practice to define this after all other app.use() calls
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
