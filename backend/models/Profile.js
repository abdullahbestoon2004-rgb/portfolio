import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    aboutDescription: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    },
    yearsOfExperience: {
        type: Number,
        default: 0
    },
    projectsCompleted: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true
    },
    githubLink: {
        type: String,
        default: ''
    },
    linkedinLink: {
        type: String,
        default: ''
    },
    instagramLink: {
        type: String,
        default: ''
    }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
