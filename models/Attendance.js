import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['Student', 'Faculty'],
        required: true,
    },
    referenceId: { // Student ID or Faculty Employee ID
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Present',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
