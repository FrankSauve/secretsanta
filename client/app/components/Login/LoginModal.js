import React, { Component } from 'react';
import { Button, Modal, Navbar } from 'react-bootstrap';
import LoginForm from './LoginForm'


export default class LoginModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
       show: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  // Handles showing the modal
  handleShow(){
    this.setState({ show: true });
  }

  // Handles closing the modal
  handleClose(){
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Navbar.Text  pullRight>
        <Button className="nav-button" bsStyle="link" onClick={this.handleShow}>
          <strong id="navLogin">Login</strong>
        </Button>
        </Navbar.Text>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
