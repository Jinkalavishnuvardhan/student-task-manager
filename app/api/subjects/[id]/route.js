import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subject from '@/models/Subject';

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const subject = await Subject.findById(id);
        if (!subject) {
            return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: subject });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = await params;
    try {
        const body = await request.json();
        await dbConnect();
        const subject = await Subject.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!subject) {
            return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: subject });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const deletedSubject = await Subject.findByIdAndDelete(id);
        if (!deletedSubject) {
            return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: deletedSubject });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
