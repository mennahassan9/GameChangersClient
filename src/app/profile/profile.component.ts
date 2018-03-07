import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { LoginService } from './../Services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';

import "rxjs";
import { Observable } from 'rxjs';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: any = {};
    public reqHeaders: Headers = new Headers();
    public reqOptions: RequestOptions;
    logout: boolean;
    userCreatorTeam: String;
    teamMember: boolean;

    constructor(
      private loginService: LoginService,
      private router: Router,
      private localStorageService: LocalStorageService,
      private http: Http
    ) {
      this.reqHeaders.append('Content-Type', 'application/json');
    }

    redirectToTeam() {
      if (!this.teamMember && this.userCreatorTeam == "-1") {
        this.router.navigate(['./registerTeam']);
      }
      else if (this.teamMember && this.userCreatorTeam == "-1") {
        this.router.navigate(['./viewTeam']);
      }
      else if (this.userCreatorTeam != "-1") {
        this.router.navigate(['./editTeam']);
      }
    }

    redirectToHome() {
      this.localStorageService.remove('token');
      this.router.navigate(['./']);
    }

    ngOnInit() {
      this.currentUser = {};
      let currentToken = this.localStorageService.get('token');
      console.log("CURRENT TOKEN --> ", currentToken);
      this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
      this.reqOptions = new RequestOptions({ headers: this.reqHeaders });
      console.log("REQ OPTIONS --> ", this.reqOptions);
      this.http.get(environment.apiUrl + "/users/user", this.reqOptions).subscribe((res) => {
        console.log(res);
        this.currentUser = JSON.parse(res["_body"]);
      }, (err) => {
        console.log("HERREEREREREREEEEEEE");
        console.log("ERROR --> ", err);
      });
      this.loginService.getUser().subscribe((res) => {
        this.teamMember = JSON.parse(res["_body"])["teamMember"];
        this.userCreatorTeam = JSON.parse(res["_body"])["creatorOf"];
      });
      // this.loginService.getUser().subscribe((res) => {
      //   console.log(res);
      //   this.currentUser = JSON.parse(res["_body"]);
      // }, (err) => {
      //   console.log("ERR --> ", err);
      // });
    }
}