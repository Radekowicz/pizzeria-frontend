import React, {useContext} from 'react';
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../contexts/Context';

function MyNavbar() {

    const { logged, setLogged, user, setUser } = useContext(Context)

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/home">Pizzeria</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Strona główna</Nav.Link>
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            </Nav>

            <Form inline>
                {logged === false 
                ? <Nav.Link as={Link} to="/login">Zaloguj się</Nav.Link>
                : <Nav.Link as={Link} to="/user">{user}</Nav.Link>
                }
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar
