// import axios from 'axios';
//
// const BASE_URL = 'http://localhost:8080/api/authors';
//
// export const getAllAuthors = () => axios.get(BASE_URL);
// export const createAuthor = (author) => axios.post(BASE_URL, author);
// export const updateAuthor = (id, author) => axios.put(`${BASE_URL}/${id}`, author);
// export const deleteAuthor = (id) => axios.delete(`${BASE_URL}/${id}`);

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/authors';

// Fetch all authors
export const getAllAuthors = () => axios.get(BASE_URL);

// Create a new author (use /add endpoint)
export const createAuthor = (author) => axios.post(`${BASE_URL}/add`, author);

// Update an existing author (use /edit/{id} endpoint)
export const updateAuthor = (id, author) => axios.put(`${BASE_URL}/edit/${id}`, author);

// Delete an author (use /delete/{id} endpoint)
export const deleteAuthor = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
