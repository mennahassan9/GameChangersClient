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
  isCleader: boolean = false;
  isRleader: boolean = false;
  isLeader: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService
  ) { }

  ngOnInit() {
    this.headerButtonsService.isAdmin.subscribe(updateSignIn => {
      this.isAdmin = updateSignIn;
    });
    this.headerButtonsService.isCleader.subscribe(updateCL => {
      this.isCleader = updateCL;
      console.log("CHAPTER", this.isCleader)
      if (this.isCleader || this.isRleader) {
        this.isLeader = true
      }else{
        this.isLeader= false;
      }
      console.log("LEADER", this.isLeader)
    })
    this.headerButtonsService.isRleader.subscribe(updateRL => {
      this.isCleader = updateRL
      console.log("REGION", this.isRleader)
      if (this.isCleader || this.isRleader) {
        this.isLeader = true
      }else{
        this.isLeader= false;
      }
      console.log("LEADER", this.isLeader)
    })


  }
  ngOnChanges() {
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true : false;
    this.isCleader = this.localStorageService.get("isCLeader")== true? true : false;
    this.isRleader = this.localStorageService.get("isRLeader")== true? true : false;

  }
  ngAfterContentInit() {
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true : false;
    this.isCleader = this.localStorageService.get("isCLeader")== true? true : false;
    this.isRleader = this.localStorageService.get("isRLeader")== true? true : false;
  }
  ngAfterViewInit() {
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true : false;
    this.isCleader = this.localStorageService.get("isCLeader")== true? true : false;
    this.isRleader = this.localStorageService.get("isRLeader")== true? true : false;

  }
  ngOnDestroy() {
    this.isAdmin = this.localStorageService.get("isAdmin") == true ? true : false;
    this.isCleader = this.localStorageService.get("isCLeader")== true? true : false;
    this.isRleader = this.localStorageService.get("isRLeader")== true? true : false;

  }
}
