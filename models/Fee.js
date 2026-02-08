import mongoose from 'mongoose';

const FeeSchema = new mongoose.Schema({
    studentRollNumber: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String, // Tuition, Bus, Exam, etc.
        default: 'Tuition',
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
    }
});

export default mongoose.models.Fee || mongoose.model('Fee', FeeSchema);
