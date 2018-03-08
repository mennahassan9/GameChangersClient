import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  public reqHeaders: Headers = new Headers();
  public currentToken: string;

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  ) {
    this.reqHeaders.append('Content-Type', 'application/json');
    let currentToken = this.localStorageService.get('token');
    this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
  }

  loginCheck(email, password): Observable<any> {
    return this.http.post(environment.apiUrl + "/users/login", { email, password }, { headers: this.reqHeaders });
  }

  getUser(): Observable<any> {    
    return this.http.get(environment.apiUrl + "/users/user", { headers: this.reqHeaders });
  }

}