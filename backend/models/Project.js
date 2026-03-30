import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    technologies: [{
        type: String
    }],
    link: {
        type: String,
        default: ''
    },
    githubLink: {
        type: String,
        default: ''
    },
    liveLink: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
