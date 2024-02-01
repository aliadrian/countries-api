import React from 'react'
// import CountryWeather from './CountryWeather';

const Country = ({ country }) => {
  const { name, capital, population, region } = country;
  let totalPopulation = population.toLocaleString("en");
  const flags = country.flags;
  const flagPicture = Object.values(flags)[0];
  const flagAlt = Object.values(flags)[2];

  return (
    <div className='max-w-fit mx-auto'>
      <div className='flex items-center justify-between w-320px w-full'>
      </div>
      <div className='rounded shadow-lg'>
        <div className=''>
          <img className='w-[335px] h-[180px] object-fill rounded-t-lg flag' src={flagPicture} alt={flagAlt} />
        </div>
        <div className='text-left px-6 pt-6 pb-10 dark:text-white dark:bg-darkElement rounded-b-lg'>
          <h1 className='font-bold text-lg pb-4 pt-3'>{name.common.length > 19 ? `${name.common.substring(0, 19)}...` : name.common}</h1>
          <div className='grid gap-1'>
            <p className='text-base font-semibold'>Population: <span className='font-normal'>{totalPopulation}</span></p>
            <p className='text-base font-semibold'>Region: <span className='font-normal'>{region}</span></p>
            <p className='text-base font-semibold'>Capital: <span className='font-normal'>{capital?.[0]?.length > 19 ? `${capital[0].substring(0, 19)}...` : capital?.[0]}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;