const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const error = require('./middleware/error');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

// Route files
const bootcamps = require('./routes/route-bootcamps');
const auth = require('./routes/route-auth');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth);

// Custom Error handler
app.use(error);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
