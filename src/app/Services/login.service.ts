import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  public reqHeaders: Headers = new Headers();
  public reqOptions: RequestOptions;

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  ) {
    this.reqHeaders.append('Content-Type', 'application/json');
    let currentToken = this.localStorageService.get('token');
    this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
  }

  loginCheck(email, password): Observable<any> {
      // need to be abstracted in an env file
      this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
      return this.http.post(environment.apiUrl + "/users/login", { email, password }, this.reqOptions);
  }

  getUser(): Observable<any> {
    this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
    return this.http.get(environment.apiUrl + "/users/user", this.reqOptions);
  }

}