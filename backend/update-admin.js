import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_cms';

mongoose.connect(MONGO_URI).then(async () => {
    await Admin.deleteMany();
    const admin = new Admin({
      email: 'abdullabestoon100@gmail.com',
      password: 'Abdulla2004h'
    });
    await admin.save();
    console.log('Admin credentials updated safely without touching the profile data.');
    process.exit();
});
