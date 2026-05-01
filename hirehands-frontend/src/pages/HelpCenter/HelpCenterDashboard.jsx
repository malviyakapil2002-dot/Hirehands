import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * HelpCenterDashboard - summary for help center agents
 */
const HelpCenterDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await api.get(`/helpcenter/tickets/${user.id}`);
            setTickets(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch tickets', err);
        }
    };

    const byStatus = (status) => tickets.filter((t) => t.status === status).length;

    return (
        <div className="helpcenter-dashboard-wrapper">
            <div className="dashboard-header">
                <h2>Help Center Dashboard</h2>
                <p>Welcome, {user.name}</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card glass-card">
                    <h3>Assigned Tickets</h3>
                    <p className="stat-value">{tickets.length}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Active</h3>
                    <p className="stat-value">{byStatus('OPEN') + byStatus('IN_PROGRESS')}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Resolved</h3>
                    <p className="stat-value">{byStatus('RESOLVED')}</p>
                </div>
            </div>

            <div className="glass-panel">
                <h3>Quick Actions</h3>
                <p>Use the sidebar to view detailed tickets and update their resolution status.</p>
            </div>
        </div>
    );
};

export default HelpCenterDashboard;
