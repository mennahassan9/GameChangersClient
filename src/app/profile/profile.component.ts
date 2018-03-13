import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { LoginService } from './../Services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';

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
    userCreatorTeam: string;
    teamMember: string;

    constructor(
      private loginService: LoginService,
      private router: Router,
      private localStorageService: LocalStorageService,
      private http: Http
    ) {}

    redirectToTeam() {
      this.loginService.getUser().subscribe((res) => {
        console.log("RESA --> ", JSON.parse(res["_body"]));
        this.currentUser = JSON.parse(res["_body"]);
        this.teamMember = JSON.parse(res["_body"])["teamMember"];
        this.userCreatorTeam = JSON.parse(res["_body"])["creatorOf"];
        console.log("TEAM MEMBER --> ", this.teamMember);
        console.log("TEAM CREATOR --> ", this.userCreatorTeam);
        if (this.teamMember === "-1" && this.userCreatorTeam === "-1") {
          this.router.navigate(['./registerTeam']);
        }
        else if (this.teamMember !== "-1" && this.userCreatorTeam == "-1") {
          this.router.navigate(['./viewTeam']);
        }
        else if (this.userCreatorTeam != "-1") {
          this.router.navigate(['./editTeam']);
        }
      });
      
    }

    redirectToHome() {
      this.localStorageService.remove('token');
      this.router.navigate(['./']);
    }

    ngOnInit() {
      this.loginService.getUser().subscribe((res) => {
        console.log("RESA --> ", JSON.parse(res["_body"]));
        this.currentUser = JSON.parse(res["_body"]);
        this.teamMember = JSON.parse(res["_body"])["teamMember"];
        this.userCreatorTeam = JSON.parse(res["_body"])["creatorOf"];
        console.log("TEAM MEMBER --> ", this.teamMember);
        console.log("TEAM CREATOR --> ", this.userCreatorTeam);
      });
    }
}