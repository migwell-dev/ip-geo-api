import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth.js';
import historyRoutes from '../src/routes/history.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/history', historyRoutes);

app.get('/', (req, res) => {
  res.json({ message: "API is running at the /api root" });
});

export default app;
