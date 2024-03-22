require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const connectDB = require('./databases/mongoDB');
const userConfigRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const welcomeRouter = require("./routes/welcomeRouter");
const chatHistoryRoutes = require('./routes/chatHistoryRoutes');
const chatRoute = require('./routes/chatRoute');
const codeGenerationRoutes = require('./routes/codeGenerationRoutes');
const aiAssistanceRoute = require('./routes/aiAssistanceRoute');
const errorRoutes = require("./routes/errorRoutes");
const authMiddleware = require('./middleware/authMiddleware');
const csrfProtection = require('./middleware/csrfProtection');
const inputValidation = require('./middleware/inputValidation');
const rateLimiting = require('./middleware/rateLimiting');
const chatWebSocket = require('./utils/chatWebSocket');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
}));

// Apply middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/welcome', welcomeRouter);
app.use('/auth', authRoutes);
app.use('/chat', authMiddleware, [chatHistoryRoutes, chatRoute]); // Apply authMiddleware here
app.use('/code', authMiddleware, codeGenerationRoutes); // Apply authMiddleware here
app.use('/ai', authMiddleware, aiAssistanceRoute); // Apply authMiddleware here

// Route for the root URL ("/")
app.get("/", (req, res) => {
    res.render("index", { session: req.session }); // Passing session to index view
});

app.use(errorRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).send("404 - Page Not Found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// WebSocket for real-time chat
const httpServer = require('http').createServer(app);
chatWebSocket(httpServer);

// Start the server
httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (error) => {
    console.error(`Server startup error: ${error.message}`);
});
