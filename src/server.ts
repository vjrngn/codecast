import { Server } from 'http';
import { Application } from 'express';
import { config } from './config';

const http = require('http');
const initApp = require('./main');
import Logger from './logging/logger';

const logger = Logger('Server');

initApp(config).then((app: Application) => {
  /**
   * Get port from environment and store in Express.
   */
  const port = process.env.PORT || 3000;
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  const server: Server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      logger.error(`${process.env.PORT} is already in use`);
      process.exit(1);
    } else {
      throw error;
    }
  });
  server.on('listening', () => {
    logger.info(`Server listening on port ${port}`);
  });
});
