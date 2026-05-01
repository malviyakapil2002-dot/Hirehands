import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * ViewPayments - Labour views payment info for their assignments
 */
const ViewPayments = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [assignments, setAssignments] = useState([]);
    const [payments, setPayments] = useState({});

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await api.get(`/labour/assignments/${user.id}`);
            const accepted = (res.data.data || []).filter((a) => a.status === 'ACCEPTED');
            setAssignments(accepted);

            // Fetch payment for each assignment
            for (const a of accepted) {
                try {
                    const payRes = await api.get(`/labour/payments/${a.id}`);
                    if (payRes.data.success) {
                        setPayments((prev) => ({ ...prev, [a.id]: payRes.data.data }));
                    }
                } catch (err) {
                    // Payment may not exist yet
                }
            }
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>View Payments</h2>
                <p>Check payment status for your assignments</p>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Assignment</th>
                            <th>Job</th>
                            <th>Total Days</th>
                            <th>Total Amount</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length === 0 ? (
                            <tr><td colSpan="5" className="text-center">No payment records</td></tr>
                        ) : (
                            assignments.map((a) => {
                                const payment = payments[a.id];
                                return (
                                    <tr key={a.id}>
                                        <td>{a.id}</td>
                                        <td>{a.jobTitle}</td>
                                        <td>{payment ? payment.totalDays : '-'}</td>
                                        <td>{payment ? `₹${payment.totalAmount}` : '-'}</td>
                                        <td>
                                            {payment ? (
                                                <span className={`status-badge status-${payment.status?.toLowerCase()}`}>
                                                    {payment.status}
                                                </span>
                                            ) : (
                                                <span className="status-badge status-pending">NOT CALCULATED</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPayments;
