import React, { Component } from 'react';
import { Button, Modal, Navbar } from 'react-bootstrap';
import RegisterForm from './RegisterForm';

export default class RegisterModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
       show: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  // Handles showing the register modal
  handleShow(){
    this.setState({ show: true });
  }

  // Handles closing the register modal
  handleClose(){
    this.setState({ show: false })
  }

  render() {
    return (
      <div>
        <Navbar.Text pullRight>
          <Button className="nav-button" bsStyle="link" onClick={this.handleShow}>
            <strong id="navRegister">Register</strong>
          </Button>
        </Navbar.Text>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
