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
  public alreadyExistingUser: boolean;

  constructor(
    private http: Http, 
    private router: Router, 
    private localStorageService: LocalStorageService
  ) {}

  checkIfInTeam(email: string) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(email);
    return this.http.post(environment.apiUrl + "/users/checkIfInTeam", body, { headers: reqHeaders })
      .toPromise()
      .then((isInTeam) => {
          isInTeam.json().teamMember;
      })
      .catch((err) => {
        console.log( err)
      });
  }

  getAnotherUser(id): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get(environment.apiUrl + `/users/${id}`, { headers: reqHeaders });
  }

  getUserTeamStatus(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get(environment.apiUrl + "/users/team", { headers: reqHeaders });
  }

  register(user:RegistrationModel){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(user);
    return this.http.post(environment.apiUrl + "/users/signup",body, { headers: reqHeaders })
              .toPromise();
  }

  public getAlreadyExistingUser(): boolean {
    console.log("IN GETTER ", this.alreadyExistingUser);
    return this.alreadyExistingUser;
  }

  forgotPassword(email){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.post(environment.apiUrl + "/users/forgot-password", { email }, { headers: reqHeaders });
  }

  resetPassword(token, newPassword, verifyPassword){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.post(environment.apiUrl + "/users/reset-password", { token, newPassword, verifyPassword }, { headers: reqHeaders });
  }

  authenticate(userId: String) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    const userIdObject = {
      "userId": userId
    }
    let body= JSON.stringify(userIdObject);
    return this.http.post(environment.apiUrl + "/users/authenticate",body ,{ headers: reqHeaders })
              .toPromise()
              .then( (success)=> {
                this.router.navigate(['/signin']);
              })
              .catch((err)=> {
                console.log(err);
              });
  }

  getDeadlines(){
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + `/users/deadlines/`, { headers: reqHeaders })
            .toPromise();

  }
}
