import pg from 'pg';

const pool = new pg.Pool(process.env.DATABASE_URL);

pool.on('error', (err) => {
  logger.error('Erreur dans le pool de connexions PostgreSQL :', err);
});

export default pool;