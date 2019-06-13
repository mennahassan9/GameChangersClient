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
    return this.http.post("/users/checkIfInTeam", body, { headers: reqHeaders })
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

    return this.http.get(`/users/${id}`, { headers: reqHeaders });
  }
  getUsersC(chapter) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(`/users/chapter/${chapter}`, { headers: reqHeaders })
    .map(res => res.json());
  }
  getUsersR(region) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(`/users/region/${region}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  getUserTeamStatus(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get("/users/team", { headers: reqHeaders });
  }

  register(user:RegistrationModel){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(user);
    return this.http.post("/users/signup",body, { headers: reqHeaders })
              .toPromise();
  }
  sendToC(chapter,email){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(email);
    return this.http.post("/users/email/chapter",{chapter, subject: email.subject, emailBody: email.body }, { headers: reqHeaders })
              .toPromise();
  }
  sendToR(region, email){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(email);
    return this.http.post("/users/email/region",{region, subject: email.subject, emailBody: email.body }, { headers: reqHeaders })
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

    return this.http.post("/users/forgot-password", { email }, { headers: reqHeaders });
  }

  resetPassword(token, newPassword, verifyPassword){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.post("/users/reset-password", { token, newPassword, verifyPassword }, { headers: reqHeaders });
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
    return this.http.post("/users/authenticate",body ,{ headers: reqHeaders })
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
    return this.http.get(`/users/deadlines/`, { headers: reqHeaders })
            .toPromise();

  }
  getRegions(){
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.get(`/users/regions/`, { headers: reqHeaders })
            .map(res=> res.json());
  }
  getChapters(){
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.get(`/users/chapters/`, { headers: reqHeaders })
            .map(res=>res.json());
  }

  leaveTeam(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    const email = this.localStorageService.get('email');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body= JSON.stringify(email);

    return this.http.post("/users/leave-team", {body}, {headers: reqHeaders})
    .map(res => {res.json()
      this.localStorageService.set("token", res.json().data.token)});

  }
  sendEmails(mailList, email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.post( `/users/email/global`, {emails: mailList, subject: email.subject, emailBody: email.body}, { headers: reqHeaders });
  }
  getAllUsers() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/users/allusers`, { headers: reqHeaders })
    .map(res => res.json());
  }
  createNewJudge(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post( "/users/createNewjudge/",{email},{ headers: reqHeaders })
    .map(res => res.json());
  }
}
