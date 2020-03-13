const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const caseRouter = require('./routes/caseRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

//1) Middlewares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/users', userRouter);
app.use('/api/cases', caseRouter);
app.use('/', viewRouter);

module.exports = app;
