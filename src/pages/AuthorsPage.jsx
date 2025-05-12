import { useAuthors } from '../hooks/useAuthors';
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

    const handleSubmit = () => {
        const action = editingAuthor
            ? update(editingAuthor.id, formData)
            : create(formData);
        action.then(() => handleClose());
    };

    return (
        <div>
            <h2>Authors</h2>
            <Button variant="contained" onClick={() => handleOpen()}>Add Author</Button>
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell>Country ID</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {authors.map((author) => (
                        <TableRow key={author.id}>
                            <TableCell>{author.name}</TableCell>
                            <TableCell>{author.surname}</TableCell>
                            <TableCell>{author.country?.id}</TableCell>
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
                    <TextField
                        label="Country ID"
                        name="countryId"
                        fullWidth
                        value={formData.countryId}
                        onChange={handleChange}
                        margin="dense"
                    />
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
