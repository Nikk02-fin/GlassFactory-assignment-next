import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = 2025; // Changed to hardcoded 2025

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              {/* <span className="footer-logo-icon">🏭</span> Remove or replace if not needed */}
              <span className="footer-logo-text">GLASS FACTORY</span>
            </div>
            <p className="footer-tagline">Making manufacturing transparent.</p>
            <div className="footer-social">
              <a href="#" className="social-link">YT</a> {/* Placeholder for YouTube icon */}
              <a href="#" className="social-link">IG</a> {/* Placeholder for Instagram icon */}
              <a href="#" className="social-link">TT</a> {/* Placeholder for TikTok icon */}
              <a href="#" className="social-link">TW</a> {/* Placeholder for Twitter icon */}
              <a href="#" className="social-link">DS</a> {/* Placeholder for Discord icon */}
              <a href="#" className="social-link">LI</a> {/* Placeholder for LinkedIn icon */}
            </div>
          </div>

          <div className="footer-section">
            <h4>For brands</h4>
            <ul className="footer-links">
              <li><a href="#">Factory finder</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Mass production</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For factories</h4>
            <ul className="footer-links">
              <li><a href="#">List your factory</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-partners"> {/* Moved to the left */}
            <span>as mentioned in</span> {/* Changed text */}
            <div className="partner-logos">
              <span className="partner-logo">VOGUE</span>
              <span className="partner-logo">SPY</span>
              <span className="partner-logo">sabukaru</span>
              <span className="partner-logo">20</span>
              <span className="partner-logo">Esquire</span>
            </div>
          </div>
          <p>glassfactory.info inc © {currentYear}</p> {/* Changed text and order */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;