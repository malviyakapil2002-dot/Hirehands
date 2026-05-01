import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * AssignedTickets - Help Center views their assigned tickets
 */
const AssignedTickets = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await api.get(`/helpcenter/tickets/${user.id}`);
            setTickets(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch tickets', err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Assigned Tickets</h2>
                <p>Tickets assigned to you for resolution</p>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length === 0 ? (
                            <tr><td colSpan="6" className="text-center">No tickets assigned</td></tr>
                        ) : (
                            tickets.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.userName}</td>
                                    <td>{t.subject}</td>
                                    <td>{t.message}</td>
                                    <td>
                                        <span className={`status-badge status-${t.status?.toLowerCase()}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td>{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedTickets;
