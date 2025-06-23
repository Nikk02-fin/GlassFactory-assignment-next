import React from 'react';
import './PartnerLogos.css';

const PartnerLogos = () => {
  const partners = [
    { name: 'Partner 1', icon: '👔' },
    { name: 'Partner 2', icon: '🏭' },
    { name: 'Partner 3', icon: '🧵' },
    { name: 'Partner 4', icon: '👗' },
    { name: 'Partner 5', icon: '🎨' },
    { name: 'Partner 6', icon: '✂️' }
  ];

  return (
    <section className="partner-logos">
      <div className="partner-container">
        <p className="partner-text">Our factories produce for</p>
        <div className="partner-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-item">
              <span className="partner-icon">{partner.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;