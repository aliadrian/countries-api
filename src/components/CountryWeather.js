import React, { useState, useEffect } from 'react';


const CountryWeather = ({ countryName }) => {

  // console.log(countryName);
  const API_KEY = process.env.REACT_APP_API_KEY

  const api = {
    key: API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [weather, setWeather] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`${api.base}weather?q=${countryName}&units=metric&APPID=${API_KEY}`);
        const result = await response.json();
        // console.log(result);
        setWeather(result);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [countryName]); // Trigger the effect when countryName changes
  /* eslint-disable react-hooks/exhaustive-deps */

  return (
    <div>
      {weather ? (
        <div>
          <div>
            temperature: {Math.round(weather.main.temp)}°C
          </div>
          <div>
            {weather.weather[0].main}
          </div>
          <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="Weather icon" />
          </div>
          <div>
            wind {weather.wind.speed} m/s
          </div>
        </div>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
};

export default CountryWeather;