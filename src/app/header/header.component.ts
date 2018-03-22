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
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService,
    private ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.headerButtonsService.isSignedIn.subscribe(updateSignIn => {
      this.isSignedIn = updateSignIn;
    });
  }

  navigateToHome(){
    if(this.localStorageService.get('token')){
      this.router.navigate(['./profile']);
    }
  }

  logout(){
    this.localStorageService.remove('token');
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
}
