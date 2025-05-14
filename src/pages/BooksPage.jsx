import { useEffect } from 'react';
import axios from 'axios';
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
        const bookData = {
            name: formData.name,
            category: formData.category,
            author: { id: Number(formData.authorId) },
            availableCopies: Number(formData.availableCopies),
        };

        const action = editingBook
            ? update(editingBook.id, bookData)
            : create(bookData);

        action.then(() => handleClose());
    };


    const categories = ['NOVEL', 'THRILLER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'DRAMA'];
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/authors')
            .then((res) => setAuthors(res.data))
            .catch(console.error);
    }, []);


    return (
        <div>
            <h2>Books</h2>
            <Button variant="contained" onClick={() => handleOpen()}>Add Book</Button>

            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Author name</TableCell>
                        <TableCell>Copies</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>{book.category}</TableCell>
                            <TableCell>{book.author?.name}</TableCell>
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
                        select
                        label="Category"
                        name="category"
                        fullWidth
                        value={formData.category}
                        onChange={handleChange}
                        margin="dense"
                        SelectProps={{ native: true }}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Author"
                        name="authorId"
                        fullWidth
                        value={formData.authorId}
                        onChange={handleChange}
                        margin="dense"
                        SelectProps={{ native: true }}
                    >
                        <option value="">Select an author</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name} {author.surname}
                            </option>
                        ))}
                    </TextField>
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
