// import dbConnect from '../../lib/mongodb';
// import Student from '../../models/Student';
// import Faculty from '../../models/Faculty';
// import Subject from '../../models/Subject';
// import Fee from '../../models/Fee';

export async function GET(req) {
    // await dbConnect();
    // try {
    // const studentCount = await Student.countDocuments();
    // const facultyCount = await Faculty.countDocuments();
    // const subjectCount = await Subject.countDocuments();
    // const pendingFeesCount = await Fee.countDocuments({ status: 'Pending' });

    return Response.json({
        success: true,
        data: {
            students: 0,
            faculty: 0,
            subjects: 0,
            pendingFees: 0
        }
    });
    // } catch (error) {
    //     return Response.json({ success: false }, { status: 400 });
    // }
}
