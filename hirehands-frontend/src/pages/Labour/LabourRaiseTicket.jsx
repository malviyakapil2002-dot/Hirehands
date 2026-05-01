import React, { useState } from 'react';
import api from '../../services/api';

/**
 * LabourRaiseTicket - Labour raises a support ticket
 */
const LabourRaiseTicket = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [form, setForm] = useState({ subject: '', message: '' });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        try {
            await api.post('/labour/tickets', {
                userId: user.id,
                subject: form.subject,
                message: form.message,
            });
            setSuccess('Support ticket raised successfully!');
            setForm({ subject: '', message: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to raise ticket');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Raise Support Ticket</h2>
                <p>Need help? Submit a ticket below</p>
            </div>

            <div className="card" style={{ maxWidth: '500px' }}>
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Brief subject" required />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Describe your issue..." required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Ticket</button>
                </form>
            </div>
        </div>
    );
};

export default LabourRaiseTicket;
