import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a subject name'],
        unique: true,
    },
    code: {
        type: String,
        required: [true, 'Please provide a subject code'],
        unique: true,
    },
    topics: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);
