const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { printDebug, printError, printWarning, printInfo } = require('./utils/logger.js');
const textRoutes = require('./routes/textRoutes.js');

const app = express();

app.disable('x-powered-by');

// HTTP Logging
const morganFormat = ':method :url :status :response-time ms';
app.use(
    morgan(morganFormat, {
        stream: {
            write: message => {
                printInfo(message.trim());
            }
        }
    })
)

// Application Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false} ))

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(()=> {
      printInfo("+++ Connected to MongoDB Successfully!");
  })
  .catch(error => {
      printError(error);
  })

// Routes
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        date: new Date(),
        message: "Service is running",
        uptime: process.uptime(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : "Disconnected"
    })
})

app.use('/texts', textRoutes);

// HTTP 404
app.use('*all', (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Requested route not found'
    })
})

app.use((err, req, res, next) => {
    printError(err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message || err
    })
})

module.exports = app
