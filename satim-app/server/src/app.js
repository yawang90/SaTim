import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import projectsRoutes from "./routes/projectsRoutes.js";

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
app.use('/api/projects', projectsRoutes);

export default app;

