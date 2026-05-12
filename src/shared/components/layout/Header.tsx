import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <h1>List<span>On.</span></h1>
        </div>
        
        <nav className="nav-links">
          <a href="#" className="nav-link active">DEMOS</a>
          <a href="#" className="nav-link">FEATURE</a>
          <a href="#" className="nav-link">LAYOUTS</a>
          <a href="#" className="nav-link">SUPPORT</a>
        </nav>

        <div className="header-actions">
          <button className="btn-primary">Purchase Now</button>
        </div>
      </div>
    </header>
  );
};
