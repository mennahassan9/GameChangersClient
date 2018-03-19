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
    const data = new FormData();
    data.append('file', file);
    data.append('title', title);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', environment.apiUrl + '/ideas/new');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=--BOUNDARY');
    const currentToken = this.localStorageService.get('token');
    xhr.setRequestHeader('Authorization', 'Bearer ' + currentToken);

    console.log(file);
    console.log(title);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('REDIRECT');
      } else {
        console.log('Failed');
      }
    };
    xhr.send(data);
  }
}
