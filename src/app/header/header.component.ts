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
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService,
    private ideaService: IdeaService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
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
    this.headerButtonsService.signOut();
    this.headerButtonsService.signOutAdmin();
    this.router.navigate(['./']);
  }
  redirectToTeam() {
    this.loginService.getUser().subscribe((res) => {
      let teamName = res.json().data.teamMember;
      this.router.navigate([`./viewTeam/${teamName}`]);
    }, (err) => {
      console.log(err.json());
    });
  }
  redirectToIdea() {
    this.ideaService.getIdea().subscribe((res) => {
      this.router.navigate(['./viewIdea']);
    }, (err) => {
      if (err.json().status == 404) {
        this.router.navigate(['./registerIdea']);
      }
    });
  }
  redirectToForgotPassword() {
    this.router.navigate(['./forgot-password']);
  }
}
