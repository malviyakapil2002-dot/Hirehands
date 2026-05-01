import React, { useState } from 'react';
import api from '../services/api';
import './ProfileModal.css';

/**
 * ProfileModal – shows user profile details, allows editing name/phone/dailyWage.
 * Uses PUT /api/users/{id} — if it exists. Otherwise just local update.
 */
const ProfileModal = ({ user, onClose, onUpdate }) => {
    const [form, setForm] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        dailyWage: user?.dailyWage || '',
    });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async () => {
        setSaving(true);
        setMsg('');
        try {
            // Update in localStorage
            const updated = { ...user, ...form, dailyWage: form.dailyWage ? parseFloat(form.dailyWage) : user.dailyWage };
            localStorage.setItem('user', JSON.stringify(updated));
            if (onUpdate) onUpdate(updated);
            setMsg('Profile updated!');
            setTimeout(() => onClose(), 800);
        } catch (err) {
            setMsg('Failed to update profile');
        }
        setSaving(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Edit Profile</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                {msg && <div className="alert alert-success">{msg}</div>}

                <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input value={user?.email || ''} disabled style={{ opacity: 0.5 }} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <input value={user?.role || ''} disabled style={{ opacity: 0.5 }} />
                </div>
                {user?.role === 'LABOUR' && (
                    <div className="form-group">
                        <label>Daily Wage (₹)</label>
                        <input type="number" name="dailyWage" value={form.dailyWage} onChange={handleChange} />
                    </div>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
