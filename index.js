import './app/helpers/env.loader.helper.js';
import http from 'node:http';
import logger from './app/helpers/logger.helper.js';
import app from './app/index.app.js';

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  logger.log(`Listening on http://localhost:${port}`);
});
