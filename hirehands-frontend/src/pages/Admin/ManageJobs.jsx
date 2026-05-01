import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * ManageJobs - Admin views all jobs
 */
const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/admin/jobs');
            setJobs(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch jobs', err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Manage Jobs</h2>
                <p>View all jobs posted on the platform</p>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Contractor</th>
                            <th>Location</th>
                            <th>Wage/Day</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.title}</td>
                                <td>{job.contractorName}</td>
                                <td>{job.location}</td>
                                <td>₹{job.wagePerDay}</td>
                                <td>{job.startDate}</td>
                                <td>{job.endDate}</td>
                                <td>
                                    <span className={`status-badge status-${job.status?.toLowerCase()}`}>
                                        {job.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageJobs;
