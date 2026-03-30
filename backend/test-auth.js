import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_cms').then(async () => {
    const admin = await Admin.findOne({ email: 'abdullabestoon100@gmail.com' });
    console.log('Admin found:', admin ? 'Yes' : 'No');
    if (admin) {
        const isMatch = await admin.matchPassword('Abdulla2004h');
        console.log('Password match:', isMatch ? 'Yes' : 'No');
    }
    process.exit();
}).catch(console.error);
