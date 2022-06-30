import React from "react";
import { NavLink, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation(props) {
  return (
    <Navbar bg="dark-1" variant="dark-1" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <span className="text-blue logo">Orpheus</span>
        </Link>
        <Nav className="navbar-nav fs-5">
          <NavLink to="search" className="nav-link text-white">
            Search
          </NavLink>
          <NavLink to="discover" className="nav-link text-white">
            Discover
          </NavLink>
          {props.token && (
            <NavDropdown title={props.currentUserData.display_name}>
              <NavDropdown.Item>
                <Link to="profile">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={props.signout}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
