import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const TopBar = (props) => {

  const {
    sign_in_route,
    sign_out_route,
    sign_up_route,
    logged_in,
    edit_account
  } = props

  return ( 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/allitems">All Items</Nav.Link>
          <Nav.Link href="/favorite_items">Favorite Items</Nav.Link>
          
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/favorite_items">Favorite Items</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          { logged_in && 
            <Nav.Link href={ sign_out_route } >Sign Out</Nav.Link>
          }
          { !logged_in && 
            <Nav.Link href={ sign_in_route } >Log In</Nav.Link>
          }
          <Nav.Link href={ edit_account } >My Account</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;