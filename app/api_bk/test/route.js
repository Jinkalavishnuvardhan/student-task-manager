import { NextResponse } from 'next/server';

export async function GET(req) {
    return NextResponse.json({ success: true, message: 'Fresh API working' });
}
