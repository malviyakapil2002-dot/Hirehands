import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * LabourDashboard - summary of labour's assignments
 */
const LabourDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await api.get(`/labour/assignments/${user.id}`);
            setAssignments(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch assignments', err);
        }
    };

    const byStatus = (status) => assignments.filter((a) => a.status === status).length;

    return (
        <div className="labour-dashboard-wrapper">
            <div className="dashboard-header">
                <h2>Labour Dashboard</h2>
                <p>Welcome back, {user.name}</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card glass-card">
                    <h3>Total Assignments</h3>
                    <p className="stat-value">{assignments.length}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Pending</h3>
                    <p className="stat-value">{byStatus('PENDING')}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Accepted</h3>
                    <p className="stat-value">{byStatus('ACCEPTED')}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Rejected</h3>
                    <p className="stat-value">{byStatus('REJECTED')}</p>
                </div>
            </div>

            <div className="glass-panel">
                <h3>Quick Actions</h3>
                <p>Browse available jobs, update assignment status, or view payments from the sidebar.</p>
            </div>
        </div>
    );
};

export default LabourDashboard;
