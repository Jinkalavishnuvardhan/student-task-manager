'use client';

import { useState, useEffect } from 'react';

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        topics: '', // topics entered as comma-separated string
    });

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const res = await fetch('/api/subjects');
            const data = await res.json();
            if (data.success) {
                setSubjects(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const topicsArray = formData.topics.split(',').map(topic => topic.trim()).filter(t => t);

        try {
            const res = await fetch('/api/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    topics: topicsArray
                }),
            });
            const data = await res.json();
            if (data.success) {
                setSubjects([...subjects, data.data]);
                setFormData({
                    name: '',
                    code: '',
                    topics: '',
                });
            }
        } catch (error) {
            console.error('Failed to add subject:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        try {
            const res = await fetch(`/api/subjects/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setSubjects(subjects.filter(subject => subject._id !== id));
            } else {
                alert(data.error || 'Failed to delete subject');
            }
        } catch (error) {
            console.error('Failed to delete subject:', error);
            alert('Failed to delete subject');
        }
    };

    if (loading) return <div className="container"><p>Loading subjects...</p></div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Academics (Subjects & Topics)</h1>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                {/* Add Subject Form */}
                <div className="card">
                    <h3>Add New Subject</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Subject Name</label>
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
                            <label>Subject Code</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Topics (comma separated)</label>
                            <textarea
                                name="topics"
                                value={formData.topics}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Algebra, Geometry, Calculus"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Subject</button>
                    </form>
                </div>

                {/* Subjects List */}
                <div className="card">
                    <h3>Subject List ({subjects.length})</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {subjects.map((subject) => (
                            <div key={subject._id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold' }}>{subject.name} ({subject.code})</span>
                                    <button
                                        onClick={() => handleDelete(subject._id, subject.name)}
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
                                <div>
                                    <strong>Topics:</strong>
                                    <ul style={{ margin: '0.5rem 0 0 1.5rem', padding: 0 }}>
                                        {subject.topics.map((topic, index) => (
                                            <li key={index}>{topic}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
