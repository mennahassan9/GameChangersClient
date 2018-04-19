import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import "rxjs";
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {
  constructor(private http: Http, private localStorageService: LocalStorageService) {}

  getIdeas() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get(environment.apiUrl + "/ideas/admin-ideas", { headers: reqHeaders })
    .map(res => res.json());
  }
}
