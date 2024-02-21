import 'dotenv/config';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
// import passport from 'passport';
// import bodyParser from 'body-parser';
// import { Strategy as BearerStrategy } from 'passport-http-bearer'; // Add this line
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import userRouter from './routes/user.js';
import ordersRouter from './routes/orders.js';
import authRouter from './routes/auth.js';
import dbConnect from './config/dbConnection.js';
import escrowRoutes from './routes/escrow.js';
import ignitiaRoutes from './routes/ignitia.js';
import bidRouter from './routes/bid.js'
import cropRouter from './routes/crop.js'
import insuranceRouter from './routes/insurance.js'
import farmRouter from './routes/farmer.js'
import eeRouter from './routes/ee.js'

// import collectiveRoutes from './routes/collective.js';
// import CollectiveModel from './models/Collective.js';

const app = express();
// Enable CORS for all routes
app.use(cors());
await dbConnect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(passport.initialize());

// Passport.js configuration for API Key/Token strategy
// passport.use(new BearerStrategy(
//   (token, done) => {
//     // Add your logic to validate and find the collective by token
//     // This is a basic example, replace it with your logic

//     // Check if the token is valid and not expired
//     if (!isValidToken(token)) {
//       return done(null, false);
//     }

//     // Find the collective by the token
//     CollectiveModel.findOne({ apiToken: token }, (err, collective) => {
//       if (err) { return done(err); }
//       if (!collective) { return done(null, false); }

//       // Optionally, you can check additional conditions here
//       // For example, you might want to check if the collective is active

//       return done(null, collective);
//     });
//   }
// ));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRouter);
app.use('/escrow', escrowRoutes);
app.use('/user', userRouter);
app.use('/ignitia', ignitiaRoutes);
app.use('/bid', bidRouter);
app.use('/', cropRouter);
app.use('/insurance', insuranceRouter);
app.use('/', farmRouter);
app.use('/', eeRouter);

// Set timeout to 10 minutes (adjust as needed)
app.timeout = 600000; // 10 minutes in milliseconds

// app.use('/collectives', collectiveRoutes);

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
