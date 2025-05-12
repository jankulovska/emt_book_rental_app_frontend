import { useState, useEffect } from 'react';
import * as authorRepo from '../services/authorRepository';

export const useAuthors = () => {
    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        const res = await authorRepo.getAllAuthors();
        setAuthors(res.data);
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const create = async (author) => {
        await authorRepo.createAuthor(author);
        fetchAuthors();
    };

    const update = async (id, author) => {
        await authorRepo.updateAuthor(id, author);
        fetchAuthors();
    };

    const remove = async (id) => {
        await authorRepo.deleteAuthor(id);
        fetchAuthors();
    };

    return { authors, create, update, remove };
};
