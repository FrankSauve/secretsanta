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
  recipients: recipient[] = [];
  users: user[] = [];
  guests: guest[] = [];

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

  validateForm(){
   
    var err = this.validateService.validateExchange(this.exchangeName, this.recipients)[0];
    var index = this.validateService.validateExchange(this.exchangeName, this.recipients)[1];
      if(err == 'exchangeNameRequired'){
        this.flashMessage.show('Please enter an exchange name', {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if(err == 'usernameRequired'){
        this.flashMessage.show('Please enter a username for recipient ' + (parseInt(index) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if(err == 'nameRequired'){
        this.flashMessage.show('Please enter a name for recipient ' + (parseInt(index) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if(err == 'emailRequired'){
        this.flashMessage.show('Please enter an email for recipient' + (parseInt(index) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      if(err == 'emailInvalid'){
        this.flashMessage.show('Please enter a valid email for recipient ' + (parseInt(index) + 1), {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
  }



  onExchangeSubmit(){
    console.log('Before validation');
    this.validateForm();
    console.log("After validation");

    for(var i = 0; i < this.recipients.length; i++){
      if(this.recipients[i].type == 'user'){
        this.users.push(this.recipients[i]);
      }
      else{
        this.guests.push(this.recipients[i]);
      }
    }
    
    console.log("Before adding exchange");
    

  }

  addRecipient(){
    this.recipients.push({
      type: '',
      username: '',
      name: '',
      email: '',
      _id: ''
    });
  }

  isUser(i){
    if(this.recipients[i].type == 'user'){
      return true;
    }
    else{
      return false;
    }
  }
}

interface recipient{
  type: String;
  username: String;
  name: String;
  email: String;
  _id: String;
}

interface user{
  username: String;
  name: String;
  email: String;
  _id: String;
}

interface guest{
  name: String;
  email: String;
  _id: String;
}