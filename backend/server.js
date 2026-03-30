import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './lib/db.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
