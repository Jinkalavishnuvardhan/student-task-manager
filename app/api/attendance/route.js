import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const type = searchParams.get('type');

        let query = {};
        if (date) {
            // Create start and end of day for the given date
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        }
        if (type) {
            query.type = type;
        }

        const attendanceRecords = await Attendance.find(query);
        return NextResponse.json({ success: true, data: attendanceRecords });
    } catch (error) {
        console.error('Attendance fetch error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch attendance' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();

        // Check if record already exists for this person on this date
        // Note: This logic depends on business rules. Assuming one record per day per person.
        // For now, simple create.

        // We might receive an array of records to mark attendance for multiple students
        if (Array.isArray(body)) {
            const records = await Attendance.insertMany(body);
            return NextResponse.json({ success: true, data: records }, { status: 201 });
        } else {
            const attendance = await Attendance.create(body);
            return NextResponse.json({ success: true, data: attendance }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
