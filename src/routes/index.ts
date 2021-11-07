import { Application, Router } from "express";

export interface RouteDefinition {
  name: string;
  path: string;
  router: Router;
}

export function registry(app: Application) {
  if (typeof app.routes === 'undefined') {
    app.routes = {}
    app.routes.registry = {};
  }

  const { registry } = app.routes;

  return {
    register(routeDefinition: RouteDefinition) {
      if (!registry.hasOwnProperty(routeDefinition.name)) {
        registry[routeDefinition.name] = routeDefinition;
      }

      app.use(routeDefinition.path, routeDefinition.router);
    }
  }
}
