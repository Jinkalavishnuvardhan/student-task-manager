import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subject from '@/models/Subject';

export async function GET() {
    try {
        await dbConnect();
        const subjects = await Subject.find({});
        return NextResponse.json({ success: true, data: subjects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch subjects' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();
        const subject = await Subject.create(body);
        return NextResponse.json({ success: true, data: subject }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
