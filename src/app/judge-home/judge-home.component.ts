import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { LoginService } from './../Services/login.service';
import { IdeaService } from './../Services/idea.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';
import { JudgingService } from './../Services/judging.service';

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
  ideas: any=[];

  constructor(
    private loginService: LoginService,
    private ideaService: IdeaService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: Http,
    private headerButtonsService: HeaderButtonsService,
    private judgingService:JudgingService
  ) { }

  ngOnInit() {

    this.loginService.getUser().subscribe((res) => {
      this.currentUser = JSON.parse(res["_body"]).data;
      console.log(this.currentUser);
      this.judgingService.getIdeas().subscribe(res=>{
          this.ideas = JSON.parse(res._body);
        
      })
      
    });
    // this.headerButtonsService.signOut();
  }

}
