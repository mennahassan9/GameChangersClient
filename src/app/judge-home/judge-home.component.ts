import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { LoginService } from './../Services/login.service';
import { IdeaService } from './../Services/idea.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';

import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';
@Component({
  selector: 'judge-home',
  templateUrl: './judge-home.component.html',
  styleUrls: ['./judge-home.component.css']
})
export class JudgeHomeComponent implements OnInit {

  currentUser: any = {};
  public reqHeaders: Headers = new Headers();
  public reqOptions: RequestOptions;
  logout: boolean;
  userCreatorTeam: string;
  teamMember: string;
  ideas: any={};

  constructor(
    private loginService: LoginService,
    private ideaService: IdeaService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: Http,
    private headerButtonsService: HeaderButtonsService
  ) { }

  ngOnInit() {
    this.ideas = {
      ideas: [
        {
          "teamName": "team#1",
          "score": "20",
        },
        {
          "teamName": "team#2",
          "score": "-1"
        }
      ]
    }
    this.loginService.getUser().subscribe((res) => {
      this.currentUser = JSON.parse(res["_body"]);
      console.log(this.currentUser);
      
    });
    this.headerButtonsService.setIsSignedIn();
  }

}
