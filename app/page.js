'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    subjects: 0,
    pendingFees: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Dashboard</h1>
      </div>

      <div className="card-grid">
        <Link href="/students" style={{ textDecoration: 'none' }}>
          <div className="card">
            <h3>Total Students</h3>
            <p>{loading ? '...' : stats.students}</p>
          </div>
        </Link>

        <Link href="/faculty" style={{ textDecoration: 'none' }}>
          <div className="card">
            <h3>Total Faculty</h3>
            <p>{loading ? '...' : stats.faculty}</p>
          </div>
        </Link>

        <Link href="/subjects" style={{ textDecoration: 'none' }}>
          <div className="card">
            <h3>Subjects</h3>
            <p>{loading ? '...' : stats.subjects}</p>
          </div>
        </Link>

        <Link href="/fees" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ borderLeft: '4px solid orange' }}>
            <h3>Pending Fee Records</h3>
            <p>{loading ? '...' : stats.pendingFees}</p>
          </div>
        </Link>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Link href="/students" className="btn btn-primary">Add Student</Link>
          <Link href="/attendance" className="btn btn-success">Mark Attendance</Link>
          <Link href="/fees" className="btn btn-secondary">Record Fee Payment</Link>
        </div>
      </div>
    </div>
  );
}
