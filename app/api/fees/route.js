import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fee from '@/models/Fee';

export async function GET() {
    try {
        await dbConnect();
        const fees = await Fee.find({});
        return NextResponse.json({ success: true, data: fees });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch fees' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();
        const fee = await Fee.create(body);
        return NextResponse.json({ success: true, data: fee }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
