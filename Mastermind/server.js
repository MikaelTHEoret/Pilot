const express = require("express");
const app = express();
const mongoose = require('mongoose'); // Require mongoose module
const User = require('./models/User');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
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
const chatWebSocket = require('./utils/chatWebSocket'); // Ensure this file is properly implemented
const loginRoutes = require('./routes/loginRoutes');

// Initialize Express app
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60, // Session expiration time in seconds (optional)
  }),
  cookie: {
    secure: false, // Set to true if your app is served over HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (optional)
  }
}));

// Passport initialization
require('./config/passport');
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Login route
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  if (req.user) {
    // authentication succeeded
    req.login(req.user, err => {
      // session setup
      req.session.user = req.user._id;
      // Redirect to appropriate page after login
      res.redirect('/dashboard');
    });
  } else {
    // auth failed, redirect to login
    res.redirect('/login');
  }
});

// Set up session middleware
// ...

// Make session available in all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(cookieParser());

// Apply helmet for security
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
  }
}));

// Apply middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to check session expiration
app.use(async (req, res, next) => {
  // Ensure proper session expiration handling based on session schema
  if (req.user && req.user.session.expires < Date.now()) {
    // logout - session expired
    await User.updateOne({ _id: req.user._id }, { $unset: { session: 1 } });
    res.redirect('/login');
  } else {
    next();
  }
});

// Set view engine to EJS and serve static files
app.set("view engine", "ejs");
app.use(express.static("public"));

// Define routers for chat, code, and AI functionalities
const chatRouter = express.Router();
const codeRouter = express.Router();
const aiRouter = express.Router();

// Apply authMiddleware to all routes within each router
chatRouter.use(authMiddleware);
codeRouter.use(authMiddleware);
aiRouter.use(authMiddleware);

// Add route handlers to each router
chatRouter.use(chatHistoryRoutes, chatRoute);
codeRouter.use(codeGenerationRoutes);
aiRouter.use(aiAssistanceRoute);

// Define routes
app.use('/welcome', welcomeRouter);
app.use('/auth', authRoutes);
app.use('/chat', chatRouter);
app.use('/code', codeRouter);
app.use('/ai', aiRouter);
app.use('/user', userConfigRoutes);
app.use('/auth', loginRoutes);

// Route for the root URL ("/")
app.get("/", (req, res) => {
  res.render("index", { session: req.session });
});

// Error handling routes
app.use(errorRoutes);

// 404 error handler
app.use((req, res, next) => {
  res.status(404).send("404 - Page Not Found");
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// WebSocket for real-time chat
const httpServer = require('http').createServer(app);
chatWebSocket(httpServer); // Ensure chatWebSocket function is properly implemented

// Start the server
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (error) => {
  console.error(`Server startup error: ${error.message}`);
});
