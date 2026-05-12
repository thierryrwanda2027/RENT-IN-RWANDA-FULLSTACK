import React, { useState, useRef, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { 
  FaSearch, 
  FaCamera, 
  FaUtensils, 
  FaSpa, 
  FaDumbbell, 
  FaPaintBrush, 
  FaCut, 
  FaLeaf, 
  FaConciergeBell 
} from 'react-icons/fa';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const services = [
  { name: 'Photography', icon: <FaCamera /> },
  { name: 'Dining', icon: <FaUtensils /> },
  { name: 'Wellness', icon: <FaSpa /> },
  { name: 'Fitness', icon: <FaDumbbell /> },
  { name: 'Art', icon: <FaPaintBrush /> },
  { name: 'Grooming', icon: <FaCut /> },
  { name: 'Outdoor', icon: <FaLeaf /> },
  { name: 'Concierge', icon: <FaConciergeBell /> },
];

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search
  const debouncedOnChange = useMemo(
    () => debounce((val: string) => onChange(val), 300),
    [onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    debouncedOnChange(val);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-wrapper">
      <div className="modern-search-container service-search">
        <div className="search-section">
          <div className="search-label">Where</div>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search destinations" 
            className="search-input-field"
            value={localValue}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="vertical-divider"></div>
        
        <div className="search-section">
          <div className="search-label">When</div>
          <input type="text" placeholder="Add dates" className="search-input-field" />
        </div>
        
        <div className="vertical-divider"></div>
        
        <div 
          className={`search-section service-trigger ${isDropdownOpen ? 'active' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="search-label">Type of service</div>
          <div className="search-label" style={{ fontWeight: 'normal', color: '#222' }}>
            {selectedService || 'Add service'}
          </div>
        </div>

        <button className="search-action-btn">
          <FaSearch />
          <span>Search</span>
        </button>

        {isDropdownOpen && (
          <div className="services-dropdown" ref={dropdownRef}>
            <div className="services-grid">
              {services.map((service) => (
                <button 
                  key={service.name} 
                  className="service-chip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service.name);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="service-icon">{service.icon}</span>
                  <span className="service-name">{service.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
