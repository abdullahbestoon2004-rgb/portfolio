import express from 'express';
import Education from '../models/Education.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const education = await Education.find().sort({ createdAt: -1 });
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', protect, async (req, res) => {
    try {
        const education = await Education.create(req.body);
        res.status(201).json(education);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!education) return res.status(404).json({ message: 'Not found' });
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ message: 'Not found' });
        await education.deleteOne();
        res.json({ message: 'Education removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
