import { NextFunction, Request, Response } from 'express';
import { ApplicationConfiguration } from './config';
import { connect } from './database';

const createError = require('http-errors');
const express = require('express');
const path = require('path');

module.exports = async function (config: ApplicationConfiguration) {
  await connect(config);
  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'twig');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  // catch 404 and forward to error handler
  app.use(function (request: Request, response: Response, next: NextFunction) {
    next(createError(404));
  });

  // error handler
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
};
