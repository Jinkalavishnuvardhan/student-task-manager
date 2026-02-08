'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        class: '',
        section: '',
        contactNumber: '',
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch('/api/students');
            const data = await res.json();
            if (data.success) {
                setStudents(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setStudents([...students, data.data]);
                setFormData({
                    name: '',
                    rollNumber: '',
                    class: '',
                    section: '',
                    contactNumber: '',
                });
            }
        } catch (error) {
            console.error('Failed to add student:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        try {
            const res = await fetch(`/api/students/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setStudents(students.filter(student => student._id !== id));
            } else {
                alert(data.error || 'Failed to delete student');
            }
        } catch (error) {
            console.error('Failed to delete student:', error);
            alert('Failed to delete student');
        }
    };

    // Inline edit state
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
        rollNumber: '',
        class: '',
        section: '',
        contactNumber: '',
    });

    const startEdit = (student) => {
        setEditingId(student._id);
        setEditData({
            name: student.name || '',
            rollNumber: student.rollNumber || '',
            class: student.class || '',
            section: student.section || '',
            contactNumber: student.contactNumber || '',
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({ name: '', rollNumber: '', class: '', section: '', contactNumber: '' });
    };

    const saveEdit = async (id) => {
        try {
            const res = await fetch(`/api/students/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            const data = await res.json();
            if (data.success) {
                setStudents(students.map(s => (s._id === id ? data.data : s)));
                cancelEdit();
            } else {
                alert(data.error || 'Failed to update student');
            }
        } catch (error) {
            console.error('Failed to update student', error);
            alert('Failed to update student');
        }
    };

    if (loading) return <div className="container"><p>Loading students...</p></div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Students</h1>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                {/* Add Student Form */}
                <div className="card">
                    <h3>Add New Student</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Roll Number</label>
                            <input
                                type="text"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Class</label>
                            <input
                                type="text"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Section</label>
                            <input
                                type="text"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Student</button>
                    </form>
                </div>

                {/* Students List */}
                <div className="card">
                    <h3>Student List ({students.length})</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Roll No</th>
                                <th style={{ padding: '0.5rem' }}>Name</th>
                                <th style={{ padding: '0.5rem' }}>Class</th>
                                <th style={{ padding: '0.5rem' }}>Contact</th>
                                <th style={{ padding: '0.5rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{student.rollNumber}</td>
                                    <td style={{ padding: '0.5rem' }}>{student.name}</td>
                                    <td style={{ padding: '0.5rem' }}>{student.class} {student.section}</td>
                                    <td style={{ padding: '0.5rem' }}>{student.contactNumber}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        {editingId === student._id ? (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => saveEdit(student._id)}
                                                    className="btn btn-success"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="btn btn-secondary"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => startEdit(student)}
                                                    className="btn btn-primary"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                                >
                                                    Edit
                                                </button>
                                                <Link href={`/edit/${student._id}`} className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', textDecoration: 'underline' }}>
                                                    Edit details
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(student._id, student.name)}
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
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        {/* Inline edit form rendered below table when editing */}
                        {editingId && (
                            <div style={{ marginTop: '1rem' }} className="card">
                                <h4>Edit Student</h4>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Roll Number</label>
                                    <input type="text" className="form-control" value={editData.rollNumber} onChange={(e) => setEditData({ ...editData, rollNumber: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Class</label>
                                    <input type="text" className="form-control" value={editData.class} onChange={(e) => setEditData({ ...editData, class: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Section</label>
                                    <input type="text" className="form-control" value={editData.section} onChange={(e) => setEditData({ ...editData, section: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input type="text" className="form-control" value={editData.contactNumber} onChange={(e) => setEditData({ ...editData, contactNumber: e.target.value })} />
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
