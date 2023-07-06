import React, { useEffect, useState } from 'react'
import { Container, Form, Nav, NavDropdown, Navbar, Button, Offcanvas } from 'react-bootstrap';
import './MegaMenu.css';
import { Link } from 'react-router-dom';
import { storageService } from '../../utils/config';

const MegaMenu = () => {
    const [name] = useState("Vikrant Kumar");
    const [screenSize, setScreenSize] = useState('xl');
    const token = localStorage.getItem('dev_token')

    const handleLogout = ()=>{

        storageService.remove('dev_token');
        window.location.pathname = "/login";
    }
    useEffect(() => {
      setScreenSize(getViewport());
    }, []);
    
    const getViewport = () => {
        const width = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        if (width <= 576) return 'xs';
        if (width <= 768) return 'sm';
        if (width <= 992) return 'md';
        if (width <= 1200) return 'lg';
        return 'xl';
      }


    return (
        <Container fluid className="bg-blue sticky-top">
            <Container>
                <Navbar expand='lg' variant="dark" className="mb-3">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">{screenSize === 'md' || screenSize === 'sm' || screenSize === 'xs' ? name : 'devnotes'}</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} className="shadow-none border-0 p-0 " />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                    devnotes
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {token ? <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/create">Create</Nav.Link>
                                    <NavDropdown
                                        title={name}
                                        id={`offcanvasNavbarDropdown-expand-lg`}
                                        className="shadow-none"
                                    >
                                        <NavDropdown.Item as={Link} to="/my-account">My account</NavDropdown.Item>
                                        {/* <NavDropdown.Item as={Link} to="settings">
                                            Settings
                                        </NavDropdown.Item> */}
                                        <NavDropdown.Item as={Button} onClick={()=>handleLogout()}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                : 
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                                </Nav>}
                                <Form className="d-flex bg-light justify-content-between border-blue">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="rounded-0 shadow-none border-0"
                                        aria-label="Search"
                                    />
                                    <Button variant="none" className="rounded-0 shadow-none border text-light bg-blue ">Search</Button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </Container>
        </Container>
    )
}

export default MegaMenu