import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import ParticleBackground from '../../components/ParticleBackground';

/**
 * LoginPage - email/password login.
 * Stores user in localStorage and redirects by role.
 */
const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', form);
            if (res.data.success) {
                const user = res.data.user || res.data.data; // Handle both formats just in case
                const token = res.data.token;

                localStorage.setItem('user', JSON.stringify(user));
                if (token) {
                    localStorage.setItem('token', token);
                }

                // Redirect based on role
                const routes = {
                    ADMIN: '/admin',
                    CONTRACTOR: '/contractor',
                    LABOUR: '/labour',
                    HELP_CENTER: '/helpcenter',
                };
                navigate(routes[user.role] || '/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <ParticleBackground />
            <div className="auth-card glass-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Sign in to your HireHands account</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
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
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Sign In
                    </button>
                </form>

                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
