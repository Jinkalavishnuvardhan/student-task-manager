import dbConnect from '../../../lib/mongodb';
import Subject from '../../../models/Subject';

export async function GET(req) {
    await dbConnect();
    try {
        const subjects = await Subject.find({});
        return Response.json({ success: true, data: subjects });
    } catch (error) {
        return Response.json({ success: false }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const subject = await Subject.create(body);
        return Response.json({ success: true, data: subject }, { status: 201 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}
