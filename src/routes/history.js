import express from 'express';
import db from '../db/database.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  const history = db.prepare('SELECT * FROM history WHERE user_id = ? ORDER BY timestamp DESC')
    .all(req.user.id);
  res.json(history);
});

router.post('/', authMiddleware, (req, res) => {
  const { ip_address, city, region, country } = req.body;
  const info = db.prepare(
    'INSERT INTO history (user_id, ip_address, city, region, country) VALUES (?, ?, ?, ?, ?)'
  ).run(req.user.id, ip_address, city, region, country);
  
  res.json({ id: info.lastInsertRowid });
});

router.delete('/', authMiddleware, (req, res) => {
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'No IDs provided' });
  }

  const placeholders = ids.map(() => '?').join(',');
  db.prepare(`DELETE FROM history WHERE id IN (${placeholders}) AND user_id = ?`)
    .run(...ids, req.user.id);
  res.json({ message: 'History cleared' });
});

export default router;
