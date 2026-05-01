import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * ManagePayments - Admin views all payments
 */
const ManagePayments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await api.get('/admin/payments');
            setPayments(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch payments', err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Manage Payments</h2>
                <p>View all payment records</p>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Job</th>
                            <th>Labour</th>
                            <th>Days</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr><td colSpan="6" className="text-center">No payments found</td></tr>
                        ) : (
                            payments.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.jobTitle}</td>
                                    <td>{p.labourName}</td>
                                    <td>{p.totalDays}</td>
                                    <td>₹{p.totalAmount}</td>
                                    <td>
                                        <span className={`status-badge status-${p.status?.toLowerCase()}`}>
                                            {p.status}
                                        </span>
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

export default ManagePayments;
