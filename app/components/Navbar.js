'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/' },
        { name: 'Students', href: '/students' },
        { name: 'Faculty', href: '/faculty' },
        { name: 'Academics', href: '/subjects' }, // Subjects & Topics
        { name: 'Attendance', href: '/attendance' },
        { name: 'Fees', href: '/fees' },
    ];

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link href="/" className="navbar-brand">
                    Student Manager
                </Link>
                <div className="navbar-links">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
