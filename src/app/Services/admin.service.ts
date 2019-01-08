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
    return this.http.get(environment.apiUrl + "/admin/ideas", { headers: reqHeaders })
    .map(res => res.json());
  }

  getUsers() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + "/admin/users", { headers: reqHeaders })
    .map(res => res.json());
  }
  getUser(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/admin/user/${email}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  addTeamMember(teamName, email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.put(environment.apiUrl + `/admin/addTeamMember/${teamName}`,{'email':email} ,{ headers: reqHeaders })
    .map(res => res.json());
  }
  deleteTeamMember(teamName, email) {
 
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.put(environment.apiUrl + `/admin/deleteTeamMember/${teamName}`,{'email': email} ,{ headers: reqHeaders })
    .map(res => res.json());

  }
  
  adminSearchUsers(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/admin/createTeam/search/${email}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  getTeamAsMember(email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/admin/viewTeam/${email}`, { headers: reqHeaders });
  }

  getUserIdea(email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/admin/user/viewIdea/${email}`, { headers: reqHeaders });
  }

  getIdea(teamName){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/ideas/admin-ideas/${teamName}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  getTopIdea(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/admin/topideas/`, { headers: reqHeaders })
    .map(res => res.json());
  }
  downloadIdea(filename): any{
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post(environment.apiUrl + "/admin/user/viewIdea/download", {'file': filename}, {headers: reqHeaders, responseType: ResponseContentType.Blob })
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
    return this.http.get(environment.apiUrl + `/admin/users/${email}/isJudge`, { headers: reqHeaders })
    .map(res => res.json());
  }


  assignJudge(judgeId, ideaId) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post(environment.apiUrl + "/judge/assign-judge",{judgeId, ideaId}, { headers: reqHeaders })
    .map(res => res.json());
  }

 
  // makeUserAJudge(email) {
  //   const reqHeaders: Headers = new Headers();
  //   reqHeaders.append('Content-Type', 'application/json');
  //   const currentToken = this.localStorageService.get('token');
  //   reqHeaders.append('Authorization', 'Bearer ' + currentToken);
  //   return this.http.get(environment.apiUrl + "/users/makeJudge/"+email,{ headers: reqHeaders })
  //   .map(res => res.json());
  // }

  createNewJudge(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post(environment.apiUrl + "/admin/createNewjudge/",{email},{ headers: reqHeaders })
    .map(res => res.json());
  }
  getStatistics(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + "/admin/stats/",{ headers: reqHeaders })
    .map(res => res.json());
  }

  getMailSettings(){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + "/admin/mail", { headers: reqHeaders })
    .map(res => res.json());
  }
  getTeams() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + "/admin/teams/",{ headers: reqHeaders })
    .map(res => res.json());
  }
  putQuestions(questions){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post(environment.apiUrl + "/admin/edit-questions", {questions},{ headers: reqHeaders })
    .map(res => res.json());
  }

  updateMailSettings(mail): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + `/admin/mail/`, mail, { headers: reqHeaders });
  }

  getDeadlines(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + `/admin/deadlines/`, { headers: reqHeaders });
  }

  updateDeadlines(deadlines): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + `/admin/deadlines/`, deadlines, { headers: reqHeaders });
  }

}
