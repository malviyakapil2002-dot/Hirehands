import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import ParticleBackground from '../../components/ParticleBackground';

/**
 * RegisterPage - new user registration with role selection.
 */
const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'LABOUR',
        experienceYears: '',
        dailyWage: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const payload = {
                ...form,
                experienceYears: form.experienceYears ? parseInt(form.experienceYears) : null,
                dailyWage: form.dailyWage ? parseFloat(form.dailyWage) : null,
            };
            const res = await api.post('/auth/register', payload);
            if (res.data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <ParticleBackground />
            <div className="auth-card glass-card" style={{ maxWidth: '500px' }}>
                <h2>Create Account</h2>
                <p className="subtitle">Join HireHands today</p>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select name="role" value={form.role} onChange={handleChange}>
                            <option value="LABOUR">Labour</option>
                            <option value="CONTRACTOR">Contractor</option>
                            <option value="HELP_CENTER">Help Center</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    {/* Show labour-specific fields */}
                    {form.role === 'LABOUR' && (
                        <>
                            <div className="form-group">
                                <label>Experience (Years)</label>
                                <input
                                    type="number"
                                    name="experienceYears"
                                    value={form.experienceYears}
                                    onChange={handleChange}
                                    placeholder="Years of experience"
                                />
                            </div>
                            <div className="form-group">
                                <label>Daily Wage (₹)</label>
                                <input
                                    type="number"
                                    name="dailyWage"
                                    value={form.dailyWage}
                                    onChange={handleChange}
                                    placeholder="Expected daily wage"
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Register
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
