import { useCountries } from '../hooks/useCountries';
import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';

const CountriesPage = () => {
    const { countries, create, update, remove } = useCountries();
    const [open, setOpen] = useState(false);
    const [editingCountry, setEditingCountry] = useState(null);
    const [formData, setFormData] = useState({ name: '', continent: '' });

    const handleOpen = (country = null) => {
        setEditingCountry(country);
        setFormData(country || { name: '', continent: '' });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const action = editingCountry
            ? update(editingCountry.id, formData)
            : create(formData);
        action.then(() => handleClose());
    };

    return (
        <div>
            <h2>Countries</h2>
            <Button variant="contained" onClick={() => handleOpen()}>Add Country</Button>
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Continent</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countries.map((country) => (
                        <TableRow key={country.id}>
                            <TableCell>{country.name}</TableCell>
                            <TableCell>{country.continent}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleOpen(country)}>Edit</Button>
                                <Button color="error" onClick={() => remove(country.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingCountry ? 'Edit Country' : 'Add Country'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <TextField
                        label="Continent"
                        name="continent"
                        fullWidth
                        value={formData.continent}
                        onChange={handleChange}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>
                        {editingCountry ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CountriesPage;
