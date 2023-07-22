import React, { useEffect, useState } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Button,
  Offcanvas,
} from "react-bootstrap";
import "./MegaMenu.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { storageService } from "../../utils/config";
import { getUserDetail } from "../../service/user";
import AppLogo from "../logo/AppLogo";
import Search from "../search/Search";

const MegaMenu = () => {
  const [user, setUser] = useState(getUserDetail());
  const navigate = useNavigate();
  // const [screenSize, setScreenSize] = useState("xl");
  const token = localStorage.getItem("dev_token");
  const { pathname } = useLocation();
  const [screenSize, setScreenSize] = useState(null);
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    setShow(false);
    storageService.remove("dev_token");
    setUser(false);
    navigate("/");
  };

  useEffect(() => {
    setScreenSize(getViewport());
  }, [screenSize]);

  const getViewport = () => {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (width <= 576) return "xs";
    if (width <= 768) return "sm";
    if (width <= 992) return "md";
    if (width <= 1200) return "lg";
    return "xl";
  };

  return (
    <Container fluid className="bg-blue sticky-top mb-3">
      <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <AppLogo user={user} />
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setShow(!show)}
            aria-controls={`offcanvasNavbar-expand-lg`}
            className="shadow-none border-0 p-0 "
          />
          <Navbar.Offcanvas
            show={show}
            onHide={() => setShow(!show)}
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="bg-light w-75"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                devshare
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {token ? (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    className={`${pathname === "/" ? "active" : ""}`}
                    onClick={() => setShow(false)}
                    as={Link}
                    to="/"
                  >
                    Home
                  </Nav.Link>

                  {user.isAdmin && (
                    <Nav.Link
                      className={`${pathname === "/my-wall" ? "active" : ""}`}
                      as={Link}
                      to="/my-wall"
                      onClick={() => setShow(false)}
                    >
                      My wall
                    </Nav.Link>
                  )}

                  {/* title={<Avatar userImage={user?.userImage} />} */}
                  <NavDropdown
                    title="More"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    className={`shadow-none ${
                      screenSize === "sm" || screenSize === "xs" ? "mb-4" : ""
                    }`}
                  >
                    <NavDropdown.Item
                      className={`${
                        pathname === "/my-account" ? "active" : ""
                      }`}
                      onClick={() => setShow(false)}
                      as={Link}
                      to="/my-account"
                    >
                      My account
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout} as={Button}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    onClick={() => setShow(false)}
                    className={`${pathname === "/login" ? "active" : ""}`}
                    as={Link}
                    to="/login"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => setShow(false)}
                    className={`${pathname === "/signup" ? "active" : ""}`}
                    as={Link}
                    to="/signup"
                  >
                    Signup
                  </Nav.Link>
                </Nav>
              )}
              <Search />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
  );
};

export default MegaMenu;
