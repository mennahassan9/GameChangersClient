import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  
  constructor(
    private http: Http,
    private localStorageService: LocalStorageService) {
  }

  loginCheck(email, password) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.post(environment.apiUrl + "/users/login", { email, password }, { headers: reqHeaders })
    .toPromise()
    .then((res) => 
    {
      this.localStorageService.set("token", JSON.parse(res["_body"])["token"]);
      this.localStorageService.set("isJudge", JSON.parse(res["_body"])["isJudge"]);
      this.localStorageService.set("email", email);
    })
    ;
  }

  getUser(): Observable<any> {    
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get(environment.apiUrl + "/users/user", { headers: reqHeaders });
  }

}