import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ExchangeService } from '../../services/exchange.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  exchangeName: String;
  recipients: Recipient[] = [];
  users: User[] = [];
  guests: Guest[] = [];

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private exchangeService: ExchangeService,
    private router: Router
  ) {
    this.recipients.push({
      type: '',
      username: '',
      name: '',
      email: '',
      _id: ''
    });
  }

  ngOnInit() {
  }

  validateForm() {
    const err = this.validateService.validateExchange(this.exchangeName, this.recipients)[0];
    const index = this.validateService.validateExchange(this.exchangeName, this.recipients)[1];
      if (err === 'exchangeNameRequired') {
        this.flashMessage.show('Please enter an exchange name', {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if (err === 'usernameRequired') {
        this.flashMessage.show('Please enter a username for recipient ' + (parseInt(index, 10) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if (err === 'nameRequired') {
        this.flashMessage.show('Please enter a name for recipient ' + (parseInt(index, 10) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if (err === 'emailRequired') {
        this.flashMessage.show('Please enter an email for recipient' + (parseInt(index, 10) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if (err === 'emailInvalid') {
        this.flashMessage.show('Please enter a valid email for recipient ' + (parseInt(index, 10) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
  }



  onExchangeSubmit() {
    console.log('Before validation');
    this.validateForm();
    console.log('After validation');

    for (let i = 0; i < this.recipients.length; i++) {
      if (this.recipients[i].type === 'user') {
        this.users.push(this.recipients[i]);
      } else {
        this.guests.push(this.recipients[i]);
      }
    }
    console.log('Before adding exchange');
  }

  addRecipient() {
    this.recipients.push({
      type: '',
      username: '',
      name: '',
      email: '',
      _id: ''
    });
  }

  isUser(i) {
    if (this.recipients[i].type === 'user') {
      return true;
    } else {
      return false;
    }
  }
}

interface Recipient {
  type: String;
  username: String;
  name: String;
  email: String;
  _id: String;
}

interface User {
  username: String;
  name: String;
  email: String;
  _id: String;
}

interface Guest {
  name: String;
  email: String;
  _id: String;
}
