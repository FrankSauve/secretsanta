import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

const regexAlphaNum = /^[a-zA-Z0-9]{4,20}$/;

export default class componentName extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       password: '',

       formStatusUsername: null,
       formStatusPassword: null
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
    this.validateOnChange(e.target.name, e.target.value);
  }

  validateOnChange(name, value){
    switch(name){
      case 'username':
        if(value != '' && regexAlphaNum.test(value)){
          this.setState({ formStatusUsername: 'success' });
        }
        else{
          this.setState({ formStatusUsername: 'error' });
        }
        break;
      case 'password':
        console.log(name);
        if(value !='' && regexAlphaNum.test(value)){
          this.setState({ formStatusPassword: 'success' });
        }
        else{
          this.setState({ formStatusPassword: 'error' });
        }
        break;
    }

  }

  login(){

  }

  render() {
    return (
      <div>
        <form>
          <FormGroup validationState={this.state.formStatusUsername}>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="username" type="text" onChange={this.handleChange} />
            <FormControl.Feedback />
            {this.state.formStatusUsername === 'error' ? <HelpBlock>Username must be alphanumeric and between 4-20 characters.</HelpBlock>: null}
          </FormGroup>

          <FormGroup validationState={this.state.formStatusPassword}>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" onChange={this.handleChange} />
            <FormControl.Feedback />
            {this.state.formStatusPassword === 'error' ? <HelpBlock>Password must be alphanumeric and between 4-20 characters.</HelpBlock>: null}
          </FormGroup>

          <br />
          <button id="btnLogin" className="btn" type="submit" onClick={this.login}>Submit</button>
        </form>
      </div>
    )
  }
}
