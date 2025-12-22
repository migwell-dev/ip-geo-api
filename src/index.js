import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import historyRoutes from './routes/history.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/history', historyRoutes);

app.listen(8000, () => console.log('Server running on port 8000'));
