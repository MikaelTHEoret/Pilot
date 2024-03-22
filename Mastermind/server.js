require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const connectDB = require('./databases/mongoDB'); // Correct path according to the directory map

// Importing routes
const authRoutes = require('./routes/authRoutes');
const welcomeRouter = require("./routes/welcomeRouter");
const chatHistoryRoutes = require('./routes/chatHistoryRoutes');
const chatRoute = require('./routes/chatRoute'); // Assuming you want to include this as well
const codeGenerationRoutes = require('./routes/codeGenerationRoutes');
const aiAssistanceRoute = require('./routes/aiAssistanceRoute');
const errorRoutes = require("./routes/errorRoutes");

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const csrfProtection = require('./middleware/csrfProtection');
const inputValidation = require('./middleware/inputValidation');
const rateLimiting = require('./middleware/RateLimiting');

const chatWebSocket = require('./utils/chatWebSocket'); // WebSocket setup

connectDB(); // Database connection

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet()); // Secure HTTP headers
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// Applying middleware
// Note: Adjust middleware application as needed, for example, applying authMiddleware globally or to specific routes
app.use('/welcome', welcomeRouter);
app.use('/auth', authRoutes);
app.use('/chat', [chatHistoryRoutes, chatRoute]); // Combined chat functionality
app.use('/code', codeGenerationRoutes);
app.use('/ai', aiAssistanceRoute);
app.get("/", (req, res) => res.render("index"));
app.use(errorRoutes);

// Error handling and not found
app.use((req, res, next) => {
    res.status(404).send("404 - Page Not Found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// WebSocket for real-time chat
const httpServer = require('http').createServer(app);
chatWebSocket(httpServer); // Initialize WebSocket with the server

httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (error) => {
    console.error(`Server startup error: ${error.message}`);
});
