import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { LoginService } from './../Services/login.service';
import { IdeaService } from './../Services/idea.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TeamService } from './../Services/team.service';


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
  modalRef: ModalDirective;
  teams: any;
  noInvitations: boolean = false;
  successAlert: boolean;
  successMsg: string;
  errorAlert: boolean;
  errorMsg: string;
  alertFlag: boolean

  constructor(
    private teamService: TeamService,
    private loginService: LoginService,
    private ideaService: IdeaService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: Http,
    private headerButtonsService: HeaderButtonsService
  ) { }

  hideAlerts() {
    this.errorAlert = false;
    this.alertFlag = false;
    this.errorMsg = '';
    this.successAlert = false;
    this.successMsg = '';
  }

  redirectToInvitation() {
    this.alertFlag = false;
    this.router.navigate(['./registerTeam']);
  }

  acceptInvitation(teamName) {
    this.hideAlerts();
    this.teamService.respondToInvitations(teamName, true).subscribe((res) => {
      this.teamMember = teamName;
      this.successAlert = true;
      this.successMsg = res.data.message;
    }, (err) => {
      err = err.json();
      this.errorAlert = true;
      this.errorMsg = 'An error has occured. Please try again later!';
    });
  }

  rejectInvitation(teamName) {
    this.hideAlerts()
    this.teamService.respondToInvitations(teamName, false).subscribe((res) => {
      for (let index = 0; index < this.teams.length; index++) {
        const element = this.teams[index];
        if (element.name == teamName)
          this.teams.splice(index, 1)
        if (this.teams.length == 0)
          this.noInvitations = true;
      }
      this.successAlert = true;
      this.successMsg = res.data.message;
    }, (err) => {
      err = err.json();
      this.errorAlert = true;
      this.errorMsg = 'An error has occured. Please try again later!';
    });
  }

  redirectToTeam() { 
    this.alertFlag = false;
    this.router.navigate([`./viewTeam/${this.teamMember}`]);
  }

  redirectToJoinTeam(){
    this.alertFlag = false;
    this.router.navigate([`./teams`]);
  }
  
  redirectToTeamInvitation(teamName) {
    this.alertFlag = false;
    this.router.navigate([`./viewTeam/${teamName}`]);
  }

  redirectToIdea() {
    this.alertFlag = false;
    this.ideaService.getIdea(this.teamMember).subscribe((res) => {
      console.log(res,"RESPONSE")
      this.router.navigate(['./viewIdea']);
    }, (err) => { console.log("REDIRECT",err)
      if ((err.status == 404 || err.status == 400) && this.teamMember == "-1")
       {
         console.log("NO TEAM"),
          this.router.navigate(['./registerTeam']);}
       else if(err.json().status == 404 && this.teamMember !== "-1")
        {
          this.router.navigate(['./registerIdea']);
        }
      else {
        this.alertFlag = true;
        this.errorMsg = err.json().errors[0].message.toString();

      }
    });
  }

  redirectToHome() {
    this.alertFlag = false;
    this.localStorageService.remove('token');
    this.localStorageService.remove('email');
    this.localStorageService.remove('isJudge');
    this.localStorageService.remove('isAdmin');
    this.router.navigate(['./']);
  }

  openEditModal(modal: ModalDirective) {
    this.hideAlerts();
    if (!this.teams && this.noInvitations == false && this.teamMember == "-1") {
      this.teamService.Invitations().subscribe((res) => {
        this.teams = (res.data);
        if (!this.teams || this.teams.length == 0)
          this.noInvitations = true;
      });
    }
    this.modalRef = modal;
    this.modalRef.show();
  }


  ngOnInit() {
    this.hideAlerts();
    this.loginService.getUser().subscribe((res) => {
      this.currentUser = JSON.parse(res["_body"]).data;
      this.teamMember = JSON.parse(res["_body"]).data.teamMember;
      this.userCreatorTeam = JSON.parse(res["_body"]).data.creatorOf;
    });
    this.headerButtonsService.setIsSignedIn();
  }
}