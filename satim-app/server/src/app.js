import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const allowedOrigin = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://satim-client.onrender.com';

app.use(cors({
    origin: allowedOrigin
}));

app.use(express.json());

app.use('/api/users', userRoutes);

export default app;

