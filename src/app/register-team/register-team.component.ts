import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';

import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { environment } from "../../environments/environment";
import { InviteeModel } from './Models/inviteeModel';
import { TeamInviteModel } from './Models/teamInviteModel';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
  styleUrls: ['./register-team.component.css']
})
export class RegisterTeamComponent implements OnInit {
  teamEmails: Array<String>;
  maxNumber: boolean = false;
  alreadyInCurrentTeam: boolean = false;
  form: FormGroup;
  fb: FormBuilder;
  teamNumber: Array<number>;
  teamName: String;
  teamInvitation: TeamInviteModel;
  
  constructor(
    private teamService: TeamService,
    private http: Http, 
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.teamInvitation = new TeamInviteModel();
    this.teamNumber = new Array<number>();
    this.teamNumber.push(1);
    this.teamEmails = new Array<String>();
    this.fb = new FormBuilder();
    this.form = this.fb.group({
      teamName: new FormControl('', [Validators.compose([Validators.required])])
    });
  }
  
  addEmployee(email) {
    var invitee: InviteeModel = new InviteeModel();
    invitee.email = email.value;
    invitee.email = invitee.email.toLowerCase();
    this.alreadyInCurrentTeam = false;  
    if(this.checkEmployee(email.value)){
      this.alreadyInCurrentTeam = true;
    }
    else{
      if(this.teamEmails.length < 6){
        this.teamInvitation.members.push(invitee);
        this.teamEmails.push(email.value)
      }
      else
      this.maxNumber = true;
    }
  }

  checkEmployee(email) {
    for(var i = 0; i< this.teamEmails.length; i++)
    {
      if(this.teamEmails[i] == email)
      return true
    }
    return false;

  }
  removeFromTeam(index) {
    this.teamEmails.splice(index, 1)
  }

  createTeam() {
    const reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    let currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    let body= {
      'teamName': this.teamName,
      'members': this.teamEmails
    }
    return this.http.post(environment.apiUrl + "/teams/new", body, { headers: reqHeaders })
      .toPromise()
      .then((res) => {
        if (JSON.parse(res["_body"])["status"] === "400") {
          console.log("already exisiting team")
        }
        else {
          this.router.navigate(['./create-team-status']);
        }
        console.log(res)
      })
      .catch((err) => {
        console.log( err)
      })
  }
}
