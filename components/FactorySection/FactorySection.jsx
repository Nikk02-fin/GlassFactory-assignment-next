import React, { useState, useEffect } from 'react';
import FactoryCard from '../FactoryGrid/FactoryCard';
import factoriesData from '../../data/factories.json';
import './FactorySection.css';

const FactorySection = ({ filters, onFilterChange, searchQuery = '', onSearchClear, showFilters, setShowFilters }) => {
  const [filteredFactories, setFilteredFactories] = useState(factoriesData.factories);
  const [activeFiltersList, setActiveFiltersList] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const factoriesPerPage = 12;

  useEffect(() => {
    // Add transition effect
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      let filtered = [...factoriesData.factories];
      let activeFilters = [];

      // Apply search query filter first
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(factory => {
          // Search in factory name
          if (factory.name.toLowerCase().includes(query)) return true;
          
          // Search in location (city and country)
          if (factory.location.toLowerCase().includes(query)) return true;
          if (factory.country.toLowerCase().includes(query)) return true;
          
          // Search in specialties
          if (factory.specialties.some(specialty => 
            specialty.toLowerCase().includes(query)
          )) return true;
          
          // Search in certifications
          if (factory.certifications.some(cert => 
            cert.toLowerCase().includes(query)
          )) return true;
          
          // Search in type
          if (factory.type && factory.type.toLowerCase().includes(query)) return true;
          
          return false;
        });
      }

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

      // Apply minimum order filter
      if (filters.minimumOrder[0] > 0 || filters.minimumOrder[1] < 1000) {
        filtered = filtered.filter(factory => 
          factory.minimumOrder >= filters.minimumOrder[0] && 
          factory.minimumOrder <= filters.minimumOrder[1]
        );
      }

      // Apply sample time filters
      const activeSampleTimes = Object.entries(filters.sampleTime)
        .filter(([key, value]) => value)
        .map(([key]) => key);
      
      if (activeSampleTimes.length > 0) {
        filtered = filtered.filter(factory => {
          const sampleTime = factory.sampleTime;
          return activeSampleTimes.some(timeRange => {
            if (timeRange === 'under14') return sampleTime < 14;
            if (timeRange === 'under21') return sampleTime < 21;
            if (timeRange === 'over21') return sampleTime >= 21;
            return false;
          });
        });
      }

      // Apply production time filters
      const activeProductionTimes = Object.entries(filters.productionTime)
        .filter(([key, value]) => value)
        .map(([key]) => key);
      
      if (activeProductionTimes.length > 0) {
        filtered = filtered.filter(factory => {
          const productionDays = factory.productionDays;
          return activeProductionTimes.some(timeRange => {
            if (timeRange === 'under30') return productionDays < 30;
            if (timeRange === 'under60') return productionDays < 60;
            if (timeRange === 'over60') return productionDays >= 60;
            return false;
          });
        });
      }

      // Apply certification filter
      if (filters.certification) {
        filtered = filtered.filter(factory => 
          factory.certifications.includes(filters.certification)
        );
      }

      setFilteredFactories(filtered);
      
      // Add search query to active filters if present
      if (searchQuery.trim()) {
        setActiveFiltersList([`Search: "${searchQuery}"`, ...activeFilters]);
      } else {
        setActiveFiltersList(activeFilters);
      }
      
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [filters, searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFactories.length / factoriesPerPage);
  const indexOfLastFactory = currentPage * factoriesPerPage;
  const indexOfFirstFactory = indexOfLastFactory - factoriesPerPage;
  const currentFactories = filteredFactories.slice(indexOfFirstFactory, indexOfLastFactory);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to the results count section
    setTimeout(() => {
      const resultsSection = document.querySelector('.section-header');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const isMobile = windowWidth <= 768;
    const maxPagesToShow = isMobile ? 3 : 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // Mobile view: show current page and one before/after
        if (currentPage === 1) {
          pages.push(1, 2, '...', totalPages);
        } else if (currentPage === totalPages) {
          pages.push(1, '...', totalPages - 1, totalPages);
        } else if (currentPage === 2) {
          pages.push(1, 2, 3, '...', totalPages);
        } else if (currentPage === totalPages - 1) {
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage, '...', totalPages);
        }
      } else {
        // Desktop view: existing logic
        pages.push(1);
        
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        
        if (start > 2) {
          pages.push('...');
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        if (end < totalPages - 1) {
          pages.push('...');
        }
        
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleRemoveFilter = (filter) => {
    // Check if it's the search filter
    if (filter.startsWith('Search:') && onSearchClear) {
      onSearchClear();
      return;
    }
    
    const newFilters = { ...filters };
    
    // Check if it's a specialty
    Object.keys(newFilters.specialty).forEach(key => {
      if (key === filter.toLowerCase()) {
        newFilters.specialty[key] = false;
      }
    });
    
    // Check if it's location
    if (filter === newFilters.location) {
      newFilters.location = '';
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
    };
    onFilterChange(resetFilters);
    if (onSearchClear) {
      onSearchClear();
    }
  };

  const handleSpecialtyChange = (specialty) => {
    const newFilters = {
      ...filters,
      specialty: {
        ...filters.specialty,
        [specialty]: !filters.specialty[specialty]
      }
    };
    onFilterChange(newFilters);
  };

  const handleLocationChange = (e) => {
    const newFilters = {
      ...filters,
      location: e.target.value
    };
    onFilterChange(newFilters);
  };

  const handleCertificationChange = (e) => {
    const newFilters = {
      ...filters,
      certification: e.target.value
    };
    onFilterChange(newFilters);
  };

  const handleMinOrderChange = (value, isMin = false) => {
    const newFilters = {
      ...filters,
      minimumOrder: isMin 
        ? [parseInt(value), filters.minimumOrder[1]]
        : [filters.minimumOrder[0], parseInt(value)]
    };
    
    // Ensure min doesn't exceed max
    if (isMin && parseInt(value) > filters.minimumOrder[1]) {
      newFilters.minimumOrder[1] = parseInt(value);
    }
    // Ensure max doesn't go below min
    if (!isMin && parseInt(value) < filters.minimumOrder[0]) {
      newFilters.minimumOrder[0] = parseInt(value);
    }
    
    onFilterChange(newFilters);
  };

  const handleSampleTimeChange = (timeRange) => {
    const newFilters = {
      ...filters,
      sampleTime: {
        ...filters.sampleTime,
        [timeRange]: !filters.sampleTime[timeRange]
      }
    };
    onFilterChange(newFilters);
  };

  const handleProductionTimeChange = (timeRange) => {
    const newFilters = {
      ...filters,
      productionTime: {
        ...filters.productionTime,
        [timeRange]: !filters.productionTime[timeRange]
      }
    };
    onFilterChange(newFilters);
  };

  return (
    <div className="factory-section">
      {showFilters && (
        <div className="filter-panel-outer"> {/* Added outer box */}
          <div className="filter-panel"> {/* This is now the inner box */}
            <h3 className="filter-title">Filter factories</h3>
            <div className="filter-divider"></div>
            
            <div className="filter-content">
              <div className="filter-column">
                <h4>Specialty</h4>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.specialty.knitwear}
                      onChange={() => handleSpecialtyChange('knitwear')}
                    />
                    <span>Knitwear</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.specialty.activewear}
                      onChange={() => handleSpecialtyChange('activewear')}
                    />
                    <span>Activewear</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.specialty.outerwear}
                      onChange={() => handleSpecialtyChange('outerwear')}
                    />
                    <span>Outerwear</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.specialty.denim}
                      onChange={() => handleSpecialtyChange('denim')}
                    />
                    <span>Denim</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.specialty.sustainable}
                      onChange={() => handleSpecialtyChange('sustainable')}
                    />
                    <span>Sustainable</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.specialty['T-shirts']}
                      onChange={() => handleSpecialtyChange('T-shirts')}
                    />
                    <span>T-shirts</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.specialty.hoodie}
                      onChange={() => handleSpecialtyChange('hoodie')}
                    />
                    <span>Hoodie</span>
                  </label>
                  {showAllSpecialties && (
                    <>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.specialty.tailoring}
                          onChange={() => handleSpecialtyChange('tailoring')}
                        />
                        <span>Tailoring</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.specialty.footwear}
                          onChange={() => handleSpecialtyChange('footwear')}
                        />
                        <span>Footwear</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.specialty.swimwear}
                          onChange={() => handleSpecialtyChange('swimwear')}
                        />
                        <span>Swimwear</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.specialty.sportswear}
                          onChange={() => handleSpecialtyChange('sportswear')}
                        />
                        <span>Sportswear</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.specialty.socks}
                          onChange={() => handleSpecialtyChange('socks')}
                        />
                        <span>Socks</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.specialty.accessories}
                          onChange={() => handleSpecialtyChange('accessories')}
                        />
                        <span>Accessories</span>
                      </label>
                    </>
                  )}
                </div>
                <button 
                  className="show-more" 
                  onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                >
                  {showAllSpecialties ? 'Show less' : 'Show more'}
                </button>
              </div>

              <div className="filter-column">
                <div className="filter-section">
                  <h4>Location</h4>
                  <div className="select-wrapper">
                    <select
                      value={filters.location}
                      onChange={handleLocationChange}
                      className="filter-select"
                    >
                      <option value="">Any location</option>
                      <option value="India">India</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Italy">Italy</option>
                      <option value="China">China</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Germany">Germany</option>
                      <option value="Egypt">Egypt</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Peru">Peru</option>
                      <option value="Japan">Japan</option>
                      <option value="Greece">Greece</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Poland">Poland</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Austria">Austria</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Israel">Israel</option>
                      <option value="UAE">UAE</option>
                      <option value="Finland">Finland</option>
                      <option value="Chile">Chile</option>
                      <option value="Norway">Norway</option>
                      <option value="Hungary">Hungary</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Scotland">Scotland</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Iceland">Iceland</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Romania">Romania</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Latvia">Latvia</option>
                    </select>
                  </div>
                </div>
                
                <div className="filter-section">
                  <h4>Certification</h4>
                  <div className="select-wrapper">
                    <select
                      value={filters.certification}
                      onChange={handleCertificationChange}
                      className="filter-select"
                    >
                      <option value="">Any certification</option>
                      <option value="ISO">ISO Certified</option>
                      <option value="GOTS">GOTS Certified</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="filter-column">
                <div className="filter-section">
                  <h4>Sample time</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.sampleTime.under14}
                        onChange={() => handleSampleTimeChange('under14')}
                      />
                      <span>Under 14 days</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.sampleTime.under21}
                        onChange={() => handleSampleTimeChange('under21')}
                      />
                      <span>Under 21 days</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.sampleTime.over21}
                        onChange={() => handleSampleTimeChange('over21')}
                      />
                      <span>Over 21 days</span>
                    </label>
                  </div>
                </div>

                <div className="filter-section">
                  <h4>Production time</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.productionTime.under30}
                        onChange={() => handleProductionTimeChange('under30')}
                      />
                      <span>Under 30 days</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.productionTime.under60}
                        onChange={() => handleProductionTimeChange('under60')}
                      />
                      <span>Under 60 days</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filters.productionTime.over60}
                        onChange={() => handleProductionTimeChange('over60')}
                      />
                      <span>Over 60 days</span>
                    </label>
                  </div>
                </div>
                
                
              </div>


              <div className="filter-column">
                  <h4>Minimum order quantity</h4>
                  <div className="slider-container">
                    <div className="slider-labels">
                      <span>{filters.minimumOrder[0]} pcs</span>
                      <span>{filters.minimumOrder[1]}+ pcs</span>
                    </div>
                    <div className="range-slider-container">
                      <div className="slider-track">
                        <div 
                          className="slider-range"
                          style={{
                            left: `${(filters.minimumOrder[0] / 1000) * 100}%`,
                            right: `${100 - (filters.minimumOrder[1] / 1000) * 100}%`
                          }}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.minimumOrder[0]}
                        onChange={(e) => handleMinOrderChange(e.target.value, true)}
                        className="range-slider"
                        style={{ zIndex: filters.minimumOrder[0] > 500 ? 5 : 3 }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.minimumOrder[1]}
                        onChange={(e) => handleMinOrderChange(e.target.value, false)}
                        className="range-slider"
                        style={{ zIndex: 4 }}
                      />
                    </div>
                    <div className="slider-values">
                      <div className="slider-marks">
                        <span className="slider-mark">0</span>
                        <span className="slider-mark">200</span>
                        <span className="slider-mark">500</span>
                        <span className="slider-mark">800</span>
                        <span className="slider-mark">1000</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            
            
            <div className="filter-divider"></div>
            
            <div className="filter-buttons">
              <button className="reset-button" onClick={handleClearAll}>Reset</button>
            </div>
          </div>
        </div>
      )}

      {activeFiltersList.length > 0 && (
        <div className="active-filters-bar">
          <span className="active-filters-label">Active filters:</span>
          <div className="active-filter-tags">
            {activeFiltersList.map((filter, index) => (
              <span key={index} className="active-filter-tag">
                {filter}
                <button 
                  className="remove-filter"
                  onClick={() => handleRemoveFilter(filter)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button className="clear-all-link" onClick={handleClearAll}>Clear all</button>
        </div>
      )}

      <div className="section-header">
        <div className="results-count">
          Showing {indexOfFirstFactory + 1}-{Math.min(indexOfLastFactory, filteredFactories.length)} of {filteredFactories.length} factories
          {filters.location || activeFiltersList.length > 0 ? ` (${factoriesData.factories.length} total)` : ''}
        </div>
      </div>

      {filteredFactories.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3 className="no-results-title">No factories found</h3>
          <p className="no-results-message">
            {searchQuery ? 
              `No results found for "${searchQuery}"` : 
              'No factories match your current filters'
            }
          </p>
          <p className="no-results-suggestion">
            Try adjusting your search or filters
          </p>
          <button className="clear-filters-button" onClick={handleClearAll}>
            Clear all filters
          </button>
        </div>
      ) : (
        <div className={`factory-grid ${isTransitioning ? 'loading' : ''}`}>
          {currentFactories.map((factory, index) => (
            <div 
              key={factory.id} 
              className="factory-card-wrapper"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <FactoryCard factory={factory} />
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && filteredFactories.length > 0 && (
        <div className="pagination-container">
          <button 
            className="pagination-button pagination-prev"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <span className="pagination-arrow">←</span>
            <span className="pagination-text">Previous</span>
          </button>
          
          <div className="pagination-numbers">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            ))}
          </div>
          
          <button 
            className="pagination-button pagination-next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <span className="pagination-text">Next</span>
            <span className="pagination-arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FactorySection;