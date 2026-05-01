import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * AdminDashboard - shows summary statistics for admin
 */
const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, jobs: 0, payments: 0, tickets: 0 });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [usersRes, jobsRes, paymentsRes, ticketsRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/jobs'),
                api.get('/admin/payments'),
                api.get('/admin/tickets'),
            ]);
            setStats({
                users: usersRes.data.data?.length || 0,
                jobs: jobsRes.data.data?.length || 0,
                payments: paymentsRes.data.data?.length || 0,
                tickets: ticketsRes.data.data?.length || 0,
            });
        } catch (err) {
            console.error('Failed to load stats', err);
        }
    };

    return (
        <div className="admin-dashboard-wrapper">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <p>Overview of the HireHands platform</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card glass-card">
                    <h3>Total Users</h3>
                    <p className="stat-value">{stats.users}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Total Jobs</h3>
                    <p className="stat-value">{stats.jobs}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Payments</h3>
                    <p className="stat-value">{stats.payments}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Support Tickets</h3>
                    <p className="stat-value">{stats.tickets}</p>
                </div>
            </div>

            <div className="glass-panel">
                <h3>System Status</h3>
                <p>All platform services are operational.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
