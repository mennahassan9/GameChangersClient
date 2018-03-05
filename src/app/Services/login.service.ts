import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import "rxjs";

@Injectable()
export class LoginService {

  public reqHeaders: Headers = new Headers();
  public reqOptions: RequestOptions;

  constructor(private http: Http) {
    this.reqHeaders.append('Content-Type', 'application/json');
    this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
  }

  loginCheck(email, password): Observable<any> {
      // need to be abstracted in an env file
      return this.http.post("http://localhost:4040/users/login", { email, password }, this.reqOptions);
  }

}