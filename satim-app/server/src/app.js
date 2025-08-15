import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import projectsRoutes from "./routes/projectsRoutes.js";
import surveysRoutes from "./routes/surveysRoutes.js";

dotenv.config();

const app = express();

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

const allowedOrigin = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://satim.onrender.com';
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/users'
    , userRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/surveys', surveysRoutes);

export default app;

