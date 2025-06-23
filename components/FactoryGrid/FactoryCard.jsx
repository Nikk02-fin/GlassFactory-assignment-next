import React from 'react';
import './FactoryCard.css';
const certifiedIcon = '/icons/veri-black.png';


const FactoryCard = ({ factory }) => {
  return (
    <div className="factory-card">
      <div className="factory-image-container">
        <div className="factory-tags-overlay">
          {factory.isNew && (
            <div className="tag-badge tag-new">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" fill="#0085FD"/>
              </svg>
              <span>New</span>
            </div>
          )}
          <div className="tag-badge tag-certified">
            <img src={certifiedIcon} alt="Certified" className="certified-icon" />
            <span>Certified</span>
          </div>
          {factory.verified && (
            <div className="tag-badge tag-visited">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 3C4.5 3 2 8 2 8s2.5 5 6 5 6-5 6-5-2.5-5-6-5z" stroke="#0A0A0A" strokeWidth="1.5"/>
                <circle cx="8" cy="8" r="2" fill="#0A0A0A"/>
              </svg>
              <span>Visited</span>
            </div>
          )}
        </div>
        
        <img 
          src="https://picsum.photos/300/300?grayscale" 
          alt={factory.name}
          className="factory-single-image"
        />
      </div>
      
      <div className="factory-info">
        <div className="factory-header">
          <h3 className="factory-name">{factory.name}</h3>
          <div className="factory-location">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#000"/>
            </svg>
            <span>{factory.location}</span>
          </div>
        </div>
        
        <div className="factory-metrics">
          <div className="metric">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#000" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="metric-content">
              <span className="metric-label">Sample Time</span>
              <span className="metric-value">{factory.leadTime}</span>
            </div>
          </div>
          
          <div className="metric">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="metric-content">
              <span className="metric-label">MOQ</span>
              <span className="metric-value">{factory.minimumOrder} units</span>
            </div>
          </div>
        </div>
        
        <div className="factory-specialties">
          {factory.specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className="specialty-tag">{specialty}</span>
          ))}
          {factory.specialties.length > 3 && (
            <span className="specialty-tag more">+{factory.specialties.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactoryCard;