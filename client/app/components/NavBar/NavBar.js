import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import LoginModal from '../Login/LoginModal';
import Logout from '../Login/Logout';
import Gravatar from './Gravatar';
import auth from '../../util/auth';

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
            <Nav pullRight>
              {auth.isLoggedIn() ? <Gravatar id="gravatar"/> : null}
            </Nav>
            <Navbar.Text pullRight>
              {auth.isLoggedIn() ? <Navbar.Link href="#" id="navName">{localStorage.getItem('name')}</Navbar.Link> : null}
            </Navbar.Text>
            {auth.isLoggedIn() ? null : <LoginModal />}
            {auth.isLoggedIn() ? <Logout /> : null}
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
