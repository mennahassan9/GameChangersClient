import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import "rxjs";
import { Observable } from 'rxjs';
import { TeamInviteModel } from '../register-team/Models/teamInviteModel';

@Injectable()
export class TeamService {
  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) { }

  getCreatedTeam(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/teams/self", { headers: reqHeaders })
      .map(res => res.json());
  }

  getTeam(teamName): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/teams/${teamName}`, { headers: reqHeaders })
      .map(res => res.json());
  }

  createTeam(teamInvitation: TeamInviteModel) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body = {
      teamName: teamInvitation.teamName,
      members: teamInvitation.members,
      lookingFor: teamInvitation.lookingFor,
      allowOthers: teamInvitation.allowOthers
    }
    return this.http.post( "/teams", body, { headers: reqHeaders })
    .map(res => {
      console.log(res.json())
      this.localStorageService.set("teamName", body.teamName)
      this.localStorageService.set("token", res.json().data.token)
    })
  //   .then((res) => 
  //   {
  //     // console.log(res._body.data.token)
      
  // })
}

  SearchUsers(email) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/teams/search/${email}`, { headers: reqHeaders })
      .map(res => res.json());
  }

  Invitations() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( `/teams/invitations`, { headers: reqHeaders })
      .map(res => res.json());
  }

  respondToInvitations(teamName, accepted) {
    {
      const reqHeaders: Headers = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      const currentToken = this.localStorageService.get('token');
      reqHeaders.append('Authorization', 'Bearer ' + currentToken);
      return this.http.put( `/teams//invitations/${teamName}`, { accepted }, { headers: reqHeaders })
        .map(res => res.json());
    }
  }

  addTeamMember(email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body = {
      email
    }
    return this.http.post( "/teams/self/members", body, { headers: reqHeaders })
      .map(res => res.json());
  }

  deleteTeamMember(email): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.delete( `/teams/self/members/${email}`, { headers: reqHeaders })
      .map(res => res.json());
  }

  getTeams() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/teams/allTeams",{ headers: reqHeaders })
    .map(res => res.json());
  }
  
  joinTeam(teamName) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body = {
      teamName
    }
    return this.http.post( "/teams/join", body, { headers: reqHeaders })
      .map(res => res.json());
  }

  editTeam(teamName, allowOthers, lookingFor){
    const reqHeaders:Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body = {
      teamName: teamName,
      allowOthers: allowOthers,
      lookingFor: lookingFor
    }
    return this.http.post( "/teams/self/edit", body, { headers: reqHeaders })
      .map(res => res.json());
  }
}
