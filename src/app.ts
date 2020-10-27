import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { MiddlewaresBase } from './config/middlewares/base/middlewares-base';
import { DbConnect } from './config/database/db-connect';

const app = express();
app.set('view engine', 'html');
app.use(favicon(path.join(__dirname, '') + '/public/favicon.png'));
app.use(express.static(path.join(__dirname, '/api_logs')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
                'X-Requested-With,content-type, Authorization, accept-version, source,');
  next();
});

app.use(MiddlewaresBase.configuration);

// Catches 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Connects to database
const dbConnect = new DbConnect();

export = app;
