import http from 'node:http';
import app from './app/index.app.js';
import './app/helpers/env.loader.helper.js';
import { logMoment, Logger } from './app/helpers/Logger/index.js';

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    Logger.info(`${logMoment.dateAndTime}: Listening on http://localhost:${port}`);
});
