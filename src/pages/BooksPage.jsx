import { useBooks } from '../hooks/useBooks';
import { useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

const BooksPage = () => {
    const { books, create, update, remove } = useBooks();
    const [open, setOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        authorId: '',
        availableCopies: '',
    });

    const handleOpen = (book = null) => {
        setEditingBook(book);
        setFormData(book || {
            name: '',
            category: '',
            authorId: '',
            availableCopies: '',
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        const action = editingBook
            ? update(editingBook.id, formData)
            : create(formData);
        action.then(() => handleClose());
    };

    return (
        <div>
            <h2>Books</h2>
            <Button variant="contained" onClick={() => handleOpen()}>Add Book</Button>

            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Author ID</TableCell>
                        <TableCell>Copies</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>{book.category}</TableCell>
                            <TableCell>{book.author?.id}</TableCell>
                            <TableCell>{book.availableCopies}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleOpen(book)}>Edit</Button>
                                <Button color="error" onClick={() => remove(book.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingBook ? 'Edit Book' : 'Add Book'}</DialogTitle>
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
                        label="Category"
                        name="category"
                        fullWidth
                        value={formData.category}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <TextField
                        label="Author ID"
                        name="authorId"
                        fullWidth
                        value={formData.authorId}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <TextField
                        label="Available Copies"
                        name="availableCopies"
                        type="number"
                        fullWidth
                        value={formData.availableCopies}
                        onChange={handleChange}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>
                        {editingBook ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BooksPage;
