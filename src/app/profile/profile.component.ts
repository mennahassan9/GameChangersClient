import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { LoginService } from './../Services/login.service';
import { IdeaService } from './../Services/idea.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';

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
      private ideaService: IdeaService,
      private router: Router,
      private localStorageService: LocalStorageService,
      private http: Http,
      private headerButtonsService: HeaderButtonsService
    ) {}

    redirectToTeam() {
          this.router.navigate(['./viewTeam']);
    }

    redirectToIdea() {
      this.ideaService.getIdea().subscribe((res) => {
        if(JSON.parse(res['_body']).idea){
          this.router.navigate(['./viewIdea']);
        }else{
          this.router.navigate(['./registerIdea']);
        }
      }, (err) => {
        this.router.navigate(['./registerIdea']);
      });
    }

    redirectToHome() {
      this.localStorageService.remove('token');
      this.router.navigate(['./']);
    }

    ngOnInit() {
      this.loginService.getUser().subscribe((res) => {
        this.currentUser = JSON.parse(res["_body"]);
        this.teamMember = JSON.parse(res["_body"])["teamMember"];
        this.userCreatorTeam = JSON.parse(res["_body"])["creatorOf"];
      });
      this.headerButtonsService.setIsSignedIn();
    }
}