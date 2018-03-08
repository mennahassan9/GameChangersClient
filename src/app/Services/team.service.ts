import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import "rxjs";
import { Observable } from 'rxjs';

@Injectable()
export class TeamService {
  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) {}

   getTeam(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get(environment.apiUrl + "/teams/view/member", { headers: reqHeaders });
  }

  getTeamAsMember(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get(environment.apiUrl + "/teams/view/team", { headers: reqHeaders });
  }

  createTeam(teamName: String, teamEmails: Array<String> )
  {
        const reqHeaders: Headers = new Headers();
        reqHeaders.append('Content-Type', 'application/json');
        const currentToken = this.localStorageService.get('token');
        reqHeaders.append('Authorization', 'Bearer ' + currentToken);
        let body= {
          'teamName': teamName,
          'members': teamEmails
        }
        return this.http.post(environment.apiUrl + "/teams/new", body, { headers: reqHeaders })
          .toPromise()
          .then((res) => {
             console.log(res)
          })
          .catch((err) => {
            console.log( err)
          })
  }
}
