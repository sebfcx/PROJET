import '../helpers/env.loader.helper.js';
import pg from 'pg';

const client = new pg.Client(process.env.DATABASE_URL);

client.connect()
  .then(() => console.log('Connecté à la base de données PostgreSQL'))
  .catch(err => console.error('Erreur de connexion à la base de données PostgreSQL', err));

export default client;
