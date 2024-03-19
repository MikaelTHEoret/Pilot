const express = require('express');
const app = express();
const welcomeRouter = require('./routes/welcomeRouter');
const errorRoutes = require('./routes/errorRoutes'); // Import the errorRoutes

app.use(express.json());

// Define the route for handling the /welcome path
app.use('/welcome', welcomeRouter);

// Include the errorRoutes for handling errors
app.use(errorRoutes);

// Define a general error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;