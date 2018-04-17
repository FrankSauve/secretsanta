import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExchangeService {

  constructor(private http: Http) { }

  addExchange(name, users, guests) {
    return this.http.post('/exchange/addexchange', { name, users, guests })
      .map(res => res.json());
  }

}
