import React, { Component } from 'react';
import gravatar from 'gravatar-api';
import { Image } from 'react-bootstrap';

export default class Gravatar extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      options: {
        email: ''
      }
    }

    this.getGravatar = this.getGravatar.bind(this);
  }

  componentWillMount(){
    let email = localStorage.getItem('email');
    this.setState({ options:{email: email}});
    console.log(this.state.options.email);
  }

  getGravatar(){
    return gravatar.imageUrl(this.state.options);
  }
  
  render() {
    return (
        <Image id="gravatar" src={this.getGravatar()} circle />
    )
  }
}
