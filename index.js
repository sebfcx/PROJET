import './app/helpers/env.loader.helper.js';
import http from 'node:http';
import { logMoment, Logger } from './app/helpers/Logger/index.js';
import app from './app/index.app.js';

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    Logger.info(`${logMoment.dateAndTime}: Listening on http://localhost:${port}`);
});
