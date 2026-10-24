import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

async function seedGuest() {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
        console.log('Connected to MongoDB Atlas...');

        const demoAccounts = [
            { name: 'Guest 1', email: 'guest1@gmail.com', password: '12345678' },
            { name: 'Guest 2', email: 'guest2@gmail.com', password: '12345678' }
        ];

        for (const account of demoAccounts) {
            const existing = await User.findOne({ email: account.email });
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(account.password, salt);

            if (existing) {
                existing.password = hashedPassword;
                await existing.save();
                console.log(`Password reset for ${account.email} to ${account.password}`);
            } else {
                await User.create({
                    name: account.name,
                    email: account.email,
                    password: hashedPassword,
                    bio: `${account.name} recruiter demo account`
                });
                console.log(`Created ${account.email} with password ${account.password}`);
            }
        }
    } catch (err) {
        console.error('Error seeding guest user:', err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedGuest();
