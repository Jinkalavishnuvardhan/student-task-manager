import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    rollNumber: {
        type: String,
        required: [true, 'Please provide a roll number'],
        unique: true,
    },
    class: {
        type: String,
        required: [true, 'Please provide a class/grade'],
    },
    section: {
        type: String,
        required: false,
    },
    contactNumber: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
