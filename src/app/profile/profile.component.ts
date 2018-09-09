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
    alertFlag:boolean
    alertMsg: string;
    acceptFlag:boolean
    acceptMsg: string;

    constructor(
      private teamService: TeamService,
      private loginService: LoginService,
      private ideaService: IdeaService,
      private router: Router,
      private localStorageService: LocalStorageService,
      private http: Http,
      private headerButtonsService: HeaderButtonsService
    ) {}


    redirectToInvitation() {
      this.router.navigate(['./registerTeam']);
    }

    acceptInvitation(teamName){
      this.teamService.acceptInvitation(teamName).subscribe((res) => {
        this.acceptFlag=false;
        if(res['status'] == 200){
          this.teamMember = teamName;
        }
      }, e=>{
        this.acceptFlag=true;
        this.acceptMsg="An Error occured while accepting invitation"
  
      });
    }

    rejectInvitation(teamName){
      this.teamService.rejectInvitation(teamName).subscribe((res) => {
        this.acceptFlag=false;
        if(res['status'] == 200){
          for (let index = 0; index <  this.teams.length; index++) {
            const element =  this.teams[index];
            if(element.name == teamName)
            this.teams.splice(index,1)
            if(this.teams.length == 0)
              this.noInvitations = true;
          }
        }
      }, e=>{
        this.acceptFlag=true;
        this.acceptMsg="An Error occured while rejecting invitation"
  
      });
    }

    redirectToTeam() {
       this.router.navigate([`./viewTeam/${this.teamMember}`]);
    }

    redirectToTeamInvitation(teamName) {
      this.router.navigate([`./viewTeam/${teamName}`]);
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
      this.localStorageService.remove('email');
      this.localStorageService.remove('isJudge');
      this.localStorageService.remove('isAdmin');
      this.router.navigate(['./']);
    }

    openEditModal(modal: ModalDirective) {
      if(!this.teams && this.noInvitations == false && this.teamMember == "-1" ){
        this.teamService.Invitations().subscribe((res) => {
          this.teams = (res["teams"]);
          if(!this.teams || this.teams.length == 0)
          this.noInvitations = true;
        });
      }
      this.modalRef = modal;
      this.modalRef.show();
    }


    ngOnInit() {
      this.loginService.getUser().subscribe((res) => {
        this.alertFlag=false;
        this.currentUser = JSON.parse(res["_body"]).data;
        this.teamMember = JSON.parse(res["_body"]).data.teamMember;
        this.userCreatorTeam = JSON.parse(res["_body"]).data.creatorOf;
        console.log(this.teamMember)
      }, e=>{
        this.alertFlag=true;
        this.alertMsg="An Error occured while connecting to server"
  
      });
      this.headerButtonsService.setIsSignedIn();
    }
}