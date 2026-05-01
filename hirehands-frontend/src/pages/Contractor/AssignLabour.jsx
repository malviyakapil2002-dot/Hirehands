import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * AssignLabour - Contractor assigns available labours to their jobs
 */
const AssignLabour = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [jobs, setJobs] = useState([]);
    const [labours, setLabours] = useState([]);
    const [selectedJob, setSelectedJob] = useState('');
    const [selectedLabour, setSelectedLabour] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchJobs();
        fetchLabours();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get(`/contractor/jobs/${user.id}`);
            setJobs((res.data.data || []).filter((j) => j.status === 'CREATED' || j.status === 'ASSIGNED'));
        } catch (err) {
            console.error('Failed to fetch jobs', err);
        }
    };

    const fetchLabours = async () => {
        try {
            const res = await api.get('/contractor/available-labours');
            setLabours(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch labours', err);
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!selectedJob || !selectedLabour) {
            setError('Please select both a job and a labour');
            return;
        }
        try {
            await api.post(`/contractor/jobs/${selectedJob}/assign/${selectedLabour}`);
            setMessage('Labour assigned successfully!');
            setSelectedJob('');
            setSelectedLabour('');
            fetchJobs();
        } catch (err) {
            setError(err.response?.data?.message || 'Assignment failed');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Assign Labour</h2>
                <p>Assign available labours to your jobs</p>
            </div>

            <div className="card" style={{ maxWidth: '500px' }}>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleAssign}>
                    <div className="form-group">
                        <label>Select Job</label>
                        <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} required>
                            <option value="">-- Select a Job --</option>
                            {jobs.map((job) => (
                                <option key={job.id} value={job.id}>
                                    {job.title} ({job.location}) - ₹{job.wagePerDay}/day
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Select Labour</label>
                        <select value={selectedLabour} onChange={(e) => setSelectedLabour(e.target.value)} required>
                            <option value="">-- Select a Labour --</option>
                            {labours.map((l) => (
                                <option key={l.id} value={l.id}>
                                    {l.name} - {l.experienceYears || 0} yrs exp - ₹{l.dailyWage || 0}/day
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Assign Labour</button>
                </form>
            </div>
        </div>
    );
};

export default AssignLabour;
