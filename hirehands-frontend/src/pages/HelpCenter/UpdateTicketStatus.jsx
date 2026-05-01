import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * UpdateTicketStatus - Help Center updates the status of assigned tickets
 */
const UpdateTicketStatus = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [tickets, setTickets] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await api.get(`/helpcenter/tickets/${user.id}`);
            setTickets((res.data.data || []).filter((t) => t.status !== 'RESOLVED'));
        } catch (err) {
            console.error('Failed to fetch tickets', err);
        }
    };

    const updateStatus = async (ticketId, status) => {
        try {
            await api.put(`/helpcenter/tickets/${ticketId}/status?status=${status}`);
            setMessage(`Ticket #${ticketId} marked as ${status}`);
            fetchTickets();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to update ticket');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Update Ticket Status</h2>
                <p>Resolve your assigned tickets</p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length === 0 ? (
                            <tr><td colSpan="5" className="text-center">No active tickets</td></tr>
                        ) : (
                            tickets.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.userName}</td>
                                    <td>{t.subject}</td>
                                    <td>
                                        <span className={`status-badge status-${t.status?.toLowerCase()}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td>
                                        {t.status === 'IN_PROGRESS' && (
                                            <button className="btn btn-success btn-sm" onClick={() => updateStatus(t.id, 'RESOLVED')}>
                                                Resolve
                                            </button>
                                        )}
                                        {t.status === 'OPEN' && (
                                            <button className="btn btn-primary btn-sm" onClick={() => updateStatus(t.id, 'IN_PROGRESS')}>
                                                Start Working
                                            </button>
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

export default UpdateTicketStatus;
