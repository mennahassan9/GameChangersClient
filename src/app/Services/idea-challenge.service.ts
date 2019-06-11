import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class IdeaChallengeService {

  constructor(
    private http: Http,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  getChallenges(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.get( environment.apiUrl + "/ideas/challenges", { headers: reqHeaders });
  }

  addChallenge(name): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.post( environment.apiUrl + "/admin/challenges", { name }, { headers: reqHeaders });
  }

  deleteChallenge(name): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.delete( `/admin/challenges/${name}`, { headers: reqHeaders });
  }

  updateChallenge(oldName, name): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.put( environment.apiUrl + `/admin/challenges/${oldName}`, { name }, { headers: reqHeaders });
  }
}
