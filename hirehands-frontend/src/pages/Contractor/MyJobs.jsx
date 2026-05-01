import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * MyJobs - Contractor views and manages their own jobs
 */
const MyJobs = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');

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

    const updateStatus = async (jobId, status) => {
        try {
            await api.put(`/contractor/jobs/${jobId}/status?status=${status}`);
            setMessage('Job status updated');
            fetchJobs();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to update status');
        }
    };

    const markCompleted = async (jobId) => {
        try {
            await api.put(`/contractor/jobs/${jobId}/complete`);
            setMessage('Job marked as completed');
            fetchJobs();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to complete job');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>My Jobs</h2>
                <p>View and manage your job postings</p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Wage/Day</th>
                            <th>Period</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.title}</td>
                                <td>{job.location}</td>
                                <td>₹{job.wagePerDay}</td>
                                <td>{job.startDate} → {job.endDate}</td>
                                <td>
                                    <span className={`status-badge status-${job.status?.toLowerCase()}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td>
                                    {job.status === 'ACCEPTED' && (
                                        <button className="btn btn-primary btn-sm" onClick={() => updateStatus(job.id, 'IN_PROGRESS')}>
                                            Start
                                        </button>
                                    )}
                                    {job.status === 'IN_PROGRESS' && (
                                        <button className="btn btn-success btn-sm" onClick={() => markCompleted(job.id)}>
                                            Complete
                                        </button>
                                    )}
                                    {job.status === 'CREATED' && (
                                        <button className="btn btn-danger btn-sm" onClick={() => updateStatus(job.id, 'CANCELLED')}>
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyJobs;
