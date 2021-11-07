import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import createError from 'http-errors';
import { ApplicationConfiguration } from './config';
import { connect } from './database';
import adminRouter from './routes/admin';
import { VideoService } from './services/video-service/video-service';
import { getRepository } from 'typeorm';
import { Video } from './entities/Video';
import LocalFileService from './services/file-service/local-file-service';
import { registry } from './routes';


module.exports = async function (config: ApplicationConfiguration) {
  await connect(config);

  const videoService = new VideoService(getRepository(Video), new LocalFileService({
    destination: path.join(__dirname, 'public', 'uploads')
  }));

  const app = express();
  const routeRegistry = registry(app);

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'twig');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.locals.isActiveRoute = function (path: string) {
      const currentPath = request.baseUrl + request.path;
      return path === currentPath;
    };
    next();
  });

  // Register routes
  routeRegistry.register(adminRouter({ videoService }));

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
