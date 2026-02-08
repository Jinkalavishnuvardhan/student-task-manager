'use client';

import { useState, useEffect } from 'react';

export default function FeesPage() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        studentRollNumber: '',
        studentName: '',
        amount: '',
        type: 'Tuition',
        status: 'Pending',
        dueDate: '',
    });

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const res = await fetch('/api/fees');
            const data = await res.json();
            if (data.success) {
                setFees(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch fees:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentName = async (rollNumber) => {
        if (!rollNumber) {
            setFormData({ ...formData, studentRollNumber: '', studentName: '' });
            return;
        }
        try {
            const res = await fetch('/api/students');
            const data = await res.json();
            if (data.success) {
                const student = data.data.find(s => s.rollNumber === rollNumber);
                if (student) {
                    setFormData({ ...formData, studentRollNumber: rollNumber, studentName: student.name });
                } else {
                    setFormData({ ...formData, studentRollNumber: rollNumber, studentName: '' });
                    alert('Student not found with this roll number');
                }
            }
        } catch (error) {
            console.error('Failed to fetch student:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.studentName) {
            alert('Please enter a valid student roll number');
            return;
        }
        try {
            const res = await fetch('/api/fees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setFees([data.data, ...fees]);
                setFormData({
                    studentRollNumber: '',
                    studentName: '',
                    amount: '',
                    type: 'Tuition',
                    status: 'Pending',
                    dueDate: '',
                });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Failed to add fee record:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRollNumberChange = (e) => {
        fetchStudentName(e.target.value);
    };

    const handleDelete = async (id, studentName) => {
        if (!confirm(`Are you sure you want to delete fee record for ${studentName}?`)) return;

        try {
            const res = await fetch(`/api/fees/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setFees(fees.filter(fee => fee._id !== id));
            } else {
                alert(data.error || 'Failed to delete fee record');
            }
        } catch (error) {
            console.error('Failed to delete fee record:', error);
            alert('Failed to delete fee record');
        }
    };

    if (loading) return <div className="container"><p>Loading fees...</p></div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Fees Management</h1>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                {/* Add Fee Record Form */}
                <div className="card">
                    <h3>Add Fee Record</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Student Roll Number</label>
                            <input
                                type="text"
                                name="studentRollNumber"
                                value={formData.studentRollNumber}
                                onChange={handleRollNumberChange}
                                className="form-control"
                                placeholder="Enter roll number to auto-fetch student"
                                required
                            />
                            {formData.studentName && (
                                <div style={{
                                    marginTop: '0.5rem',
                                    padding: '0.5rem',
                                    backgroundColor: '#e7f5e7',
                                    borderRadius: '4px',
                                    color: '#2d5f2d',
                                    fontSize: '0.9rem'
                                }}>
                                    ✓ Student: <strong>{formData.studentName}</strong>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="Tuition">Tuition</option>
                                <option value="Bus">Bus</option>
                                <option value="Exam">Exam</option>
                                <option value="Library">Library</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Record</button>
                    </form>
                </div>

                {/* Fees List */}
                <div className="card">
                    <h3>Fee Records ({fees.length})</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Student</th>
                                <th style={{ padding: '0.5rem' }}>Type</th>
                                <th style={{ padding: '0.5rem' }}>Amount</th>
                                <th style={{ padding: '0.5rem' }}>Status</th>
                                <th style={{ padding: '0.5rem' }}>Date</th>
                                <th style={{ padding: '0.5rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee) => (
                                <tr key={fee._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>
                                        <div>{fee.studentName}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{fee.studentRollNumber}</div>
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>{fee.type}</td>
                                    <td style={{ padding: '0.5rem' }}>${fee.amount}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <span style={{
                                            color: fee.status === 'Paid' ? 'green' : 'orange',
                                            fontWeight: 'bold'
                                        }}>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>{new Date(fee.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <button
                                            onClick={() => handleDelete(fee._id, fee.studentName)}
                                            className="btn btn-danger"
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.875rem',
                                                backgroundColor: '#dc3545',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                color: 'white'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
