import pg from 'pg';
import './env.loader.js';
import { Logger } from './Logger/index.js';

const client = new pg.Client(process.env.DATABASE_URL);

client.connect()

if(client.connect()) {
  Logger.info('Connecté à la base de données PostgreSQL');
}

export default client;
