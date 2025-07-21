import axios from "axios";

const baseUrl =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,languages,currencies,tld,borders,cca3";

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    const countries = request.data;

    // Filter out countries with region "Antarctica"
    const filteredCountries = countries.filter(
      (country) => country.region?.toLowerCase() !== "antarctica"
    );

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
