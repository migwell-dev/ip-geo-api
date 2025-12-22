import Database from 'better-sqlite3';
const db = new Database('data.db');

db.pragma('foreign_keys = ON');

// users
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`).run();

// history
db.prepare(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    ip_address TEXT,
    city TEXT,
    region TEXT,
    country TEXT,
    loc TEXT,
    org TEXT,
    postal TEXT,
    timezone TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`).run();

export default db;
