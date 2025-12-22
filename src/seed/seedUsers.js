// RUN THIS ONCE TO SEED ISER 
import bcrypt from "bcryptjs";
import db from  "../db/database.js";

const email = 'test@example.com';
const plainPassword = 'password123';

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(plainPassword, salt);

db.prepare(`
  INSERT OR IGNORE INTO users (email, password)
  VALUES (?, ?)
`).run(email, hash);

console.log('[LOG] User seeded');
