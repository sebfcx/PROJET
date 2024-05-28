import https from 'node:https';
import path from 'path';
import fs from 'fs';
import app from './app/app.js';
import dotenv from 'dotenv';
import { logMoment, Logger } from './app/helpers/Logger/logger.js';

dotenv.config();

const sslKey = path.resolve('ssl', 'key.pem');
const sslCert = path.resolve('ssl', 'cert.pem');

const ssl = {
    key: fs.readFileSync(sslKey, 'utf8'),
    cert: fs.readFileSync(sslCert, 'utf8')
};

const server = https.createServer(ssl, app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    Logger.info(`${logMoment.dateAndTime}: Listening on https://localhost:${port}`);
});