import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class DomainService {

  constructor(
    private http: Http,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  getDomains(): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
<<<<<<< HEAD
    return this.http.get( environment.apiUrl + "/admin/domains", { headers: reqHeaders });
=======
    return this.http.get("/admin/domains", { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
  }

  addDomain(name): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
<<<<<<< HEAD
    return this.http.post( environment.apiUrl + "/admin/domains", { name }, { headers: reqHeaders });
=======
    return this.http.post("/admin/domains", { name }, { headers: reqHeaders });
>>>>>>> 6c3d4440ad7cc1d0267ed612a8719068202a45eb
  }

  deleteDomain(name): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.delete(`/admin/domains/${name}`, { headers: reqHeaders });
  }

  updateDomain(oldName, name): Observable<any> {
    const reqHeaders: Headers = new Headers();
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    reqHeaders.append('Content-Type', 'application/json');
    return this.http.put(`/admin/domains/${oldName}`, { name }, { headers: reqHeaders });
  }
}
