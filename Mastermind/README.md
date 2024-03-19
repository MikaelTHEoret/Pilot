# Mastermind

Mastermind/
│
├── README.md
│   └── Overview, setup instructions, and general project information.
│
├── app.js
│   └── Application entry point, initializing the app and middleware setup.
│
├── server.js
│   └── Configures and starts the web server, handling requests.
│
├── controllers/
│   ├── aiAssistCoding.js
│   │   └── Handles AI-assisted coding features.
│   ├── aiController.js
│   │   └── Manages AI-related operations.
│   └── codeController.js
│       └── Facilitates code management and operations.
│
├── dist/
│   └── Contains compiled or build files.
│
├── models/
│   └── User.js
│       └── Describes the user model and schema.
│
├── public/
│   └── css/
│       ├── codeStyle.css
│       │   └── Styles related to code presentation.
│       └── style.css
│           └── General application stylesheet.
│
├── routes/
│   └── Organizes application routes and endpoints.
│
├── services/
│   └── Implements application logic and services.
│
├── src/
│   └── Contains source files requiring compilation or bundling.
│
├── utils/
│   └── Utility functions and helpers.
│
├── views/
│   └── Template files for rendering views.
│
├── nodemon.json
│   └── Nodemon configuration for automatic server restarts.
│
├── package.json
│   └── Project metadata and dependencies.
│
├── package-lock.json
│   └── Locked versions of installed packages.
│
├── tsconfig.json
│   └── TypeScript configuration settings.
│
└── webpack.config.js
    └── Webpack configuration for module bundling.






AI-assisted coding platform with a chat GPT interface.

## Overview

The app is a web application using Node.js with Express framework. It integrates AI capabilities for coding assistance and customization. The project structure includes routes, services, models, views, and configuration files.

## Features

- Chat Interface for interactive coding
- Local Project Development
- AI-Assisted Coding with GPT model
- GPT-Builder Feature for customizing AI behavior
- File Upload for review by AI

## Getting started

### Requirements

- Node.js
- MongoDB

### Quickstart

1. Clone the repository
2. Set up the .env file
3. Install dependencies with `npm install`
4. Start the server with `npm start`

### License

Copyright © 2024.

Enhanced Mastermind Project Guide Map with Critical Code Information
Root Directory: Mastermind/
app.js: Initializes the Express application and middleware.
Uses express.json() for body parsing.
Registers routes:
/welcome using welcomeRouter.
Error handling routes through errorRoutes.
Includes a general error handling middleware.
server.js: Configures and starts the server.
Sets up database connection with mongoose to process.env.DATABASE_URL.
Configures session handling with express-session and MongoStore, secured with process.env.SESSION_SECRET.
Uses ejs as the view engine and serves static files from the public directory.
Includes route handling for authentication (authRoutes) and a base route (/) rendering the index view.
Implements custom middleware to track session views and output session creation/access times.
Error handling for server errors and unhandled application errors.
Listens on process.env.PORT or 3001.
Directories:
controllers/:
Key functionality is handling specific application logic tied to routes.
models/:
User.js: Defines the schema for user data, critical for authentication and user management.
public/css/:
Contains styles that are essential for the visual presentation of the application.
