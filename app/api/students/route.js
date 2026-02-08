import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET() {
    try {
        await dbConnect();
        const students = await Student.find({});
        return NextResponse.json({ success: true, data: students });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch students' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();
        const student = await Student.create(body);
        return NextResponse.json({ success: true, data: student }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
