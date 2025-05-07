import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
}));

app.use(express.json());

app.use('/api/users', userRoutes);

export default app;

