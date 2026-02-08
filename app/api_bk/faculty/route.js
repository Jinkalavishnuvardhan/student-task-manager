import dbConnect from '../../../lib/mongodb';
import Faculty from '../../../models/Faculty';

export async function GET(req) {
    await dbConnect();
    try {
        const faculty = await Faculty.find({});
        return Response.json({ success: true, data: faculty });
    } catch (error) {
        return Response.json({ success: false }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const faculty = await Faculty.create(body);
        return Response.json({ success: true, data: faculty }, { status: 201 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}
