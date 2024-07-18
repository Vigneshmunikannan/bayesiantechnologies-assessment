import React, { useState } from 'react';

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-box">
        <div className="dropdownitems">
          <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
            {placeholder}
          </div>
          <span className="dropdown-value" onClick={() => setIsOpen(!isOpen)}>
            {value || "Select Option"} <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
