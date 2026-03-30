import express from 'express';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST new
router.post('/', protect, async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// PUT update
router.put('/:id', protect, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!skill) return res.status(404).json({ message: 'Not found' });
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE
router.delete('/:id', protect, async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Not found' });
        await skill.deleteOne();
        res.json({ message: 'Skill removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
