import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * AvailableJobs - Labour views jobs that are open (CREATED/ASSIGNED)
 */
const AvailableJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/labour/jobs/available');
            setJobs(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch jobs', err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Available Jobs</h2>
                <p>Browse open job opportunities</p>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Contractor</th>
                            <th>Skill</th>
                            <th>Location</th>
                            <th>Wage/Day</th>
                            <th>Period</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length === 0 ? (
                            <tr><td colSpan="8" className="text-center">No available jobs</td></tr>
                        ) : (
                            jobs.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>{job.title}</td>
                                    <td>{job.contractorName}</td>
                                    <td>{job.skillRequired}</td>
                                    <td>{job.location}</td>
                                    <td>₹{job.wagePerDay}</td>
                                    <td>{job.startDate} → {job.endDate}</td>
                                    <td>
                                        <span className={`status-badge status-${job.status?.toLowerCase()}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AvailableJobs;
