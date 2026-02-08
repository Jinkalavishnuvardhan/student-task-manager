'use client';

import { useState, useEffect } from 'react';

export default function FacultyPage() {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        subject: '',
        qualification: '',
        contactNumber: '',
    });

    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = async () => {
        try {
            const res = await fetch('/api/faculty');
            const data = await res.json();
            if (data.success) {
                setFaculty(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch faculty:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/faculty', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setFaculty([...faculty, data.data]);
                setFormData({
                    name: '',
                    employeeId: '',
                    subject: '',
                    qualification: '',
                    contactNumber: '',
                });
            }
        } catch (error) {
            console.error('Failed to add faculty:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        try {
            const res = await fetch(`/api/faculty/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setFaculty(faculty.filter(member => member._id !== id));
            } else {
                alert(data.error || 'Failed to delete faculty');
            }
        } catch (error) {
            console.error('Failed to delete faculty:', error);
            alert('Failed to delete faculty');
        }
    };

    if (loading) return <div className="container"><p>Loading faculty...</p></div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Faculty</h1>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                {/* Add Faculty Form */}
                <div className="card">
                    <h3>Add New Faculty</h3>
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
                            <label>Employee ID</label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Qualification</label>
                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
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
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Faculty</button>
                    </form>
                </div>

                {/* Faculty List */}
                <div className="card">
                    <h3>Faculty List ({faculty.length})</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>ID</th>
                                <th style={{ padding: '0.5rem' }}>Name</th>
                                <th style={{ padding: '0.5rem' }}>Subject</th>
                                <th style={{ padding: '0.5rem' }}>Contact</th>
                                <th style={{ padding: '0.5rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculty.map((member) => (
                                <tr key={member._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{member.employeeId}</td>
                                    <td style={{ padding: '0.5rem' }}>{member.name}</td>
                                    <td style={{ padding: '0.5rem' }}>{member.subject}</td>
                                    <td style={{ padding: '0.5rem' }}>{member.contactNumber}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <button
                                            onClick={() => handleDelete(member._id, member.name)}
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
