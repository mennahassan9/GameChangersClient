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
  selector: 'app-create-team-status',
  templateUrl: './create-team-status.component.html',
  styleUrls: ['./create-team-status.component.css']
})
export class CreateTeamStatusComponent implements OnInit {
  
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

  returnProfile() {
      this.router.navigate(['./profile']);
  }

  ngOnInit() {
    
  }
}
