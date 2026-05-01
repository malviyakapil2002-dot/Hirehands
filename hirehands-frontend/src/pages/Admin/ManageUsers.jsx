import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * ManageUsers - Admin can view all users and approve/block them
 */
const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch users', err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/admin/users/${id}/status?status=${status}`);
            setMessage(`User ${status === 'ACTIVE' ? 'activated' : 'blocked'} successfully`);
            fetchUsers();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to update user status');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Manage Users</h2>
                <p>View and manage all registered users</p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || '-'}</td>
                                <td><span className="badge">{user.role}</span></td>
                                <td>
                                    <span className={`status-badge status-${user.status?.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    {user.status === 'ACTIVE' ? (
                                        <button className="btn btn-danger btn-sm" onClick={() => updateStatus(user.id, 'BLOCKED')}>
                                            Block
                                        </button>
                                    ) : (
                                        <button className="btn btn-success btn-sm" onClick={() => updateStatus(user.id, 'ACTIVE')}>
                                            Activate
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

export default ManageUsers;
