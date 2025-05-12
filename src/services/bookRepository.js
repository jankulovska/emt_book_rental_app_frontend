import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/books';

export const getAllBooks = () => axios.get(BASE_URL);
export const getBook = (id) => axios.get(`${BASE_URL}/${id}`);
export const createBook = (book) => axios.post(`${BASE_URL}/add`, book);
export const updateBook = (id, book) => axios.put(`${BASE_URL}/edit/${id}`, book);

export const deleteBook = (id) => axios.delete(`${BASE_URL}/delete/${id}`);