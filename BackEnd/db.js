// BackEnd/db.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Teste de conexão imediato ao iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error(' Erro ao conectar ao PostgreSQL:', err.message);
  } else {
    console.log(' Conectado com sucesso ao PostgreSQL (iris_db)!');
    release();
  }
});