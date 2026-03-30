import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
