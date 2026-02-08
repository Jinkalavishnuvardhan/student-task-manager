import dbConnect from '../../../lib/mongodb';
import Attendance from '../../../models/Attendance';
import Student from '../../../models/Student';
import Faculty from '../../../models/Faculty';

export async function GET(req) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get('date');
        const type = searchParams.get('type');

        let query = {};
        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        }
        if (type) query.type = type;

        const attendance = await Attendance.find(query);
        return Response.json({ success: true, data: attendance });
    } catch (error) {
        return Response.json({ success: false }, { status: 400 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();

        // Check if attendance already exists for this person on this date
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const existing = await Attendance.findOne({
            referenceId: body.referenceId,
            date: { $gte: startDate, $lte: endDate }
        });

        if (existing) {
            return Response.json({ success: false, error: 'Attendance already marked for today' }, { status: 400 });
        }

        const attendance = await Attendance.create(body);
        return Response.json({ success: true, data: attendance }, { status: 201 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 400 });
    }
}
