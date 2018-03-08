import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import "rxjs";
import { Observable } from 'rxjs';

@Injectable()
export class TeamService {
  public reqHeaders: Headers = new Headers();
  public currentToken: string;

  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) {
    this.reqHeaders.append('Content-Type', 'application/json');
    let currentToken = this.localStorageService.get('token');
    this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
   }

   getTeam(): Observable<any> {
    return this.http.get(environment.apiUrl + "/teams/view/member", { headers: this.reqHeaders });
  }

  createTeam(teamName: String, teamEmails: Array<String> )
  {
        let body= {
          'teamName': teamName,
          'members': teamEmails
        }
        return this.http.post(environment.apiUrl + "/teams/new", body, { headers: this.reqHeaders })
          .toPromise()
          .then((res) => {
             console.log(res)
          })
          .catch((err) => {
            console.log( err)
          })
  }
}
