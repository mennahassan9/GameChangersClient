import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HeaderButtonsService } from './Services/headerButtons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAdmin: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService
  ) { }

  ngOnInit(){
    this.headerButtonsService.isAdmin.subscribe(updateSignIn => {
      this.isAdmin = updateSignIn;
    });
  }
  ngOnChanges(){
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true: false; 
  }
  ngAfterContentInit(){
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true: false; 
  }
  ngAfterViewInit(){
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true: false; 
    
  }
  ngOnDestroy(){
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true: false; 
    
  }
}
