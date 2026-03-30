import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './lib/db.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import educationRoutes from './routes/education.js';
import messageRoutes from './routes/messages.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is running optimally' });
});

app.use('/api', async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        console.error('MongoDB connection error:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/messages', messageRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({
        message: error.message || 'Server error',
    });
});

export default app;
