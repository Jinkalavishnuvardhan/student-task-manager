'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            setError('Title is required');
            return;
        }

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            const data = await res.json();
            if (data.success) {
                router.push('/');
                router.refresh();
            } else {
                setError(data.error || 'Failed to create task');
            }
        } catch (error) {
            setError('An error occurred');
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Add New Task</h1>
                <Link href="/" className="btn btn-secondary">
                    Back to Home
                </Link>
            </div>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Title"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Task
                </button>
            </form>
        </div>
    );
}
