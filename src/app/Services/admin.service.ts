import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http,RequestOptions,URLSearchParams, ResponseContentType } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import * as mime from 'mime-types'
import "rxjs";
import { Observable } from 'rxjs';


@Injectable()
export class AdminService {
  constructor(
    private http: Http, private localStorageService: LocalStorageService) {}

  getIdeas() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/admin/ideas", { headers: reqHeaders })
    .map(res => res.json());
  }
  inviteCleader(user){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(user);
    return this.http.post( "/admin/inviteCLeader",body, { headers: reqHeaders })
              .toPromise();
  }
  inviteRleader(user){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    let body= JSON.stringify(user);
    return this.http.post( "/admin/inviteRleader",body, { headers: reqHeaders })
              .toPromise();
  }

  getUsers() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/admin/users", { headers: reqHeaders })
    .map(res => res.json());
  }
  getUser(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/admin/user/${email}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  addTeamMember(teamName, email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.put( `/admin/addTeamMember/${teamName}`,{'email':email} ,{ headers: reqHeaders })
    .map(res => res.json());
  }
  deleteTeamMember(teamName, email) {
 
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.put( `/admin/deleteTeamMember/${teamName}`,{'email': email} ,{ headers: reqHeaders })
    .map(res => res.json());

  }
  
  adminSearchUsers(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/admin/createTeam/search/${email}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  getTeamAsMember(email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/admin/viewTeam/${email}`, { headers: reqHeaders });
  }

  getUserIdea(email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/admin/user/viewIdea/${email}`, { headers: reqHeaders });
  }

  getIdea(teamName){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/ideas/admin-ideas/${teamName}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  getTopIdea(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/admin/topideas/`, { headers: reqHeaders })
    .map(res => res.json());
  }
  downloadIdea(filename): any{
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post( "/admin/user/viewIdea/download", {'file': filename}, {headers: reqHeaders, responseType: ResponseContentType.Blob })
    .map(
        (res) => {
            return new Blob([res.blob()], { type: mime.lookup(filename) });
        }
      )
    }

  isJudge(email){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/admin/users/${email}/isJudge`, { headers: reqHeaders })
    .map(res => res.json());
  }


  assignJudge(judgeId, ideaId) {
    console.log(judgeId, ideaId)
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post( "/judge/assign-judge",{judgeId, ideaId}, { headers: reqHeaders })
    .map(res => res.json());
  }

 
  // makeUserAJudge(email) {
  //   const reqHeaders: Headers = new Headers();
  //   reqHeaders.append('Content-Type', 'application/json');
  //   const currentToken = this.localStorageService.get('token');
  //   reqHeaders.append('Authorization', 'Bearer ' + currentToken);
  //   return this.http.get( "/users/makeJudge/"+email,{ headers: reqHeaders })
  //   .map(res => res.json());
  // }

  createNewJudge(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post( "/admin/createNewjudge/",{email},{ headers: reqHeaders })
    .map(res => res.json());
  }
  getStatistics(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/admin/stats/",{ headers: reqHeaders })
    .map(res => res.json());
  }

  getMailSettings(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/admin/mail", { headers: reqHeaders })
    .map(res => res.json());
  }
  getTeams() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/admin/teams/",{ headers: reqHeaders })
    .map(res => res.json());
  }
  putQuestions(questions){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post( "/admin/edit-questions", {questions},{ headers: reqHeaders })
    .map(res => res.json());
  }

  updateMailSettings(mail): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.put( `/admin/mail/`, mail, { headers: reqHeaders });
  }

  getDeadlines(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.get( `/admin/deadlines/`, { headers: reqHeaders });
  }

  updateDeadlines(deadlines): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.put( `/admin/deadlines/`, deadlines, { headers: reqHeaders });
  }
  inviteGleader(user) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body= JSON.stringify(user);
    return this.http.post(  "/admin/inviteGleader",body, { headers: reqHeaders })
              .toPromise();
  }
  sendEmails(mailList, email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.post(  `/admin/email/global`, {emails: mailList, subject: email.subject, emailBody: email.body}, { headers: reqHeaders });
  }
}
