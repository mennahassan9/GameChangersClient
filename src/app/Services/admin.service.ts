import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

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
    return this.http.get(environment.apiUrl + "/ideas/admin-ideas", { headers: reqHeaders })
    .map(res => res.json());
  }

  getIdea(teamName){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/ideas/admin-ideas/${teamName}`, { headers: reqHeaders })
    .map(res => res.json());
  }

  isJudge(email){
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/users/isJudge/${email}`, { headers: reqHeaders })
    .map(res => res.json());
  }


  assignJudge(judgeId, ideaId) {
    console.log(judgeId);
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post(environment.apiUrl + "/judge/assign-judge",{judgeId, ideaId}, { headers: reqHeaders })
    .map(res => res.json());
  }

  makeUserAJudge(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + "/users/makeJudge/"+email,{ headers: reqHeaders })
    .map(res => res.json());
  }

  createNewJudge(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post(environment.apiUrl + "/users/createNewjudge/",{email},{ headers: reqHeaders })
    .map(res => res.json());
  }

}
