import dbConnect from '../../../lib/mongodb';
import Fee from '../../../models/Fee';
import Student from '../../../models/Student';

export async function GET(req) {
    await dbConnect();
    try {
        const fees = await Fee.find({}).sort({ date: -1 });
        return Response.json({ success: true, data: fees });
    } catch (error) {
        return Response.json({ success: false }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();

        // Verify student exists
        const student = await Student.findOne({ rollNumber: body.studentRollNumber });
        if (!student) {
            return Response.json({ success: false, error: 'Student not found with this Roll Number' }, { status: 404 });
        }

        const feeData = {
            ...body,
            studentName: student.name
        };

        const fee = await Fee.create(feeData);
        return Response.json({ success: true, data: fee }, { status: 201 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}
