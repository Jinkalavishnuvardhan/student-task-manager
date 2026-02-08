const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-manager';

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: { type: String, unique: true },
  class: String,
  section: String,
  contactNumber: String,
  createdAt: { type: Date, default: Date.now },
});

const facultySchema = new mongoose.Schema({
  name: String,
  employeeId: { type: String, unique: true },
  subject: String,
  email: String,
  department: String,
  contactNumber: String,
  createdAt: { type: Date, default: Date.now },
});

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const feeSchema = new mongoose.Schema({
  studentRoll: String,
  amount: Number,
  status: String,
});

const attendanceSchema = new mongoose.Schema({
  studentRoll: String,
  date: Date,
  status: String,
});

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to', MONGODB_URI);

    const Student = mongoose.model('Student', studentSchema);
    const Faculty = mongoose.model('Faculty', facultySchema);
    const Subject = mongoose.model('Subject', subjectSchema);
    const Task = mongoose.model('Task', taskSchema);
    const Fee = mongoose.model('Fee', feeSchema);
    const Attendance = mongoose.model('Attendance', attendanceSchema);

    // Clear existing
    await Promise.all([
      Student.deleteMany({}),
      Faculty.deleteMany({}),
      Subject.deleteMany({}),
      Task.deleteMany({}),
      Fee.deleteMany({}),
      Attendance.deleteMany({}),
    ]);

    // Create sample students
    const students = await Student.insertMany([
      { name: 'Alice Johnson', rollNumber: 'S001', class: '10', section: 'A', contactNumber: '555-0101' },
      { name: 'Bob Smith', rollNumber: 'S002', class: '10', section: 'B', contactNumber: '555-0102' },
      { name: 'Charlie Brown', rollNumber: 'S003', class: '9', section: 'A', contactNumber: '555-0103' },
    ]);

    // Sample faculty (include employeeId and subject to satisfy schema/indexes)
    const faculty = await Faculty.insertMany([
      { name: 'Dr. Emily Clark', employeeId: 'F001', subject: 'Mathematics', email: 'emily.clark@example.com', department: 'Mathematics', contactNumber: '555-0201' },
      { name: 'Mr. John Doe', employeeId: 'F002', subject: 'Science', email: 'john.doe@example.com', department: 'Science', contactNumber: '555-0202' },
    ]);

    // Subjects
    const subjects = await Subject.insertMany([
      { name: 'Algebra', code: 'MATH101', description: 'Basic algebra topics' },
      { name: 'Biology', code: 'SCI201', description: 'Intro to biology' },
    ]);

    // Tasks
    const tasks = await Task.insertMany([
      { title: 'Prepare syllabus', description: 'Prepare syllabus for term', status: 'pending' },
      { title: 'Grade tests', description: 'Grade midterm papers', status: 'pending' },
    ]);

    // Fees
    const fees = await Fee.insertMany([
      { studentRoll: 'S001', amount: 5000, status: 'paid' },
      { studentRoll: 'S002', amount: 5000, status: 'pending' },
    ]);

    // Attendance
    const attendance = await Attendance.insertMany([
      { studentRoll: 'S001', date: new Date(), status: 'present' },
      { studentRoll: 'S002', date: new Date(), status: 'absent' },
    ]);

    console.log('Seeding complete:', {
      students: students.length,
      faculty: faculty.length,
      subjects: subjects.length,
      tasks: tasks.length,
      fees: fees.length,
      attendance: attendance.length,
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

main();
