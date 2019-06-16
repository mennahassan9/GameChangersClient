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

<<<<<<< HEAD
    return this.http.get(environment.apiUrl + `/users/${id}`, { headers: reqHeaders });
=======
    return this.http.get(`/users/${id}`, { headers: reqHeaders });
  }
  getCurrentUser(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get( `/users/user`, { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
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

<<<<<<< HEAD
    return this.http.get(environment.apiUrl + "/users/team", { headers: reqHeaders });
=======
    return this.http.get("/users/team", { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
  }

  register(user:RegistrationModel){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(user);
<<<<<<< HEAD
    return this.http.post( environment.apiUrl + "/users/signup",body, { headers: reqHeaders })
=======
    return this.http.post("/users/signup",body, { headers: reqHeaders })
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
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

<<<<<<< HEAD
    return this.http.post(environment.apiUrl + "/users/forgot-password", { email }, { headers: reqHeaders });
=======
    return this.http.post("/users/forgot-password", { email }, { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
  }

  resetPassword(token, newPassword, verifyPassword){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

<<<<<<< HEAD
    return this.http.post(environment.apiUrl + "/users/reset-password", { token, newPassword, verifyPassword }, { headers: reqHeaders });
=======
    return this.http.post("/users/reset-password", { token, newPassword, verifyPassword }, { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
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
<<<<<<< HEAD
    return this.http.post(environment.apiUrl + "/users/authenticate",body ,{ headers: reqHeaders })
=======
    return this.http.post("/users/authenticate",body ,{ headers: reqHeaders })
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
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
<<<<<<< HEAD
    return this.http.get(environment.apiUrl + `/users/deadlines/`, { headers: reqHeaders })
=======
    return this.http.get(`/users/deadlines/`, { headers: reqHeaders })
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
            .toPromise();

  }
  getRegions(){
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
<<<<<<< HEAD
    return this.http.get(environment.apiUrl + `/users/regions/`, { headers: reqHeaders })
=======
    return this.http.get(`/users/regions/`, { headers: reqHeaders })
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
            .map(res=> res.json());
  }
  getChapters(){
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
<<<<<<< HEAD
    return this.http.get(environment.apiUrl + `/users/chapters/`, { headers: reqHeaders })
=======
    return this.http.get(`/users/chapters/`, { headers: reqHeaders })
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
            .map(res=>res.json());
  }

  leaveTeam(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    const email = this.localStorageService.get('email');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body= JSON.stringify(email);

<<<<<<< HEAD
    return this.http.post(environment.apiUrl + "/users/leave-team", {body}, {headers: reqHeaders})
=======
    return this.http.post("/users/leave-team", {body}, {headers: reqHeaders})
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
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
