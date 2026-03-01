import express from 'express';
import Interest from '../models/Interest.js';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/interests
// @desc    Express interest in a post
router.post('/', protect, async (req, res) => {
    try {
        const { postId } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot show interest in your own post' });
        }

        const existingInterest = await Interest.findOne({
            post: postId,
            interestedUser: req.user._id
        });

        if (existingInterest) {
            return res.status(400).json({ message: 'Already expressed interest in this post' });
        }

        const interest = await Interest.create({
            post: postId,
            interestedUser: req.user._id
        });

        res.status(201).json(interest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/interests/my
// @desc    Get interests on posts created by logged-in user
router.get('/my', protect, async (req, res) => {
    try {
        // Find all posts by the logged-in user
        const myPosts = await Post.find({ user: req.user._id });
        const myPostIds = myPosts.map(post => post._id);

        // Find interests related to these posts
        const interests = await Interest.find({ post: { $in: myPostIds } })
            .populate('interestedUser', 'name')
            .populate('post', 'skillOffered skillWanted')
            .sort({ createdAt: -1 });

        res.json(interests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
