import express from 'express';
import db from '../db/database.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET all history for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM history WHERE user_id = ? ORDER BY timestamp DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
});

// POST new search result to history
router.post('/', authMiddleware, async (req, res) => {
  const { ip_address, city, region, country } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO history (user_id, ip_address, city, region, country) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, ip_address, city, region, country]
    );

    res.json({ id: result.lastId });
  } catch (error) {
    res.status(500).json({ message: 'Error saving history', error: error.message });
  }
});

// DELETE multiple history items
router.delete('/', authMiddleware, async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'No IDs provided' });
  }

  try {
    const placeholders = ids.map(() => '?').join(',');

    const queryText = `DELETE FROM history WHERE id IN (${placeholders}) AND user_id = ?`;

    await db.query(queryText, [...ids, req.user.id]);

    res.json({ message: 'Selected history cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting history', error: error.message });
  }
});

export default router;
