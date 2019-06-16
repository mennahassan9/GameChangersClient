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
<<<<<<< HEAD
    return this.http.get( environment.apiUrl +  "/ideas/challenges", { headers: reqHeaders });
=======
    return this.http.get("/ideas/challenges", { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
  }

  addChallenge(name): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
<<<<<<< HEAD
    return this.http.post( environment.apiUrl + "/admin/challenges", { name }, { headers: reqHeaders });
=======
    return this.http.post("/admin/challenges", { name }, { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
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
    return this.http.put(`/admin/challenges/${oldName}`, { name }, { headers: reqHeaders });
  }
}
