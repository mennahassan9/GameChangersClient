import { Injectable } from '@angular/core';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Router, CanActivate, Route } from '@angular/router';
import { RegistrationModel } from '../registration/Models/RegistrationModel';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http, private router: Router) { }
  register( user:RegistrationModel)
  {
    let headers = new Headers();
        headers.append('Content-Type','application/json');
        let options = new RequestOptions({ headers: headers,method:"POST"});
        let body= JSON.stringify(user);
        return this.http.post(environment.apiUrl + "/users/signup",body ,options)
                 .toPromise()
                 .then( (success)=> {
                   this.router.navigate(['./signin']);
                 })
                 .catch((err)=> {
                   console.log(err);
                 });
  }
  authenticate(userId: String)
  {
    let headers = new Headers();
        headers.append('Content-Type','application/json');
        let options = new RequestOptions({ headers: headers,method:"POST"});
        const userIdObject = {
          "userId": userId
        }
        let body= JSON.stringify(userIdObject);
        return this.http.post(environment.apiUrl + "/users/authenticate",body ,options)
                 .toPromise()
                 .then( (success)=> {
                   this.router.navigate(['/signin']);
                 })
                 .catch((err)=> {
                   console.log(err);
                 });
  }
}
