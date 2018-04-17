import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ValidateService {

  constructor(private http: Http) { }

  validateRegister(user) {
    if (user.name === undefined || user.username === undefined || user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateUsername(username) {
    if (username.length < 6 || username.length > 20) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateExchange(exchangeName, recipients) {
    if (exchangeName === undefined) {
      return ['exchangeNameRequired', '0'];
    }
    for (let i = 0; i < recipients.length; i++) {
      const index = i.toString();
      if (recipients[i].type === 'user') {
        if (recipients[i].username === '') {
          return ['usernameRequired', index];
        } else {
          return ['valid', '0'];
        }
      } else {
        if (recipients[i].name === '') {
          return ['nameRequired', index];
        }
        if (recipients[i].email === '') {
          return ['emailRequired', index];
        }
        if (!this.validateEmail(recipients[i].email)) {
          return ['emailInvalid', index];
        } else {
          return ['valid', '0'];
        }
      }
    }
  }

  validateUser(recipient) {
    return this.http.post('/users/validate', recipient)
      .map(res => res.json());
  }
}
