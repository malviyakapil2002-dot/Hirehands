import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * ViewAttendance - Contractor views attendance for job assignments and manages payments
 */
const ViewAttendance = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
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

    const viewAssignments = async (jobId) => {
        setSelectedJob(jobId);
        setSelectedAssignment(null);
        setAttendance([]);
        setMessage('Select an assignment to view attendance');
    };

    const calculatePayment = async (assignmentId) => {
        try {
            await api.post(`/contractor/payments/${assignmentId}/calculate`);
            setMessage('Payment calculated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to calculate payment');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>View Attendance & Payments</h2>
                <p>Manage attendance records and calculate payments</p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Wage/Day</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.filter((j) => j.status !== 'CREATED').map((job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.title}</td>
                                <td>
                                    <span className={`status-badge status-${job.status?.toLowerCase()}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td>₹{job.wagePerDay}</td>
                                <td>
                                    {job.status === 'COMPLETED' && (
                                        <button className="btn btn-primary btn-sm" onClick={() => calculatePayment(job.id)}>
                                            Calculate Payment
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

export default ViewAttendance;
