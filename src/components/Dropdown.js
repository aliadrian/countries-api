import React from 'react'

export const Dropdown = ({ selectedRegion, handleRegionChange, randomCountries }) => {
  const uniqueRegions = Array.from(new Set(randomCountries.map(country => country.region)));

  return (
    <>
      <div className='relative'>
        <label>
          <select className='md:w-full w-8/12 lg:px-12 shadow-lg py-6 md:px-6 px-4 border-r-8 border-white dark:border-darkElement dark:bg-darkElement dark:text-white' value={selectedRegion} onChange={(e) => handleRegionChange(e.target.value)}>
            <option value="" className=''>Filter by Region</option>
            {uniqueRegions.map(region => (
              <option className='dark:bg-darkBg dark:text-white' key={region} value={region}>{region}</option>
            ))}
          </select>
        </label>
      </div>
    </>
  )
}

export default Dropdown;
