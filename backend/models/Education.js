import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
