import React, { useState } from "react";
import Country from "./Country";
import { useNavigate } from 'react-router-dom';

const CountryList = ({ filterCountries, selectedRegion }) => {
  const [showDetails, setShowDetails] = useState(null)
  const history = useNavigate();

  const handleToggleDetails = (countryName) => {
    setShowDetails(showDetails === countryName ? null : countryName);
  }

  const countriesToRender = filterCountries.filter(country => !selectedRegion || country.region === selectedRegion);

  const navigateToCountryAbout = (country) => {
    history(`/country/${country.name.common}`, { state: { country } });
  }

  return (
    <div className='grid grid-container items-baseline gap-16 dark:bg-darkBg bg-white'>
      {countriesToRender.map((country, index) => (
        <button key={index} onClick={() => navigateToCountryAbout(country)}>
          <Country
            key={index}
            country={country}
            showDetails={showDetails}
            onToggleDetails={handleToggleDetails}
          />
        </button>
      ))}
    </div>
  )
}

export default CountryList