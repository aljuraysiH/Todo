const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

require('express-async-errors');
require('dotenv').config();
const errorHandler = require('./Error/errorHandler');
const notFound = require('./Util/NotFound');

const todoRouter = require('./Routes/TodoRoutes');
const userRouter = require('./Routes/UserRoutes');

const app = express();

// MIDDLEWARE
app.use(helmet());

app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  widnowMs: 60 * 60 * 1000,
  message: 'To many request from this IP, please try again in 1 hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());
app.use(hpp());

// Routes
app.use('/api/todo', todoRouter);
app.use('/api/user', userRouter);

app.use('*', notFound);

app.use(errorHandler);

module.exports = app;
