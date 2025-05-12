import { useState, useEffect } from 'react';
import * as bookRepo from '../services/bookRepository';

export const useBooks = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const res = await bookRepo.getAllBooks();
        setBooks(res.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const create = async (book) => {
        await bookRepo.createBook(book);
        fetchBooks();
    };

    const update = async (id, book) => {
        await bookRepo.updateBook(id, book);
        fetchBooks();
    };

    const remove = async (id) => {
        await bookRepo.deleteBook(id);
        fetchBooks();
    };

    return { books, create, update, remove };
};
