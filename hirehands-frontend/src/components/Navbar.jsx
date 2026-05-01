import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import ProfileModal from './ProfileModal';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [showDropdown, setShowDropdown] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">🛠️ HireHands</Link>
                </div>
                <div className="navbar-links">
                    {user ? (
                        <>
                            <NotificationBell />
                            <div className="profile-section" ref={dropdownRef}>
                                <button className="profile-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                                    <span className="profile-avatar">{user.name?.charAt(0).toUpperCase()}</span>
                                    <span className="profile-name">{user.name}</span>
                                    <span className="profile-role-badge">{user.role}</span>
                                    <span className={`profile-chevron ${showDropdown ? 'open' : ''}`}>▾</span>
                                </button>

                                {showDropdown && (
                                    <div className="profile-dropdown">
                                        <div className="dropdown-header">
                                            <span className="dropdown-avatar">{user.name?.charAt(0).toUpperCase()}</span>
                                            <div>
                                                <p className="dropdown-name">{user.name}</p>
                                                <p className="dropdown-email">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={() => { setShowProfile(true); setShowDropdown(false); }}>
                                            👤 View / Edit Profile
                                        </button>
                                        <button className="dropdown-item logout-item" onClick={handleLogout}>
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            {showProfile && (
                <ProfileModal
                    user={user}
                    onClose={() => setShowProfile(false)}
                    onUpdate={(u) => setUser(u)}
                />
            )}
        </>
    );
};

export default Navbar;
