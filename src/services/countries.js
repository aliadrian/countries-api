import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/all';

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    const countries = request.data;

    // Filter out countries with region "Antarctica"
    const filteredCountries = countries.filter(country => country.region.toLowerCase() !== 'antarctica');

    return filteredCountries;
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    throw error;
  }
};

const exportedObject = {
  getAll,
};

export default exportedObject;