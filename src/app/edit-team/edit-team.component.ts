import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
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
  success: boolean;
  errorMsg: string;
  successMsg: string;
  creator: string;

  constructor(
    private teamService: TeamService,
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

  addTeamMember(email) {
    this.hideAlerts();
    this.teamService.addTeamMember(email.value).subscribe((res) => {
      this.emailSent = true;
      this.team = res.data.team;
    }, (err) => {
      err = err.json();
      this.emailSent = false;
      this.error = true;
      this.errorMsg = err.errors[0].message;
    });
  }

  removeTeamMember(email) {
    this.hideAlerts();
    this.teamService.deleteTeamMember(email).subscribe((res) => {
      this.team = res.data.team;
      this.success = true;
      this.successMsg = `${email} has been removed!`;
    }, (err) => {
      err = err.json();
      this.error = true;
      this.errorMsg = err.errors[0].message;
    });
  }

  hideAlerts() {
    this.emailSent = false;
    this.error = false;
    this.errorMsg = '';
    this.success = false;
    this.successMsg = '';
  }

  ngOnInit() {
    this.hideAlerts();
    this.teamService.getCreatedTeam().subscribe((res) => {
      this.team = res.data.team;
      this.creator = res.data.team.creator;
    }, (err) => {
      err = err.json();
      this.error = true;
      this.errorMsg = err.status == 404 ? err.errors[0]['message'] : 'Something went wrong please try again!';
    });
  }
}
