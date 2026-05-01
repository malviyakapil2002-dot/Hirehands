import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * ContractorDashboard - summary of contractor's jobs
 */
const ContractorDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get(`/contractor/jobs/${user.id}`);
            setJobs(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch jobs', err);
        }
    };

    const jobsByStatus = (status) => jobs.filter((j) => j.status === status).length;

    return (
        <div className="contractor-dashboard-wrapper">
            <div className="dashboard-header">
                <h2>Contractor Dashboard</h2>
                <p>Welcome back, {user.name}</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card glass-card">
                    <h3>Total Jobs</h3>
                    <p className="stat-value">{jobs.length}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Open</h3>
                    <p className="stat-value">{jobsByStatus('CREATED')}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>In Progress</h3>
                    <p className="stat-value">{jobsByStatus('IN_PROGRESS')}</p>
                </div>
                <div className="stat-card glass-card">
                    <h3>Completed</h3>
                    <p className="stat-value">{jobsByStatus('COMPLETED')}</p>
                </div>
            </div>

            <div className="glass-panel">
                <h3>Quick Actions</h3>
                <p>Use the sidebar to manage jobs, assign labour, or track attendance.</p>
            </div>
        </div>
    );
};

export default ContractorDashboard;
