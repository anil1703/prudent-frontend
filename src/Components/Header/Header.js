import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Header() {
  // State to track the active menu item
  const [activeLink, setActiveLink] = useState('Home');

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-success text-white mb-3">
          <Container fluid>
            <Navbar.Brand href="#" className="text-white">
              Book Store
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="bg-success"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="text-white"
                >
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link style={{
                    textDecoration:"none"
                  }} to="/">
                    <Nav.Link
                    href="#action1"
                    className={`text-white ${activeLink === 'Home' ? 'active' : ''}`}
                    onClick={() => handleSetActive('Home')}
                  >
                    Home
                  </Nav.Link>
                  </Link>

                  
                  <Link style={{
                    textDecoration:"none"
                  }} to="/contact">

<Nav.Link
                    href="#action2"
                    className={`text-white ${activeLink === 'Contact' ? 'active' : ''}`}
                    onClick={() => handleSetActive('Contact')}
                  >
                    Contact
                  </Nav.Link>
                  </Link>
                  
                  <Link style={{
                    textDecoration:"none"
                  }} to="/about">

<Nav.Link
                    href="#action3"
                    className={`text-white ${activeLink === 'About' ? 'active' : ''}`}
                    onClick={() => handleSetActive('About')}
                  >
                    About
                  </Nav.Link>
                  </Link>
                  
                  <Link style={{
                    textDecoration:"none"
                  }} to="/addBook">
                  <Nav.Link
                    href="#action4"
                    className={`text-white ${activeLink === 'Add Book' ? 'active' : ''}`}
                    onClick={() => handleSetActive('Add Book')}
                  >
                    Add Book
                  </Nav.Link>
                  </Link>
                  
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
