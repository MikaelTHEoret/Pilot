require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const welcomeRouter = require("./routes/welcomeRouter");
const errorRoutes = require("./routes/errorRoutes");
const authRoutes = require('./routes/authRoutes');
const chatRoute = require('./routes/chatRoute'); // Import the chat route
const chatWebSocket = require('./utils/chatWebSocket');

if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
    console.error("Error: config environment variables not set. Please create/edit .env configuration file.");
    process.exit(-1);
}

const app = express();

// Configure session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Standard Express setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// Database connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.error(`Database connection error: ${err.message}`);
        process.exit(1);
    });

// Application routes
app.use('/welcome', welcomeRouter);
app.use(authRoutes);
app.use('/chat', chatRoute); // Use the chat route
app.get("/", (req, res) => res.render("index"));
app.use(errorRoutes); // Error handling routes

// 404 handler - this should be after all of your app.use routes
app.use((req, res) => res.status(404).send("Page not found."));

// Global error handler
app.use((err, req, res, next) => {
    console.error(`Unhandled application error: ${err.message}`);
    res.status(500).send("There was an error serving your request.");
});

const port = process.env.PORT || 3001;

// Create the HTTP server from 'app'
const httpServer = require('http').createServer(app);

// Initialize WebSocket communication
chatWebSocket(httpServer);

// Listen on the provided port, on all network interfaces
httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (error) => {
    console.error(`Server error: ${error.message}`);
});

// Typically, you might not need to export 'app' when using 'httpServer'
// so this could be removed unless needed for testing or other reasons
// module.exports = app;
