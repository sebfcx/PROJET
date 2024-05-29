import pg from 'pg';
import dotenv from 'dotenv';
import { Logger } from './Logger/logger.js';

dotenv.config();

const client = new pg.Client(process.env.DATABASE_URL);

client.connect()

if(client.connect()) {
  Logger.info('Connecté à la base de données PostgreSQL');
}

export default client;
