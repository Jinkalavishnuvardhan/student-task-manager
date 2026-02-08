import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Faculty from '@/models/Faculty';

export async function GET() {
    try {
        await dbConnect();
        const faculty = await Faculty.find({});
        return NextResponse.json({ success: true, data: faculty });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch faculty' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();
        const facultyMember = await Faculty.create(body);
        return NextResponse.json({ success: true, data: facultyMember }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
