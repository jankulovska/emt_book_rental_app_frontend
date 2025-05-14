import { useAuthors } from '../hooks/useAuthors';
import { useState } from 'react';
import { useCountries } from '../hooks/useCountries';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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

const AuthorsPage = () => {
    const { authors, create, update, remove } = useAuthors();
    const [open, setOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [formData, setFormData] = useState({ name: '', surname: '', countryId: '' });

    const handleOpen = (author = null) => {
        setEditingAuthor(author);
        setFormData(author || { name: '', surname: '', countryId: '' });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = () => {
    //     const action = editingAuthor
    //         ? update(editingAuthor.id, formData)
    //         : create(formData);
    //     action.then(() => handleClose());
    // };
    const handleSubmit = () => {
        const authorPayload = {
            name: formData.name,
            surname: formData.surname,
            countryId: Number(formData.countryId),
        };

        const action = editingAuthor
            ? update(editingAuthor.id, authorPayload)
            : create(authorPayload);

        action.then(() => handleClose());
    };

    const { countries } = useCountries();

    return (
        <div>
            <h2>Authors</h2>
            <Button variant="contained" onClick={() => handleOpen()}>Add Author</Button>
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell>Country name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {authors.map((author) => (
                        <TableRow key={author.id}>
                            <TableCell>{author.name}</TableCell>
                            <TableCell>{author.surname}</TableCell>
                            <TableCell>{author.country?.name}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleOpen(author)}>Edit</Button>
                                <Button color="error" onClick={() => remove(author.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingAuthor ? 'Edit Author' : 'Add Author'}</DialogTitle>
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
                        label="Surname"
                        name="surname"
                        fullWidth
                        value={formData.surname}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            name="countryId"
                            value={formData.countryId}
                            onChange={handleChange}
                            label="Country"
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>
                        {editingAuthor ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AuthorsPage;
