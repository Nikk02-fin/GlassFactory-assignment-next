import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <p className="header-banner">Tariffs are rising. Find your next factory in Vietnam, Portugal, India & more.</p>
      </div>
      <nav className="header-nav">
        <div className="nav-container">
          <div className="logo">
            <img src="/assets/logo.png" alt="Glass Factory Logo" className="logo-image" />
          </div>
          <div className="nav-right">
            <button className="nav-link">Log in</button>
            <button className="cta-button">Get inside for free →</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;