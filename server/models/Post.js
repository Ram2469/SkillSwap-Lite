import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    skillOffered: { type: String, required: true },
    skillWanted: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);
