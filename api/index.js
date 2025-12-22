import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth.js';
import historyRoutes from '../src/routes/history.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
