import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_cms';

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is running optimally' });
});

// Import Routes
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import educationRoutes from './routes/education.js';
import messageRoutes from './routes/messages.js';

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
