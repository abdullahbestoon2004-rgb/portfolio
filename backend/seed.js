import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Profile from './models/Profile.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_cms';

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected for seeding'))
    .catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
    try {
        // Clear existing data
        await Admin.deleteMany();
        await Profile.deleteMany();

        // Create Admin
        const admin = new Admin({
            email: 'abdullabestoon100@gmail.com',
            password: 'Abdulla2004h' // Will be hashed by pre-save hook
        });
        await admin.save();
        console.log('Admin user seeded: abdullabestoon100@gmail.com / Abdulla2004h');

        // Create basic profile
        const profile = new Profile({
            name: 'John Doe',
            subtitle: 'Developer / Designer / Creative Thinker',
            aboutDescription: 'I am a passionate creative developer building modern web and mobile applications with a focus on premium, interactive experiences.',
            yearsOfExperience: 5,
            projectsCompleted: 24,
            email: 'hello@johndoe.com',
            githubLink: 'https://github.com',
            linkedinLink: 'https://linkedin.com'
        });
        await profile.save();
        console.log('Initial profile seeded');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
