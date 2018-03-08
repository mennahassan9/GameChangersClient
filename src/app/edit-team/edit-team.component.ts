import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  
  team: any = {};
  public reqHeaders: Headers = new Headers();
  emailAdded: string;
  emailSent: boolean;
  error: boolean;
  errorMsg: string;

  constructor(
    private teamService : TeamService,
    private http: Http, 
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private location: Location
  ) {
    let currentToken = this.localStorageService.get('token');
    this.reqHeaders.append('Content-Type', 'application/json');
    this.reqHeaders.append('Authorization', 'Bearer ' + currentToken);
  }

  addTeamMember() {
    
    this.http.post(environment.apiUrl + "/teams/add/member", { email: this.emailAdded }, { headers: this.reqHeaders }).subscribe((res) => {
      console.log("RESSSSSS", res);
      this.emailSent = true;
      this.error = false;
      this.team = JSON.parse(res["_body"]).team;
    }, (err) => {
      this.emailSent = false;
      this.error = true;
      this.errorMsg = JSON.parse(err["_body"])["errors"][0]["messages"][0];
      if (this.errorMsg.indexOf("dell|emc|") !== -1) {
        this.errorMsg = "Make sure the email domain is a valid one";
      }
    });
  }

  removeTeamMember(email) {
    this.http.post(environment.apiUrl + "/teams/delete/member", { email: email }, { headers: this.reqHeaders }).subscribe((res) => {
      console.log("RESSSSSS", res);
      this.emailSent = false;
      this.team = JSON.parse(res["_body"]).team;
      this.error = false;
    }, (err) => {
      this.error = true;
      this.emailSent = false;
      this.errorMsg = JSON.parse(err["_body"])["errors"][0]["messages"][0];
      console.log("ERROR --> ", this.errorMsg);
    });
  }

  ngOnInit() {
    this.teamService.getTeam().subscribe((res) => {
      console.log("HEY --> ", res)
      if (JSON.parse(res["_body"])["team"] != null) {
        this.team = JSON.parse(res["_body"])["team"];
        console.log("team --> ", JSON.parse(res["_body"])["team"]);        
      } 
      else {
        console.log("NULL TEAM");
      }
    }, (err) => {
      console.log("ERR", err);
    })
  }
}
