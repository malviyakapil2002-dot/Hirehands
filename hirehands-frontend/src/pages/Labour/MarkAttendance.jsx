import React, { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * MarkAttendance - Labour marks daily attendance for accepted assignments
 */
const MarkAttendance = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await api.get(`/labour/assignments/${user.id}`);
            // Only show accepted assignments for attendance
            const accepted = (res.data.data || []).filter((a) => a.status === 'ACCEPTED');
            setAssignments(accepted);
        } catch (err) {
            console.error('Failed to fetch assignments', err);
        }
    };

    const markAttendance = async (assignmentId, status) => {
        setMessage('');
        setError('');
        try {
            await api.post(`/labour/attendance/${assignmentId}?status=${status}`);
            setMessage(`Attendance marked as ${status}`);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to mark attendance');
        }
    };

    return (
        <div>
            <div className="page-header">
                <h2>Mark Attendance</h2>
                <p>Mark your daily attendance for active assignments</p>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Assignment ID</th>
                            <th>Job</th>
                            <th>Assigned Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length === 0 ? (
                            <tr><td colSpan="4" className="text-center">No accepted assignments</td></tr>
                        ) : (
                            assignments.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.jobTitle}</td>
                                    <td>{a.assignedDate}</td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={() => markAttendance(a.id, 'PRESENT')} style={{ marginRight: '6px' }}>
                                            Present
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => markAttendance(a.id, 'ABSENT')}>
                                            Absent
                                        </button>
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

export default MarkAttendance;
