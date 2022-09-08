const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const fileupload = require('express-fileupload');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to Database
connectDB();

const app = express();

//Body Parser
app.use(express.json());

app.use(cookieParser());

//File uploads
app.use(fileupload());

//Set static folder
app.use(express.static('public  '));

// app.use(logger);

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`.red);

  //Close server and exit process

  server.close(() => process.exit(1));
});
