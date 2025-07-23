import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import "./index.css";
import countriesService from "./services/countries";
import CountryList from "./components/CountryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as fasFaMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as farFaMoon } from "@fortawesome/free-regular-svg-icons";
import Dropdown from "./components/Dropdown";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountryAbout from "./components/CountryAbout";

const getSystemColorScheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showFilter, setshowFilter] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const storedTheme = localStorage.getItem("theme");
  const defaultTheme = storedTheme || getSystemColorScheme();

  const [theme, setTheme] = useState(defaultTheme);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // useEffect to set the initial theme based on system or localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => {
        // Filter out countries with region "Antarctica"
        const filteredCountries = initialCountries.filter(
          (country) => country.region.toLowerCase() !== "antarctic"
        );
        setCountries(filteredCountries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryNameChange = (e) => {
    const nameFilter = e.target.value.toLowerCase();
    setshowFilter(nameFilter);
    setFilterValue(nameFilter);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const filterCountries = () => {
    if (showFilter || selectedRegion) {
      const filteredCountries = showFilter
        ? countries.filter((country) =>
            country.name.common.toLowerCase().includes(showFilter.toLowerCase())
          )
        : countries;

      return selectedRegion
        ? filteredCountries.filter(
            (country) => country.region === selectedRegion
          )
        : filteredCountries;
    } else {
      return countries;
    }
  };

  return (
    <Router>
      <div
        className={`App ${
          theme === "dark" ? "dark" : ""
        } bg-white dark:bg-darkBg`}
      >
        <nav className="shadow-lg bg-white dark:bg-darkElement ">
          <div className="max-w-screen-2xl mx-auto py-6 items-center">
            <div className="flex justify-between  dark:text-white sm:px-20 px-10">
              <Link to="/" className="md:text-2xl text-lg font-bold">
                Where in the world?
              </Link>
              <button
                className="flex items-center gap-2 md:gap-4"
                onClick={switchTheme}
              >
                <FontAwesomeIcon
                  icon={theme === "dark" ? fasFaMoon : farFaMoon}
                />
                <span className="md:text-xl">Dark Mode</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-screen-2xl mx-auto mt-10 min-h-[100vh] dark:bg-darkBg sm:px-20 px-10">
          <Routes>
            <Route
              path="/"
              element={
                <div className="">
                  <div className="flex gap-6 md:items-center justify-between md:flex-row flex-col pb-12">
                    <div>
                      <Filter
                        handleCountryNameChange={handleCountryNameChange}
                        filterValue={filterValue}
                      />
                    </div>
                    <div>
                      <Dropdown
                        selectedRegion={selectedRegion}
                        handleRegionChange={handleRegionChange}
                        countries={countries}
                      />
                    </div>
                  </div>
                  <div className="xs:grid py-6">
                    {filterCountries().length > 0 ? (
                      <CountryList
                        filterCountries={filterCountries()}
                        selectedRegion={selectedRegion}
                        countries={countries}
                      />
                    ) : (
                      <CountryList
                        filterCountries={countries}
                        countries={countries}
                      />
                    )}
                  </div>
                </div>
              }
            />
            <Route
              path="/country/:name"
              element={<CountryAbout countries={countries} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
