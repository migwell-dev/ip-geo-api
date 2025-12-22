import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth.js';
import historyRoutes from '../src/routes/history.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'https://geo-frontend-ten.vercel.app',
    'https://ip-geo-api.vercel.app',
    /^http:\/\/localhost:\d+$/
  ],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/history', historyRoutes);

app.get('/api', (req, res) => {
  res.json({ message: "API is running at the /api root" });
});

export default app;
