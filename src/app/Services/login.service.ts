import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import "rxjs";

@Injectable()
export class LoginService {

  public reqHeaders: Headers = new Headers();
  public reqOptions: RequestOptions;

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  ) {
    this.reqHeaders.append('Content-Type', 'application/json');
  }

  loginCheck(email, password): Observable<any> {
      // need to be abstracted in an env file
      this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
      return this.http.post("http://localhost:4040/users/login", { email, password }, this.reqOptions);
  }

  getUser(): Observable<any> {
    let currentToken = this.localStorageService.get('token');
    this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
    return this.http.get("http://localhost:4040/users/user", this.reqOptions);
  }

}