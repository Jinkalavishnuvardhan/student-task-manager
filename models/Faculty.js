import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    employeeId: {
        type: String,
        required: [true, 'Please provide an Employee ID'],
        unique: true,
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject specialization'],
    },
    qualification: {
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

export default mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
