import React, { useState, useEffect } from 'react';
import FactoryCard from './FactoryCard';
import factoriesData from '../../data/factories.json';
import './FactoryGrid.css';

const FactoryGrid = ({ filters, onFilterChange }) => {
  const [filteredFactories, setFilteredFactories] = useState(factoriesData.factories);
  const [activeFiltersList, setActiveFiltersList] = useState([]);

  const handleRemoveFilter = (filterToRemove) => {
    const newFilters = { ...filters };
    
    // Remove specialty filters
    Object.keys(newFilters.specialty).forEach(key => {
      if (key === filterToRemove || key.toLowerCase() === filterToRemove.toLowerCase()) {
        newFilters.specialty[key] = false;
      }
    });
    
    // Remove location filter
    if (filterToRemove === newFilters.location) {
      newFilters.location = '';
    }
    
    // Remove certification filter
    if (filterToRemove === newFilters.certification) {
      newFilters.certification = '';
    }
    
    // Remove minimum order filter
    if (filterToRemove.includes('units')) {
      newFilters.minimumOrder = [0, 1000];
    }
    
    onFilterChange(newFilters);
  };
  
  const handleClearAll = () => {
    const resetFilters = {
      specialty: {
        knitwear: false,
        activewear: false,
        outerwear: false,
        denim: false,
        sustainable: false,
        'T-shirts': false,
        hoodie: false
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
    };
    onFilterChange(resetFilters);
  };

  useEffect(() => {
    let filtered = [...factoriesData.factories];
    let activeFilters = [];

    // Apply specialty filters
    const activeSpecialties = Object.entries(filters.specialty)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    
    if (activeSpecialties.length > 0) {
      activeFilters.push(...activeSpecialties);
      filtered = filtered.filter(factory => 
        factory.specialties.some(specialty => 
          activeSpecialties.some(active => 
            specialty.toLowerCase() === active.toLowerCase()
          )
        )
      );
    }

    // Apply location filter
    if (filters.location) {
      activeFilters.push(filters.location);
      filtered = filtered.filter(factory => 
        factory.country.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Apply certification filter
    if (filters.certification) {
      activeFilters.push(filters.certification);
      // Filter by certification if needed
    }

    // Apply minimum order filter
    if (filters.minimumOrder[1] < 1000) {
      activeFilters.push(`< ${filters.minimumOrder[1]} units`);
      filtered = filtered.filter(factory => 
        factory.minimumOrder <= filters.minimumOrder[1]
      );
    }

    // Apply sample time filters
    const activeSampleTimes = Object.entries(filters.sampleTime)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    
    if (activeSampleTimes.length > 0) {
      // Add sample time filtering logic here if needed
    }

    // Apply production time filters
    const activeProductionTimes = Object.entries(filters.productionTime)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    
    if (activeProductionTimes.length > 0) {
      // Add production time filtering logic here if needed
    }

    setFilteredFactories(filtered);
    setActiveFiltersList(activeFilters);
  }, [filters]);

  return (
    <div className="factory-grid-container">
      <div className="grid-header">
        <div className="grid-info">
          <span className="result-count">{filteredFactories.length} of {factoriesData.factories.length} factories</span>
        </div>
        <div className="grid-controls">
          <button className="filter-button">
            <span>🔽</span> Filters
          </button>
          <button className="map-view-button">
            <span>📍</span> Map view
          </button>
        </div>
      </div>

      {activeFiltersList.length > 0 && (
        <div className="grid-actions">
          <div className="active-filters">
            <span>Active filters:</span>
            <div className="filter-tags">
              {activeFiltersList.map((filter, index) => (
                <span key={index} className="filter-tag">
                  {filter} <button className="remove-filter" onClick={() => handleRemoveFilter(filter)}>×</button>
                </span>
              ))}
            </div>
          </div>
          <button className="clear-all" onClick={handleClearAll}>Clear all</button>
        </div>
      )}

      <div className="factory-grid">
        {filteredFactories.map((factory) => (
          <FactoryCard key={factory.id} factory={factory} />
        ))}
      </div>
    </div>
  );
};

export default FactoryGrid;