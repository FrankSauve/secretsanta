import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import axios from 'axios';
import AlertContainer from 'react-alert';
import { Redirect } from 'react-router-dom';
import auth from '../../util/auth';

const regexAlphaNum = /^[a-zA-Z0-9]{4,20}$/;
const regexAlpha = /^[a-zA-Z\-]{1,40}$/;
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Options for react-alert
const alertOptions = {
  position: 'bottom center'
}

export default class RegisterForm extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    
      formStatusName: null,
      formStatusEmail: null,
      formStatusUsername: null,
      formStatusPassword: null,
      formStatusConfirmPassword: null,

      redirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateOnChange = this.validateOnChange.bind(this);
    this.validateOnSubmit = this.validateOnSubmit.bind(this);
    this.register = this.register.bind(this);
  }
  
  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
    this.validateOnChange(e.target.name, e.target.value);
  }

  validateOnChange(name, value){
    switch(name){
      case 'name':
        if(value != '' && regexAlpha.test(value)){
          this.setState({ formStatusName: 'success' });
        }
        else{
          this.setState({ formStatusName: 'error' });
        }
        break;
      case 'email':
        if(value != '' && regexEmail.test(value)){
          this.setState({ formStatusEmail: 'success' });
        }
        else{
          this.setState({ formStatusEmail: 'error' });
        }
        break;
      case 'username':
        if(value != '' && regexAlphaNum.test(value)){
          this.setState({ formStatusUsername: 'success' });
        }
        else{
          this.setState({ formStatusUsername: 'error' });
        }
        break;
      case 'password':
        if(value != '' && regexAlphaNum.test(value)){
          this.setState({ formStatusPassword: 'success' });
        }
        else{
          this.setState({ formStatusPassword: 'error' });
        }
        break;
      case 'confirmPassword':
        if(value === this.state.password){
          this.setState({ formStatusConfirmPassword: 'success' });
        }
        else{
          this.setState({ formStatusConfirmPassword: 'error' })
        }
        break;
    }
  }

  comparePasswords(){
    if(this.state.password === this.state.confirmPassword){
      this.setState({ formStatusConfirmPassword: 'success' });
    }
    else{
      this.setState({ formStatusConfirmPassword: 'error' });
    }
  }

  validateOnSubmit(){
    return this.state.formStatusName === 'success' && this.state.formStatusEmail === 'success'
     && this.state.formStatusUsername === 'success' && this.state.formStatusPassword === 'success'
     && this.state.formStatusConfirmPassword === 'success';
  }

  register(e){
    e.preventDefault();
    if(this.validateOnSubmit()){
      axios.post('/api/users/register', {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if(res.data.success){
          console.log(res.data);
          const token = res.data.token;
          const name = res.data.user.name;
          const email = res.data.user.email;
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('name', name);
          localStorage.setItem('email', email);
          auth.setAuthToken(token);
          this.setState({ redirect: true });
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
      return <Redirect push to="/" />
    }
    return (
      <div>
        <form>
          <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

          <FormGroup validationState={this.state.formStatusName}>
            <ControlLabel>Name</ControlLabel>
            <FormControl name='name' type="text" onChange={this.handleChange}/>
            <FormControl.Feedback />
            {this.state.formStatusName === 'error' ? <HelpBlock>Name must be letters only and less than 40 characters.</HelpBlock>: null}
          </FormGroup>

          <FormGroup validationState={this.state.formStatusEmail}>
            <ControlLabel>Email</ControlLabel>
            <FormControl name='email' type="text" onChange={this.handleChange}/>
            <FormControl.Feedback />
            {this.state.formStatusEmail === 'error' ? <HelpBlock>Email is not valid.</HelpBlock>: null}
          </FormGroup>

          <FormGroup validationState={this.state.formStatusUsername}>
            <ControlLabel>Username</ControlLabel>
            <FormControl name='username' type="text" onChange={this.handleChange}/>
            <FormControl.Feedback />
            {this.state.formStatusUsername === 'error' ? <HelpBlock>Username must be alphanumeric and between 4-20 characters.</HelpBlock>: null}
          </FormGroup>

          <FormGroup validationState={this.state.formStatusPassword}>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" onChange={this.handleChange} />
            <FormControl.Feedback />
            {this.state.formStatusPassword === 'error' ? <HelpBlock>Password must be alphanumeric and between 4-20 characters.</HelpBlock>: null}
          </FormGroup>

          <FormGroup validationState={this.state.formStatusConfirmPassword}>
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl name="confirmPassword" type="password" onChange={this.handleChange} />
            <FormControl.Feedback />
            {this.state.formStatusConfirmPassword === 'error' ? <HelpBlock>Passwords do not match.</HelpBlock>: null}
          </FormGroup>

          <br />
          <button id="btnLogin" className="btn" type="submit" onClick={this.register}>Submit</button>
        </form>
      </div>
    )
  }
}
