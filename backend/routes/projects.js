import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const normalizeProjectPayload = (body) => {
    const technologies = Array.isArray(body.technologies)
        ? body.technologies
        : String(body.technologies || '')
            .split(',')
            .map((tech) => tech.trim())
            .filter(Boolean);

    const image = body.image || body.imageUrl || '';
    const liveLink = body.liveLink || body.link || '';

    return {
        title: body.title?.trim(),
        description: body.description?.trim(),
        image,
        imageUrl: image,
        technologies,
        link: liveLink,
        liveLink,
        githubLink: body.githubLink?.trim() || '',
        featured: Boolean(body.featured)
    };
};

// @route   GET /api/projects
// @desc    Get all projects (Public)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/projects
// @desc    Create a project (Protected)
router.post('/', protect, async (req, res) => {
    try {
        const project = await Project.create(normalizeProjectPayload(req.body));
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Invalid project data' });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project (Protected)
router.delete('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/projects/:id
// @desc    Update a project (Protected)
router.put('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            normalizeProjectPayload(req.body),
            { new: true, runValidators: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
