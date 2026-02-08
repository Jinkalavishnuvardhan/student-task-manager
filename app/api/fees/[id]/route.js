import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fee from '@/models/Fee';

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const fee = await Fee.findById(id);
        if (!fee) {
            return NextResponse.json({ success: false, error: 'Fee record not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: fee });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = await params;
    try {
        const body = await request.json();
        await dbConnect();
        const fee = await Fee.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!fee) {
            return NextResponse.json({ success: false, error: 'Fee record not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: fee });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const deletedFee = await Fee.findByIdAndDelete(id);
        if (!deletedFee) {
            return NextResponse.json({ success: false, error: 'Fee record not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: deletedFee });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
