import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

/**
 * CreateJob - Contractor creates a new job posting
 */
const CreateJob = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [form, setForm] = useState({
        title: '',
        description: '',
        skillRequired: '',
        location: '',
        startDate: '',
        endDate: '',
        wagePerDay: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const payload = {
                ...form,
                contractorId: user.id,
                wagePerDay: parseFloat(form.wagePerDay),
            };
            const res = await api.post('/contractor/jobs', payload);
            if (res.data.success) {
                setMessage('Job created successfully!');
                setForm({
                    title: '', description: '', skillRequired: '',
                    location: '', startDate: '', endDate: '', wagePerDay: '',
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create job');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Create New Job</h2>
                <p>Post a new job listing for labours</p>
            </div>

            <div className="card" style={{ maxWidth: '600px' }}>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. House Painting" required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Job details..." />
                    </div>
                    <div className="form-group">
                        <label>Skill Required</label>
                        <input type="text" name="skillRequired" value={form.skillRequired} onChange={handleChange} placeholder="e.g. Painting" />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Mumbai" />
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Wage Per Day (₹)</label>
                        <input type="number" name="wagePerDay" value={form.wagePerDay} onChange={handleChange} placeholder="e.g. 900" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Job</button>
                </form>
            </div>
        </div>
    );
};

export default CreateJob;
