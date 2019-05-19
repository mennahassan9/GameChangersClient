import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import * as mime from 'mime-types'

@Injectable()
export class IdeaService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  getIdeas() {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get( "/ideas/allIdeas", { headers: reqHeaders })
    .map(res => res.json());
  }

  getIdea(teamName = null) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    if (teamName) {
      return this.http.get( `/ideas/${teamName}`, { headers: reqHeaders });
    }
    return this.http.get( "/ideas/self", { headers: reqHeaders });
  }


  submitIdea(file, title, challenge, description): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('file', file);
      data.append('title', title);
      if (file == '' || file ==  undefined || file == null) {
        data.append('extension', '');
        data.append('oldFilename', '');
      } else {
        const ext = '.' + mime.extension(mime.lookup(file.name));
        data.append('extension', ext);
        data.append('oldFilename', file.name);
      }
      data.append('challenge', challenge);
      data.append('description', description);
      const xhr = new XMLHttpRequest();
      xhr.open('POST',  '/ideas/new');
      const currentToken = this.localStorageService.get('token');
      xhr.setRequestHeader('Authorization', 'Bearer ' + currentToken);
      xhr.onload = () => {
        observer.next(xhr.status);
        observer.complete();
      };
      xhr.send(data);
    });
  }

  // update idea from view idea view
  changeIdea(file, title, oldName, challenge, description): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('file', file);
      data.append('title', title);
      data.append('challenge', challenge);
      data.append('description', description);
      if (file) {
        data.append('extension', '.' + mime.extension(mime.lookup(file.name)));
        data.append('oldName', oldName);
        data.append('oldFilename', file.name);
      }
      const xhr = new XMLHttpRequest();
      xhr.open('POST',  '/ideas/edit');
      const currentToken = this.localStorageService.get('token');
      xhr.setRequestHeader('Authorization', 'Bearer ' + currentToken);
      xhr.send(data);
      xhr.onload = () => {
        observer.next(xhr.status);
        observer.complete();
      };
    });
  }

  downloadIdea(filename): any {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.post( '/ideas/download', { 'file': filename }, { headers: reqHeaders, responseType: ResponseContentType.Blob })
      .map(
        (res) => {
          return new Blob([res.blob()], { type: mime.lookup(filename) });
        }
      )
  }
}