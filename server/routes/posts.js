import express from 'express';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/posts
// @desc    Create a post
router.post('/', protect, async (req, res) => {
    try {
        const { skillOffered, skillWanted } = req.body;

        const post = new Post({
            skillOffered,
            skillWanted,
            user: req.user._id
        });

        const createdPost = await post.save();

        // Populate user to match GET response format
        await createdPost.populate('user', 'name');

        res.status(201).json(createdPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post by owner
router.delete('/:id', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this post' });
        }

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
