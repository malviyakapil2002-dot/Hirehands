import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ParticleBackground from './ParticleBackground';
import { applyTheme } from '../config/roleTheme';
import './DashboardLayout.css';

/**
 * Dashboard layout wrapper with sidebar + main content area.
 * Applies role-based theme on mount.
 */
const DashboardLayout = ({ links }) => {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role) {
            applyTheme(user.role);
        }
    }, []);

    return (
        <div className="dashboard-container">
            <ParticleBackground />
            <Sidebar links={links} />
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
