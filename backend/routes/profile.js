import express from 'express';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/profile
// @desc    Get profile data (Public)
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/profile
// @desc    Update profile data (Protected)
router.put('/', protect, async (req, res) => {
    try {
        let profile = await Profile.findOne();

        if (profile) {
            // Update existing
            profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
            res.json(profile);
        } else {
            // Create new if doesn't exist (failsafe)
            profile = await Profile.create(req.body);
            res.status(201).json(profile);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
