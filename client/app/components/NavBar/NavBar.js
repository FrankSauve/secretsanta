import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import LoginModal from '../Login/LoginModal';

export default class NavBar extends Component {
  render() {
    return (
      <div >
        <Navbar className="navbar-static-top navbar-inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home" id="navBrand">Secret Santa</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            <NavItem eventKey={1} href="#">
              <strong id="navStartExchange">Start Exchange</strong>
            </NavItem>
            </Nav>
              <Navbar.Text pullRight>
                <Navbar.Link href="#" id="navName"><strong>Mark Otto</strong></Navbar.Link>
              </Navbar.Text>
              <LoginModal />
            </Navbar.Collapse>
        </Navbar>;
      </div>
    )
  }
}
