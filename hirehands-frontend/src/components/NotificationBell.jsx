import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';

/**
 * NotificationBell – shows notification icon in navbar with dropdown list.
 * Fetches from GET /api/notifications/user/{id}
 */
const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user?.id) fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(() => { if (user?.id) fetchNotifications(); }, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get(`/notifications/user/${user.id}`);
            setNotifications(res.data.data || []);
        } catch (err) {
            // Silently fail — notifications are non-critical
        }
    };

    const unread = notifications.filter(n => !n.read).length;

    const formatTime = (ts) => {
        if (!ts) return '';
        const d = new Date(ts);
        const now = new Date();
        const diff = Math.floor((now - d) / 60000);
        if (diff < 1) return 'Just now';
        if (diff < 60) return `${diff}m ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
        return d.toLocaleDateString();
    };

    if (!user) return null;

    return (
        <div className="notification-section" ref={ref}>
            <button className="notification-trigger" onClick={() => setOpen(!open)}>
                🔔
                {unread > 0 && <span className="notification-badge-count">{unread}</span>}
            </button>

            {open && (
                <div className="notification-dropdown">
                    <div className="notification-dropdown-header">Notifications</div>
                    {notifications.length === 0 ? (
                        <div className="notification-empty">No notifications yet</div>
                    ) : (
                        notifications.slice(0, 10).map((n, i) => (
                            <div key={i} className="notification-item">
                                <p>{n.message}</p>
                                <span>{formatTime(n.createdAt)}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
