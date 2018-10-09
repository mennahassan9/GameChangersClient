import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

import { IdeaChallengeService } from '../Services/idea-challenge.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
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
  creator: String;
  created: boolean = false;
  myMail: String;
  emptyName: boolean;
  alertFlag: boolean
  alertMsg: string;
  // challenges: Array<string> = [];
  // challengeName: string;
  // challengeN: string;
  // challengeChosen: boolean;

  teamInvitation: TeamInviteModel;
  constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private auth: AuthService,
    private challengeService: IdeaChallengeService
  ) { }


  addEmployee(email) {
    this.created = false;
    var invitee: InviteeModel = new InviteeModel();
    invitee.email = email.value;
    invitee.email = invitee.email.toLowerCase();
    this.alreadyInCurrentTeam = false;
    if (this.checkEmployee(email.value)) {
      this.alreadyInCurrentTeam = true;
    }
    else {
      if (this.teamEmails.length < 6) {
        this.teamInvitation.members.push(invitee);
        this.teamEmails.push(invitee.email)
      }
      else
        this.maxNumber = true;
    }
  }

  createTeam() {
    this.emptyName = false;
    // if (this.challengeChosen != true) {
    //   this.alertMsg = " Please select a challenge"
    //   this.challengeChosen = false;
    //   return;
    // }
    if (this.teamName) {
      this.teamInvitation.teamName = this.teamName;   
      //this.teamInvitation.creator = this.teamInvitation.members[0].email;
      this.teamService.createTeam(this.teamInvitation).subscribe((res) => {
        this.created = true;
        this.teamInvitation = new TeamInviteModel();
        this.teamNumber = new Array<number>();
        this.teamEmails = new Array<String>();
        this.teamName = "";
        this.fb = new FormBuilder();
        this.form = this.fb.group({
          teamName: new FormControl('', [Validators.compose([Validators.required])])
        });
      }, (err) => {
        this.alertFlag = true;
        this.alertMsg = "An error occured while creating the team"
      })
    } else
      this.emptyName = true;
  }

  checkEmployee(email) {
    if (this.notAdmin() && email == this.myMail)
      return true;
    for (var i = 0; i < this.teamEmails.length; i++) {
      if (this.teamEmails[i] == email)
        return true
    }
    return false;
  }

 

  // enter(name) {
  //   this.challengeName = name;
  //   this.challengeN = name;
  //   this.challengeChosen = true;
  // }

  notAdmin() {
    if (!this.auth.isAdmin())
      return true;
    else
      return false;
  }

  // initChallenges() {
  //   this.challengeService.getChallenges().subscribe(res => {
  //     this.challenges = JSON.parse(res._body)["body"];
  //   }, e => {
  //     this.challenges = [];
  //   })
  // }

  removeFromTeam(index) {
    this.teamEmails.splice(index, 1)
    if (this.notAdmin())
      index++;
    this.teamInvitation.members.splice(index, 1);
  }

  ngOnInit() {
    // this.initChallenges();
    // this.challengeN = "Select your challenge";
    this.teamInvitation = new TeamInviteModel();
    this.teamNumber = new Array<number>();
    this.teamNumber.push(1);
    this.teamEmails = new Array<String>();
    this.emptyName = false;
    this.fb = new FormBuilder();
    this.form = this.fb.group({
      teamName: new FormControl('', [Validators.compose([Validators.required])])
    });
    if (this.notAdmin()) {
      this.myMail = this.localStorageService.get("email");
    }
  }

}
