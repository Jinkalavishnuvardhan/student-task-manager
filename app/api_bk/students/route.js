import dbConnect from '../../../lib/mongodb';
import Student from '../../../models/Student';

export async function GET(req) {
    await dbConnect();
    try {
        const students = await Student.find({});
        return Response.json({ success: true, data: students });
    } catch (error) {
        return Response.json({ success: false }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const student = await Student.create(body);
        return Response.json({ success: true, data: student }, { status: 201 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}
