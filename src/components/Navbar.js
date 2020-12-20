import React, {Component} from 'react';
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyNavbar() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/home">Pizzeria</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            </Nav>
            <Form inline>
                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar