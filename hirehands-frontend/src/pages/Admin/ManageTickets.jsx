import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * ManageTickets - Admin views all tickets and assigns to Help Center
 */
const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [helpCenters, setHelpCenters] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTickets();
        fetchHelpCenters();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await api.get('/admin/tickets');
            setTickets(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch tickets', err);
        }
    };

    const fetchHelpCenters = async () => {
        try {
            const res = await api.get('/admin/users');
            const hcUsers = (res.data.data || []).filter((u) => u.role === 'HELP_CENTER');
            setHelpCenters(hcUsers);
        } catch (err) {
            console.error('Failed to fetch help centers', err);
        }
    };

    const assignTicket = async (ticketId, helpCenterId) => {
        if (!helpCenterId) return;
        try {
            await api.put(`/admin/tickets/${ticketId}/assign/${helpCenterId}`);
            setMessage('Ticket assigned successfully');
            fetchTickets();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to assign ticket');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Manage Support Tickets</h2>
                <p>View and assign support tickets to help center agents</p>
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
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.userName}</td>
                                <td>{ticket.subject}</td>
                                <td>
                                    <span className={`status-badge status-${ticket.status?.toLowerCase()}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td>{ticket.assignedHelpCenterName || 'Unassigned'}</td>
                                <td>
                                    {!ticket.assignedHelpCenterId && (
                                        <select
                                            className="form-group"
                                            style={{ display: 'inline', width: 'auto', padding: '4px 8px', fontSize: '0.8rem' }}
                                            onChange={(e) => assignTicket(ticket.id, e.target.value)}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Assign...</option>
                                            {helpCenters.map((hc) => (
                                                <option key={hc.id} value={hc.id}>{hc.name}</option>
                                            ))}
                                        </select>
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

export default ManageTickets;
