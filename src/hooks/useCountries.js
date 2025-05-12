import { useState, useEffect } from 'react';
import * as countryRepo from '../services/countryRepository';

export const useCountries = () => {
    const [countries, setCountries] = useState([]);

    const fetchCountries = async () => {
        const res = await countryRepo.getAllCountries();
        setCountries(res.data);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const create = async (country) => {
        await countryRepo.createCountry(country);
        fetchCountries();
    };

    const update = async (id, country) => {
        await countryRepo.updateCountry(id, country);
        fetchCountries();
    };

    const remove = async (id) => {
        await countryRepo.deleteCountry(id);
        fetchCountries();
    };

    return { countries, create, update, remove };
};
