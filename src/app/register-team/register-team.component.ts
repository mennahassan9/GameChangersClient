import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';

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
  


  ////////////////////
  public reqHeaders: Headers = new Headers();
  public reqOptions: RequestOptions;
  
  constructor(
    private teamService: TeamService,
    private http: Http, 
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
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
    console.log(this.alreadyInCurrentTeam)
  }

  checkEmployee(email) {
    // console.log()
    for(var i = 0; i< this.teamEmails.length; i++)
    {
      console.log(email)
      if(this.teamEmails[i] == email)
      return true
    }
    return false;

  }
  removeFromTeam(index) {
    this.teamEmails.splice(index, 1)
  }

  createTeam() {
    this.teamName = this.teamName.replace(/\s+/g, '-').toLowerCase();
    console.log(this.teamName)
    this.teamInvitation.teamName = this.teamName;
    this.teamService.createTeam(this.teamInvitation)
  }
}
