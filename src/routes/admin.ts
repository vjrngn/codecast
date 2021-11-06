import { Request, Response, Router } from 'express';
import moment from 'moment';
import multer from 'multer';
import { RouteDefinition } from '.';
import { VideoService } from '../services/video-service';

const upload = multer();

export interface Dependencies {
  videoService: VideoService
}

export default ({ videoService }: Dependencies): RouteDefinition => {
  const router = Router();
  router.get('/', function (request: Request, response: Response) {
    return response.render('admin/index', {
      title: 'Vijay'
    });
  });

  router.get('/videos', function (request: Request, response: Response) {
    videoService.getVideos().then((result) => {
      return response.render('admin/videos/index', {
        videos: result.data
      });
    })
  });

  router.get('/videos/create', function (request: Request, response: Response) {
    return response.render('admin/videos/create');
  });

  router.post('/videos/create', upload.single('video'), function (request: Request, response: Response) {
    videoService.addVideo({
      title: request.body.title,
      description: request.body.description,
      publishAt: moment().format('YYYY-MM-DD'),
      file: {
        name: request.file!.originalname,
        mimetype: request.file!.mimetype,
        blob: request.file!.buffer
      }
    }).then((uploadResult) => {
      return response.redirect('/admin/videos/create');
    }).catch((error) => {
      return response.json({ success: false, error });
    });
  });

  return {
    path: '/admin',
    router: router,
  }
}