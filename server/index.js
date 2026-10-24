import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import interestRoutes from './routes/interests.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/interests', interestRoutes);

app.get('/', (req, res) => {
    res.send('SkillSwap Lite API is running...');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillswaplite';

const ensureGuestUsers = async () => {
    try {
        const demoAccounts = [
            { name: 'Guest 1', email: 'guest1@gmail.com', password: '12345678' },
            { name: 'Guest 2', email: 'guest2@gmail.com', password: '12345678' }
        ];

        for (const account of demoAccounts) {
            const existing = await User.findOne({ email: account.email });
            if (!existing) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(account.password, salt);
                await User.create({
                    name: account.name,
                    email: account.email,
                    password: hashedPassword,
                    bio: `${account.name} recruiter demo account`
                });
                console.log(`Demo account auto-seeded: ${account.email}`);
            }
        }
    } catch (err) {
        console.error('Error auto-seeding demo users:', err.message);
    }
};

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected successfully');
        await ensureGuestUsers();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.log('MongoDB connection failed:', error.message));

