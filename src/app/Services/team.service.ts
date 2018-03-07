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
  public reqOptions: RequestOptions;

  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) {
    this.reqHeaders.append('Content-Type', 'application/json');
   }

  createTeam(teamName: String, teamEmails: Array<String> )
  {
    let currentToken = this.localStorageService.get('token');
        this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
        this.reqOptions = new RequestOptions({headers: this.reqHeaders, method: "POST"})
        let body= {
          'teamName': teamName,
          'members': teamEmails
        }
        return this.http.post(environment.apiUrl + "/teams/new", body, this.reqOptions)
          .toPromise()
          .then((res) => {
             console.log(res)
          })
          .catch((err) => {
            console.log( err)
          })
  }
}
