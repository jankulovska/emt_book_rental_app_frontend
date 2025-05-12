import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => (
    <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Book Rental App
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/books">Books</Button>
                <Button color="inherit" component={Link} to="/authors">Authors</Button>
                <Button color="inherit" component={Link} to="/countries">Countries</Button>
            </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
            {children}
        </Container>
    </>
);

export default Layout;
