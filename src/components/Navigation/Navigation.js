import React from "react";
import { NavLink, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    /*
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="search">Search</Link>
                </li>
                <li>
                    <Link to="discover">Discover</Link>
                </li>
            </ul>
        </nav>*/

    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <span className="text-primary">Orpheus</span>
        </Link>
        <Nav className="navbar-nav fs-5">
          <NavLink to="search" className="nav-link">
            Search
          </NavLink>
          <NavLink to="discover" className="nav-link">
            Discover
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
