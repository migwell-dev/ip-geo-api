import Database from 'better-sqlite3';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

let db;

// switches db based on env variables, cloud vs local
if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  db = {
    query: async (text, params = []) => {
      let index = 1;
      const pgText = text.replace(/\?/g, () => `$${index++}`);

      try {
        const res = await pool.query(pgText, params);

        return {
          rows: res.rows,
          lastId: res.rows[0]?.id || (res.rowCount > 0 ? true : null)
        };
      } catch (err) {
        console.error('Postgres Query Error:', err.message);
        throw err;
      }
    }
  };
  console.log('Using Cloud Database (Supabase)');
} else {
  const sqlite = new Database('data.db');

  sqlite.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT)`)
  .run();

  sqlite.prepare(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_id INTEGER, 
    ip_address TEXT, 
    city TEXT, 
    region TEXT, 
    country TEXT, 
    lat REAL,
    lng REAL, 
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`)
  .run();

  db = {
    query: async (text, params) => {
      const stmt = sqlite.prepare(text);
      if (text.trim().toLowerCase().startsWith('select')) {
        return { rows: stmt.all(...params) };
      } else {
        const info = stmt.run(...params);
        return { rows: [], lastId: info.lastInsertRowid };
      }
    }
  };
  console.log('Using Local Database (SQLite)');
}

export default db;
