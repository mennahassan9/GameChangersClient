import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class IdeaService {

  
  constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  ) {}

  submitIdea(file, title) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    // change the url accordingly
    return this.http.post(environment.apiUrl + "/users/login", { file, title }, { headers: reqHeaders })
    .toPromise()
    .then((res) => {
    })
    ;
  }
}