import { Injectable } from '@angular/core';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Router, CanActivate, Route } from '@angular/router';
import { RegistrationModel } from '../registration/Models/RegistrationModel';

import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService {
  public reqHeaders: Headers = new Headers();
  public reqOptions: RequestOptions;

  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) {
    this.reqHeaders.append('Content-Type', 'application/json');


   }
  
  checkIfInTeam(email: string) {
    let currentToken = this.localStorageService.get('token');
        this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
        this.reqOptions = new RequestOptions({ headers:this.reqHeaders,method:"POST"});
        let body= JSON.stringify(email);
        return this.http.post(environment.apiUrl + "/users/checkIfInTeam", body, this.reqOptions)
          .toPromise()
          .then((isInTeam) => {
             isInTeam.json().teamMember;
          })
          .catch((err) => {
            console.log( err)
          })
      }

  register( user:RegistrationModel)
  {
        this.reqHeaders.append('Content-Type','application/json');
        this.reqOptions = new RequestOptions({ headers:this.reqHeaders,method:"POST"});
        let body= JSON.stringify(user);
        return this.http.post(environment.apiUrl + "/users/signup",body ,this.reqOptions)
                 .toPromise()
                 .then( (success)=> {
                   this.router.navigate(['./signin']);
                 })
                 .catch((err)=> {
                   console.log(err);
                 });
  }
  forgotPassword(email){
    this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
    return this.http.post(environment.apiUrl + "/users/forgot-password", { email }, this.reqOptions);
  }
  resetPassword(token, newPassword, verifyPassword){
    this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
    return this.http.post(environment.apiUrl + "/users/reset-password", { token, newPassword, verifyPassword }, this.reqOptions);
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
