import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGlobe, FaBars, FaUserCircle, FaSearch } from 'react-icons/fa';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <header className="airbnb-header">
      <div className="container header-container">
        {/* Logo */}
        <NavLink to="/" className="header-logo thierry-logo">
          <span className="thierry-text">THIERRY BNB</span>
        </NavLink>

        {/* Search Pill - Matches Official Design */}
        <div className="header-search-pill">
          <div className="search-pill-content">
            <span>Anywhere</span>
            <div className="search-pill-divider"></div>
            <span>Anytime</span>
            <div className="search-pill-divider"></div>
            <span className="search-pill-muted">Add guests</span>
          </div>
          <div className="search-icon-circle">
            <FaSearch size={12} />
          </div>
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'host-link active' : 'host-link'}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'host-link active' : 'host-link'}
          >
            Dashboard
          </NavLink>
          <NavLink to="/bookings" className="host-link">My Bookings</NavLink>
          <button className="globe-btn"><FaGlobe size={16} /></button>
          <div className="profile-menu">
            <FaBars size={16} />
            <FaUserCircle size={28} color="#717171" />
          </div>
        </div>
      </div>
    </header>
  );
};
