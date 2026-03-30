import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/messages
// @desc    Submit a contact form message (Public)
router.post('/', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to send message' });
    }
});

// @route   GET /api/messages
// @desc    Get all messages (Protected)
router.get('/', protect, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/messages/:id/read
// @desc    Mark message as read (Protected)
router.put('/:id/read', protect, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Not found' });

        message.read = true;
        await message.save();

        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message (Protected)
router.delete('/:id', protect, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Not found' });

        await message.deleteOne();
        res.json({ message: 'Message removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
