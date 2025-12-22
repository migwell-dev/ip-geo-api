import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';

const router = express.Router();

console.log('authRoutes loaded');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const result = await db
    .query('SELECT * FROM users WHERE email = ?', [email]);
  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const JWT_SECRET = process.env.JWT_SECRET || '55eafd2b680aa54a59c3316c35cd233351828a059ef99c7a9c94a65dae69fde4';
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
});

export default router;
