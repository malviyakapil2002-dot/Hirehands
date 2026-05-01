import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * MyAssignments - Labour views and accepts/rejects assignments
 */
const MyAssignments = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await api.get(`/labour/assignments/${user.id}`);
            setAssignments(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch assignments', err);
        }
    };

    const handleAction = async (id, action) => {
        try {
            await api.put(`/labour/assignments/${id}/${action}`);
            setMessage(`Assignment ${action}ed successfully`);
            fetchAssignments();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage(`Failed to ${action} assignment`);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>My Assignments</h2>
                <p>View and manage your job assignments</p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Job</th>
                            <th>Assigned Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length === 0 ? (
                            <tr><td colSpan="5" className="text-center">No assignments yet</td></tr>
                        ) : (
                            assignments.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.jobTitle}</td>
                                    <td>{a.assignedDate}</td>
                                    <td>
                                        <span className={`status-badge status-${a.status?.toLowerCase()}`}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td>
                                        {a.status === 'PENDING' && (
                                            <>
                                                <button className="btn btn-success btn-sm" onClick={() => handleAction(a.id, 'accept')} style={{ marginRight: '6px' }}>
                                                    Accept
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleAction(a.id, 'reject')}>
                                                    Reject
                                                </button>
                                            </>
                                        )}
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

export default MyAssignments;
