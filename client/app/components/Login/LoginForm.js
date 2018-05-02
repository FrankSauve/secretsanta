import React, { Component } from 'react';
import { render } from 'react-dom'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import axios from 'axios';
import AlertContainer from 'react-alert';
import { Redirect } from 'react-router-dom';

import auth from '../../util/auth';

const regexAlphaNum = /^[a-zA-Z0-9]{4,20}$/;

//Options for react-alert
const alertOptions={
  position: 'bottom center'
}

export default class componentName extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       password: '',

       formStatusUsername: null,
       formStatusPassword: null,

       redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
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
        if(value !='' && regexAlphaNum.test(value)){
          this.setState({ formStatusPassword: 'success' });
        }
        else{
          this.setState({ formStatusPassword: 'error' });
        }
        break;
    }

  }

  validateOnSubmit(){
    return this.state.formStatusUsername === 'success' && this.state.formStatusPassword === 'success';
  }

  login(e){
    e.preventDefault();
    if(this.validateOnSubmit()){
      axios.post('/api/users/authenticate', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if(res.data.success){
          console.log(res.data.user)
          const token = res.data.token;
          const name = res.data.user.name;
          const email = res.data.user.email;
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('name', name);
          localStorage.setItem('email', email);
          auth.setAuthToken(token);
          this.setState({ redirect: true })
        }
        else{
          this.msg.show(res.data.msg, {type: 'error'});
        }
      });
    }
    else{
      this.msg.show('Invalid Fields', {type: 'error'});
    }
  }

  render() {
    if(this.state.redirect){
      return(
      <Redirect push to="/" />
      );
    }
    return (
      <div>
        <form>
          <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
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
