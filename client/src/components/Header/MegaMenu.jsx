import React, { useEffect, useState } from 'react'
import { Container, Form, Nav, NavDropdown, Navbar, Button, Offcanvas } from 'react-bootstrap';
import './MegaMenu.css';
import { Link, useLocation } from 'react-router-dom';
import { storageService } from '../../utils/config';
import { getUserDetail } from '../../service/user';

const MegaMenu = () => {
    const [user] = useState(getUserDetail());

    const [name] = useState(user?.username);
    const [screenSize, setScreenSize] = useState('xl');
    const token = localStorage.getItem('dev_token');
    const {pathname} = useLocation();

    const [show, setShow] = useState(false);

    const handleLogout = ()=>{
        setShow(false);
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
                        <Navbar.Brand as={Link} to="/">{screenSize === 'md' || screenSize === 'sm' || screenSize === 'xs' ? name : 'devshare'}</Navbar.Brand>
                        <Navbar.Toggle  onClick={()=> setShow(!show)} aria-controls={`offcanvasNavbar-expand-lg`} className="shadow-none border-0 p-0 " />
                        <Navbar.Offcanvas
                        show={show} onHide={()=> setShow(!show)}
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                devshare
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {token ? <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link className={`${pathname === '/' ? 'active' : ''}`} onClick={()=> setShow(false)} as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link className={`${pathname === '/create' ? 'active' : ''}`} onClick={()=> setShow(false)} as={Link} to="/create">Create</Nav.Link>
                                    <NavDropdown
                                        title={name}
                                        id={`offcanvasNavbarDropdown-expand-lg`}
                                        className="shadow-none"
                                    >
                                        <NavDropdown.Item className={`${pathname === '/my-account' ? 'active' : '' }`} onClick={()=> setShow(false)} as={Link} to="/my-account">My account</NavDropdown.Item>
                                        {/* <NavDropdown.Item as={Link} to="settings">
                                            Settings
                                        </NavDropdown.Item> */}
                                        <NavDropdown.Item onClick={handleLogout} as={Button}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                : 
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link className={`${pathname === '/login' ? 'active' : '' }`} as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link className={`${pathname === '/signup' ? 'active' : ''}`} as={Link} to="/signup">Signup</Nav.Link>
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