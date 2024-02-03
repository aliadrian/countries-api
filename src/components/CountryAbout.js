import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom'

const CountryAbout = ({ countries }) => {
  const navigate = useNavigate();
  const [neighboringCountries, setNeighboringCountries] = useState([]);
  const { name: urlParamName } = useParams();
  const country = countries.find((c) => c.name.common === urlParamName);

  useEffect(() => {
    const fetchNeighboringCountries = async () => {
      try {
        if (!country || !country.borders || !Array.isArray(country.borders)) {
          return;
        }

        const neighboringCountriesData = countries.filter((c) => country.borders.includes(c.cca3));
        const neighboringCountriesNames = neighboringCountriesData.map((c) => c.name.common);
        setNeighboringCountries(neighboringCountriesNames);
      } catch (error) {
        console.error('Error fetching neighboring countries:', error);
      }
    };

    fetchNeighboringCountries();
  }, [country, countries]);

  const handleNeighboringCountryClick = async (neighbor) => {
    try {
      const selectedCountry = countries.find((c) => c.name.common === neighbor);

      if (selectedCountry) {
        navigate(`/country/${selectedCountry.name.common}`, {});
      }
    } catch (error) {
      console.error('Error fetching neighboring country data:', error);
    }
  };


  if (!country) {
    return <div>Loading...</div>;
  }

  const { name, capital, region, subregion, population, tld, languages } = country;

  let totalPopulation = population?.toLocaleString("en");
  const flags = country.flags;
  const flagPicture = Object.values(flags)[0];
  const flagAlt = Object.values(flags)[2];
  const currencyCode = Object.keys(country.currencies)[0];
  const currencyDetails = country.currencies[currencyCode];
  const languageArray = Object.values(languages);
  const nativeNameValues = Object.values(name.nativeName)

  const calculateRows = () => {
    if (neighboringCountries.length >= 14) {
      return 'grid-rows-4';
    } else if (neighboringCountries.length > 5) {
      return 'grid-rows-3';
    } else {
      return 'grid-rows-1';
    }
  };

  return (
    <div className="max-w-screen-2xl min-h-[100dvh]">
      <button onClick={() => navigate("/")} className="my-8 shadow-lg py-2 w-2/5 md:w-[15%] lg:w-[20%] dark:text-white dark:bg-darkElement flex items-center px-6 gap-3 justify-center rounded">
        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" />
        <span>Back</span>
      </button>
      <div className='xl:grid custom-grid pt-8 xl:gap-2 gap-12 items-center'>
        <div className='xl:justify-start grid custom-grid-row justify-center'>
          <img className='w-[500px] object-contain xl:object-fill flag' src={flagPicture} alt={flagAlt} />
        </div>
        <div className='grid dark:text-white xl:pl-20 xl:row-start-1 xl:row-end-4 xl:self-center'>
          <h1 className='font-bold text-xl xl:text-3xl pt-8 xl:pt-0 pb-8'>{name?.common}</h1>
          <p className='text-sm xl:text-md font-semibold pb-2'>Native Name: <span className='font-normal'>{nativeNameValues?.[0]?.official}</span></p>
          <p className='text-sm xl:text-md font-semibold pb-2'>Population: <span className='font-normal'>{totalPopulation}</span></p>
          <p className='text-sm xl:text-md font-semibold pb-2'>Region: <span className='font-normal'>{region}</span></p>
          <p className='text-sm xl:text-md font-semibold pb-2'>Sub Region: <span className='font-normal'>{subregion}</span></p>
          <p className='text-sm xl:text-md font-semibold pb-2'>Capital: <span className='font-normal'>{capital?.[0]}</span></p>
        </div>
        <div className="grid gap-2 xl:justify-end xl:row-start-1 xl:row-end-4 pt-12 mb-10 dark:text-white self-center">
          <p className='text-sm xl:text-md font-semibold'>Top Level Domain: <span className='font-normal'>{tld?.[0]}</span></p>
          <p className='text-sm xl:text-md font-semibold'>Currencies: <span className='font-normal'>{currencyDetails?.name}</span></p>
          <p className='text-sm xl:text-md font-semibold'>Languages: <span className='font-normal'>{languageArray?.sort().join(', ')}</span></p>
        </div>
        <div className="xl:grid dark:text-white xl:col-start-2 xl:col-end-4 xl:pl-20 pb-16 xl:pb-8 xl:self-end">
          {neighboringCountries.length > 0 && (
            <div className="country-about-grid">
              <ul className={`grid xl:grid-flow-col gap-4 col-start-1 col-end-3 items-baseline ${calculateRows()}`}>
                <p className='text-md font-semibold whitespace-nowrap row-start-1 row-end-[-1] self-center pr-4'>Border Countries:</p>
                {neighboringCountries.map((neighbor, index) => (
                  <Link to={`/country/${neighbor}`} key={index} onClick={() => handleNeighboringCountryClick(neighbor)} className="outline outline-1 outline-lightGray dark:outline-none py-1 dark:text-white dark:bg-darkElement px-3 text-center whitespace-nowrap shadow-sm shadow-darkGray dark:shadow-darkBg rounded" >
                    {neighbor}
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryAbout;
