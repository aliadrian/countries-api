import React from 'react'
import Country from './Country'

const Countries = ({ filteredCountries }) => {
  return (
    <div>
      {filteredCountries.map((country, index) =>
        <Country key={index} country={country} />
      )}
    </div>
  )
}

export default Countries