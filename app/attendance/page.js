'use client';

import { useState, useEffect } from 'react';

export default function AttendancePage() {
    const [attendanceType, setAttendanceType] = useState('Student');
    const [people, setPeople] = useState([]); // Students or Faculty list
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPeople();
        fetchAttendance();
    }, [attendanceType]);

    const fetchPeople = async () => {
        try {
            const endpoint = attendanceType === 'Student' ? '/api/students' : '/api/faculty';
            const res = await fetch(endpoint);
            const data = await res.json();
            if (data.success) {
                setPeople(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch people:', error);
        }
    };

    const fetchAttendance = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const res = await fetch(`/api/attendance?date=${today}&type=${attendanceType}`);
            const data = await res.json();
            if (data.success) {
                setAttendanceRecords(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAttendance = async (person, status) => {
        try {
            const id = attendanceType === 'Student' ? person.rollNumber : person.employeeId;
            const res = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: attendanceType,
                    referenceId: id,
                    name: person.name,
                    status: status,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setAttendanceRecords([...attendanceRecords, data.data]);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Failed to mark attendance:', error);
        }
    };

    const getStatus = (id) => {
        const record = attendanceRecords.find(r => r.referenceId === id);
        return record ? record.status : null;
    };

    if (loading) return <div className="container"><p>Loading attendance...</p></div>;

    return (
        <div className="container">
            <div className="header">
                <h1>{attendanceType} Attendance</h1>
                <div>
                    <button
                        className={`btn ${attendanceType === 'Student' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setAttendanceType('Student')}
                        style={{ marginRight: '1rem' }}
                    >
                        Students
                    </button>
                    <button
                        className={`btn ${attendanceType === 'Faculty' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setAttendanceType('Faculty')}
                    >
                        Faculty
                    </button>
                </div>
            </div>

            <div className="card">
                <h3>Mark Attendance for Today ({new Date().toLocaleDateString()})</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                            <th style={{ padding: '0.5rem' }}>ID</th>
                            <th style={{ padding: '0.5rem' }}>Name</th>
                            <th style={{ padding: '0.5rem' }}>Status</th>
                            <th style={{ padding: '0.5rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person) => {
                            const id = attendanceType === 'Student' ? person.rollNumber : person.employeeId;
                            const currentStatus = getStatus(id);
                            return (
                                <tr key={person._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{id}</td>
                                    <td style={{ padding: '0.5rem' }}>{person.name}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        {currentStatus ? (
                                            <span style={{
                                                color: currentStatus === 'Present' ? 'green' : 'red',
                                                fontWeight: 'bold'
                                            }}>
                                                {currentStatus}
                                            </span>
                                        ) : 'Not Marked'}
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        {!currentStatus && (
                                            <>
                                                <button
                                                    className="btn btn-success"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}
                                                    onClick={() => markAttendance(person, 'Present')}
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                                                    onClick={() => markAttendance(person, 'Absent')}
                                                >
                                                    Absent
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
