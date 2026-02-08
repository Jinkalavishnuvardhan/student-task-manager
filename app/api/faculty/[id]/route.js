import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Faculty from '@/models/Faculty';

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const faculty = await Faculty.findById(id);
        if (!faculty) {
            return NextResponse.json({ success: false, error: 'Faculty not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: faculty });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = await params;
    try {
        const body = await request.json();
        await dbConnect();
        const faculty = await Faculty.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!faculty) {
            return NextResponse.json({ success: false, error: 'Faculty not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: faculty });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
            return NextResponse.json({ success: false, error: 'Faculty not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: deletedFaculty });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
