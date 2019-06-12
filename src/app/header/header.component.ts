import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { HeaderButtonsService } from '../Services/headerButtons.service';
import { IdeaService } from '../Services/idea.service';
import { LoginService } from './../Services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean;
  isJudge: boolean;
  isAdmin: boolean;
  isLeader: boolean;
  teamName: any;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService,
    private ideaService: IdeaService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {


    this.loginService.getUser().subscribe((res) => {
      this.teamName = res.json().data.teamMember;})

    this.isJudge = this.localStorageService.get("isJudge") == true;
    this.isAdmin = this.localStorageService.get("isAdmin") == true;
    this.headerButtonsService.isSignedIn.subscribe(updateSignIn => {
      this.isJudge = this.localStorageService.get("isJudge") == true;
      this.isSignedIn = updateSignIn;
    });
    if (this.localStorageService.get('token')) {
      this.headerButtonsService.setIsSignedIn();
    } else {
      this.headerButtonsService.signOut();
    }

    if(this.localStorageService.get("isCLeader")||this.localStorageService.get("isRLeader")||this.localStorageService.get("isGLeader")){
      this.isLeader=true;
    }
  }

  navigateToHome() {
    if (this.localStorageService.get('token') && this.isJudge) {
      this.router.navigate(['./judge']);
    } else {
      if (this.localStorageService.get('token') && this.isAdmin) {
        this.router.navigate(['./admin/dashboard']);
      } else {
        if (this.localStorageService.get('token') && !this.isAdmin && !this.isJudge) {
          this.router.navigate(['./profile']);
        }
        else {
          this.router.navigate(['./']);
        }
      }
    }
  }

  logout() {
    this.localStorageService.remove('token');
    this.localStorageService.remove('isJudge');
    this.localStorageService.remove('isAdmin');
    this.localStorageService.remove('email');
    this.localStorageService.remove('teamName');
    this.localStorageService.remove("isCLeader");
    this.localStorageService.remove("isRLeader");
    this.localStorageService.remove("isGLeader");
    this.headerButtonsService.signOut();
    this.headerButtonsService.signOutAdmin();
    this.headerButtonsService.signOutLeader();
    this.router.navigate(['./']);
  }
  redirectToTeam() {
    this.loginService.getUser().subscribe((res) => {
       this.teamName = res.json().data.teamMember;
      if (this.teamName == "-1"&& !this.isLeader){
        this.redirectToJoinTeam()
      }
      else {
        this.router.navigate([`./viewTeam/${this.teamName}`]);
      }
    }, (err) => {
      console.log(err.json());
    });
  }
  redirectToJoinTeam(){
    if(this.teamName == "-1"&& this.isLeader){
      this.router.navigate(['admin/teams'])
    }else{
    this.router.navigate([`./teams`]);}
  }
  redirectToIdea() {
    this.loginService.getUser().subscribe((res) => {
      let teamName = res.json().data.teamMember;
      if (teamName == "-1"){
        alert('You need to join a team first, or create your own team');
        this.redirectToJoinTeam()
      }
      else {
        this.ideaService.getIdea(this.localStorageService.get('teamName')).subscribe((res) => {
          this.router.navigate(['./viewIdea']);
        }, (err) => {
          if (err.json().status == 404) {
            this.router.navigate(['./registerIdea']);
          }
        });
      }
    }, (err) => {
      console.log(err.json());
    });
  }
  redirectToForgotPassword() {
    this.router.navigate(['./forgot-password']);
  }
  redirectToViewIdeas(){
    this.router.navigate([`./ideas`]);
  }
}
