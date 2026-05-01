import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

/**
 * Sidebar navigation - renders links based on user role
 * Features animated active indicator and glow effects
 */
const Sidebar = ({ links }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-menu">
                {links.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                        end={link.path === '/admin' || link.path === '/contractor' || link.path === '/labour' || link.path === '/helpcenter'}
                    >
                        <span className="sidebar-icon">{link.icon || '🔹'}</span>
                        <span className="sidebar-label">{link.label}</span>
                        <span className="sidebar-active-bar"></span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
