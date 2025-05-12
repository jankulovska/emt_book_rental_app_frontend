import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/countries';

// Fetch all countries
export const getAllCountries = () => axios.get(BASE_URL);

// Create a new country (use /add endpoint)
export const createCountry = (country) => axios.post(`${BASE_URL}/add`, country);

// Update an existing country (use /edit/{id} endpoint)
export const updateCountry = (id, country) => axios.put(`${BASE_URL}/edit/${id}`, country);

// Delete a country (use /delete/{id} endpoint)
export const deleteCountry = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
