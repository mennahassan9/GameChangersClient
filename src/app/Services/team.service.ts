import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import "rxjs";
import { Observable } from 'rxjs';
import { TeamInviteModel } from '../register-team/Models/teamInviteModel';

@Injectable()
export class TeamService {
  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) {}

   getTeamMember(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get(environment.apiUrl + "/teams/view/member", { headers: reqHeaders });
  }

  getTeam(teamName): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.get(environment.apiUrl + `/teams/view/team/${teamName}`, { headers: reqHeaders });
  }

  createTeam(teamInvitation : TeamInviteModel )
  {
        const reqHeaders: Headers = new Headers();
        reqHeaders.append('Content-Type', 'application/json');
        const currentToken = this.localStorageService.get('token');
        reqHeaders.append('Authorization', 'Bearer ' + currentToken);
        let body = {
          'teamName': teamInvitation.teamName,
          'members': teamInvitation.members
        }
        return this.http.post(environment.apiUrl + "/teams/new", body, { headers: reqHeaders })
          .map(res => res.json());
  }


  SearchUsers(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/teams/search/${email}`, { headers: reqHeaders })
    .map(res => res.json());
  }


  Invitations() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + `/teams/view/invitations`, { headers: reqHeaders })
    .map(res => res.json());
  }

  acceptInvitation(teamName) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body = {
      'teamName': teamName
    }
    return this.http.post(environment.apiUrl + "/teams/accept/invitations", body, { headers: reqHeaders })
    .map(res => res.json());
  }

  rejectInvitation(teamName) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body = {
      'teamName': teamName
    }
    return this.http.post(environment.apiUrl + "/teams/reject/invitations", body, { headers: reqHeaders })
    .map(res => res.json());
  }

}
