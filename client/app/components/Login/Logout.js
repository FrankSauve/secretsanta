import React, { Component } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import auth from '../../util/auth'
import { Redirect } from 'react-router-dom';

//Options for react-alert
const alertOptions={
  position: 'bottom center'
}

export default class Logout extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      redirect: false
    }

    this.logout = this.logout.bind(this);
  }
  
  logout(){
    auth.logOut();
    this.setState({redirect: true});
  }

  render() {
    if(this.state.redirect){
     return(
       <Redirect push to="/" />
     );
    }
    return (
      <div>
        <Navbar.Text  pullRight>
        <Button className="nav-button" bsStyle="link" onClick={this.logout}>
          <strong id="navLogout">Logout</strong>
        </Button>
        </Navbar.Text>
      </div>
    )
  }
}
