import { Injectable } from '@angular/core';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Router, CanActivate, Route } from '@angular/router';
import { RegistrationModel } from '../registration/Models/RegistrationModel';

import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

import "rxjs";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public reqHeaders: Headers = new Headers();
  public currentToken: string;
  public alreadyExistingUser: boolean;

  constructor(
    private http: Http, 
    private router: Router, 
    private localStorageService: LocalStorageService
  ) {
    this.reqHeaders.append('Content-Type', 'application/json');
    let currentToken = this.localStorageService.get('token');
    this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
  }

  checkIfInTeam(email: string) {
    let body= JSON.stringify(email);
    return this.http.post(environment.apiUrl + "/users/checkIfInTeam", body, { headers: this.reqHeaders })
      .toPromise()
      .then((isInTeam) => {
          isInTeam.json().teamMember;
      })
      .catch((err) => {
        console.log( err)
      });
  }

  getAnotherUser(id): Observable<any> {
    return this.http.post(environment.apiUrl + "/users/fetch/user", { id: id }, { headers: this.reqHeaders });
  }

  getUserTeamStatus(): Observable<any> {
    return this.http.get(environment.apiUrl + "/users/team", { headers: this.reqHeaders });
  }

  register(user:RegistrationModel){
    let body= JSON.stringify(user);
    return this.http.post(environment.apiUrl + "/users/signup",body, { headers: this.reqHeaders })
              .toPromise();
  }

  public getAlreadyExistingUser(): boolean {
    console.log("IN GETTER ", this.alreadyExistingUser);
    return this.alreadyExistingUser;
  }

  forgotPassword(email){
    return this.http.post(environment.apiUrl + "/users/forgot-password", { email }, { headers: this.reqHeaders });
  }

  resetPassword(token, newPassword, verifyPassword){
    return this.http.post(environment.apiUrl + "/users/reset-password", { token, newPassword, verifyPassword }, { headers: this.reqHeaders });
  }

  authenticate(userId: String) {
    const userIdObject = {
      "userId": userId
    }
    let body= JSON.stringify(userIdObject);
    return this.http.post(environment.apiUrl + "/users/authenticate",body ,{ headers: this.reqHeaders })
              .toPromise()
              .then( (success)=> {
                this.router.navigate(['/signin']);
              })
              .catch((err)=> {
                console.log(err);
              });
  }
}
