import { Injectable } from '@angular/core';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Router, CanActivate, Route } from '@angular/router';
import { RegistrationModel } from '../registration/Models/RegistrationModel';

@Injectable()
export class UserService {

  constructor(private http: Http, private router: Router) { }
  register( user:RegistrationModel)
  {
    let headers = new Headers();
        headers.append('Content-Type','application/json');
        let options = new RequestOptions({ headers: headers,method:"POST"});
        let body= JSON.stringify(user);
        return this.http.post("http://localhost:3000/users/signup",body ,options)
                 .toPromise()
                 .then( (success)=> {
                  //  this.router.navigate(['']);
                 })
                 .catch((err)=> {
                   console.log(err);
                 });
  }
}
