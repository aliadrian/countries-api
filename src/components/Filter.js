import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Filter = ({ handleCountryNameChange, filterValue }) => {
  const placeholderText = 'Search for a country...';

  const handleInputClick = () => {
    handleCountryNameChange({ target: { value: '' } });
  };

  return (
    <div className="grid dark:text-white">
      <div className="relative">
        <input
          value={filterValue}
          className="xl:w-11/12 w-full pl-20 md:pr-36 md:pl-24 lg:pr-72 shadow-lg py-6 dark:bg-darkElement"
          placeholder={placeholderText}
          onChange={handleCountryNameChange}
          onClick={handleInputClick}
        />
        <div className="absolute top-6 pl-8 md:pl-8">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Filter;