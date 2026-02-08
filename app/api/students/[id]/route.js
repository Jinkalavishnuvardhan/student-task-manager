import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const student = await Student.findById(id);
        if (!student) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: student });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = await params;
    try {
        const body = await request.json();
        await dbConnect();
        const student = await Student.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!student) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: student });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: deletedStudent });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
