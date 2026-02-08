import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import Faculty from '@/models/Faculty';
import Subject from '@/models/Subject';
import Fee from '@/models/Fee';

export async function GET() {
    try {
        await dbConnect();

        // Fetch counts in parallel
        const [students, faculty, subjects, pendingFees] = await Promise.all([
            Student.countDocuments(),
            Faculty.countDocuments(),
            Subject.countDocuments(),
            Fee.countDocuments({ status: 'Pending' }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                students,
                faculty,
                subjects,
                pendingFees,
            },
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch dashboard stats' }, { status: 500 });
    }
}
