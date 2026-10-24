import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
console.log('Connecting to:', MONGO_URI ? 'URI found' : 'URI missing');

async function run() {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
        console.log('Connected to MongoDB Atlas successfully!');
        
        const postsCollection = mongoose.connection.collection('posts');
        const interestsCollection = mongoose.connection.collection('interests');
        
        const postsCount = await postsCollection.countDocuments();
        const interestsCount = await interestsCollection.countDocuments();
        
        console.log(`Found ${postsCount} posts and ${interestsCount} interests.`);
        
        const posts = await postsCollection.find({}).toArray();
        console.log('Posts:', JSON.stringify(posts, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

run();
