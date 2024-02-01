import React, { useState, useEffect } from "react";
import Filter from './components/Filter';
import "./index.css"
import countriesService from "./services/countries";
import CountryList from "./components/CountryList";
import "./output.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as fasFaMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as farFaMoon } from '@fortawesome/free-regular-svg-icons';
import Dropdown from "./components/Dropdown";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CountryAbout from "./components/CountryAbout";

const App = () => {
  const [countries, setCountries] = useState([])
  const [showFilter, setshowFilter] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [theme, setTheme] = useState("dark");
  const [filterValue, setFilterValue] = useState('');
  const [randomCountries, setRandomCountries] = useState([]);

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      })
  }, [])

  useEffect(() => {
    if (randomCountries.length === 0 && countries.length > 0) {
      setRandomCountries(getRandomCountries(8));
    }
  }, [randomCountries, countries]); // eslint-disable-line

  const getRandomCountries = (count) => {
    const shuffledCountries = [...countries.sort(() => 0.5 - Math.random())]
    return shuffledCountries.slice(0, count);
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("darkBg");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("darkBg");
    }
  }, [theme]);

  const handleCountryNameChange = (e) => {
    const nameFilter = e.target.value.toLowerCase();
    setshowFilter(nameFilter);
    setFilterValue(nameFilter);
  }

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  }

  const filterCountries = () => {
    if (showFilter || selectedRegion) {
      const filteredCountries = showFilter
        ? countries.filter(country =>
          country.name.common.toLowerCase().includes(showFilter.toLowerCase())
        )
        : randomCountries;

      return selectedRegion
        ? filteredCountries.filter(country => country.region === selectedRegion)
        : filteredCountries;
    } else {
      return randomCountries;
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
  }

  return (
    <Router>
      <div className={`App ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-darkBg`}>
        <nav className="shadow-lg bg-white dark:bg-darkElement ">
          <div className="max-w-screen-2xl mx-auto py-6 items-center">
            <div className="flex justify-between  dark:text-white sm:px-20 px-10">
              <Link to="/" className="md:text-2xl text-lg font-bold">Where in the world?</Link>
              <button className="flex items-center gap-2 md:gap-4" onClick={toggleDarkMode}>
                <FontAwesomeIcon icon={isDarkMode ? fasFaMoon : farFaMoon} style={{ color: isDarkMode ? "#ffffff" : "#000000" }} />
                <p className="md:text-xl">Dark Mode</p>
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-screen-2xl mx-auto mt-10 min-h-[87.5vh] dark:bg-darkBg sm:px-20 px-10">
          <Routes>
            <Route path="/"
              element={(
                <div className="">
                  <div className="flex gap-6 md:items-center justify-between md:flex-row flex-col pb-12">
                    <div>
                      <Filter handleCountryNameChange={handleCountryNameChange} filterValue={filterValue} />
                    </div>
                    <div>
                      <Dropdown selectedRegion={selectedRegion} handleRegionChange={handleRegionChange} randomCountries={randomCountries} />
                    </div>
                  </div>
                  <div className="xs:grid py-6">
                    {filterCountries().length > 0 ? (
                      <CountryList filterCountries={filterCountries()} selectedRegion={selectedRegion} randomCountries={randomCountries} />
                    ) : (

                      <CountryList filterCountries={countries} randomCountries={randomCountries} />
                    )}
                  </div>
                </div>
              )}
            />
            <Route path="/country/:name" element={<CountryAbout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
