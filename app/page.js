'use client';

import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import FactorySection from '../components/FactorySection/FactorySection';
import Footer from '../components/Footer/Footer';
import './globals.css'

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialty: {
      knitwear: false,
      activewear: false,
      outerwear: false,
      denim: false,
      sustainable: false,
      'T-shirts': false,
      hoodie: false,
      tailoring: false,
      footwear: false,
      swimwear: false,
      sportswear: false,
      socks: false,
      accessories: false
    },
    location: '',
    certification: '',
    sampleTime: {
      under14: false,
      under21: false,
      over21: false
    },
    productionTime: {
      under30: false,
      under60: false,
      over60: false
    },
    minimumOrder: [0, 1000]
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleQuickFilter = (specialty) => {
    // Map the specialty to the correct key in filters
    const specialtyMap = {
      'T-shirt': 'T-shirts',
      'Hoodie': 'hoodie',
      'Activewear': 'activewear',
      'Denim': 'denim',
      'Swimwear': 'swimwear',
      'Tailoring': 'tailoring',
      'Outerwear': 'outerwear',
      'Socks': 'socks',
      'Footwear': 'footwear',
      'Hats and caps': 'hats',
      'Sportswear': 'sportswear',
      'Knitwear': 'knitwear',
      'Sustainable': 'sustainable',
      'Accessories': 'accessories',
      'Underwear': 'underwear',
      'Loungewear': 'loungewear'
    };
    
    const filterKey = specialtyMap[specialty] || specialty.toLowerCase();
    
    const newFilters = {
      ...filters,
      specialty: {
        ...filters.specialty,
        [filterKey]: true
      }
    };
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      
      <main className="main-content">
        <div className="container">
          <div className="content-header">
            <h2>Find your perfect manufacturing partner</h2>
            <p>Search by specialty, location, or factory name</p>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="cargo pants, Vietnam, etc."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
              <div className="search-icons">
                <button className="search-icon-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
                <button 
                  className={`filter-icon-btn ${showFilters ? 'active' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v2.172a2 2 0 0 1-.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48-4.928a2 2 0 0 1-.52-1.345v-2.227z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="quick-filters">

            <div className="quick-tags">
              <button className="quick-tag" onClick={() => handleQuickFilter('T-shirts')}>T-shirt</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Hoodie')}>Hoodie</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Activewear')}>Activewear</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Denim')}>Denim</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Swimwear')}>Swimwear</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Tailoring')}>Tailoring</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Outerwear')}>Outerwear</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Socks')}>Socks</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Footwear')}>Footwear</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Hats and caps')}>Hats and caps</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Sportswear')}>Sportswear</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Knitwear')}>Knitwear</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Sustainable')}>Sustainable</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Accessories')}>Accessories</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Underwear')}>Underwear</button>
              <button className="quick-tag" onClick={() => handleQuickFilter('Loungewear')}>Loungewear</button>
            </div>
          </div>
          
          <FactorySection 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            searchQuery={searchQuery}
            onSearchClear={() => setSearchQuery('')}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}