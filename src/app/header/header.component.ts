import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { HeaderButtonsService } from '../Services/headerButtons.service';
import { IdeaService } from '../Services/idea.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean;
  isJudge: boolean;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService,
    private ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.isJudge = this.localStorageService.get("isJudge") == true;
    this.headerButtonsService.isSignedIn.subscribe(updateSignIn => {
      this.isJudge = this.localStorageService.get("isJudge") == true;
      this.isSignedIn = updateSignIn;
    });
    if(this.localStorageService.get('token')){
      this.headerButtonsService.setIsSignedIn();
    }else {
      this.headerButtonsService.signOut();
    }
  }

  navigateToHome(){
    if(this.localStorageService.get('token') && this.isJudge){
      this.router.navigate(['./judge']);
    }else{
      if(this.localStorageService.get('token') && !this.isJudge){
        this.router.navigate(['./profile']);
      }else{
        this.router.navigate(['./']);
      }
    }
  }

  logout(){
    this.localStorageService.remove('token');
    this.localStorageService.remove('isJudge');
    this.localStorageService.remove('isAdmin');
    this.localStorageService.remove('email');
    this.headerButtonsService.signOut();
    this.router.navigate(['./']);
  }
  redirectToTeam(){
    this.router.navigate(['./viewTeam']);
  }
  redirectToIdea(){
    this.ideaService.getIdea().subscribe((res) => {
      if(JSON.parse(res['_body']).idea){
        this.router.navigate(['./viewIdea']);
      } else {
        this.router.navigate(['./registerIdea']);
      }
    }, (err) => {
      this.router.navigate(['./registerIdea']);
    });
  }
  redirectToForgotPassword(){
    this.router.navigate(['./forgot-password']);
  }
}
