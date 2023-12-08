import 'dotenv/config';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import userRouter from './routes/user.js';
import ordersRouter from './routes/orders.js';
import authRouter from './routes/auth.js';
import dbConnect from './config/dbConnection.js';
import escrowRoutes from './routes/escrow.js';

const app = express();
// Enable CORS for all routes
app.use(cors());
await dbConnect();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRouter);
app.use('/escrow', escrowRoutes);
app.use('/user', userRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});


export default app;
