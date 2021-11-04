import { Request, Response, Router } from 'express';
import { RouteDefinition } from '.';

export default (): RouteDefinition => {
  const router = Router();
  router.get('/', function (request: Request, response: Response) {
    return response.render('admin/index', {
      title: 'Vijay'
    });
  });

  return {
    path: '/admin',
    router: router,
  }
}