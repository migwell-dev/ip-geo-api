import bcrypt from "bcryptjs";
import db from "../db/database.js";

const seed = async () => {
  const email = 'test@example.com';
  const plainPassword = 'password123';

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainPassword, salt);

  try {
    const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.rows.length === 0) {
      await db.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hash]
      );
      console.log('[LOG] User seeded: test@example.com / password123');
    } else {
      console.log('[LOG] Seeder skipped: User already exists');
    }
  } catch (error) {
    console.error('[ERROR] Seeding failed:', error.message);
  } finally {
    process.exit();
  }
};

seed();
