import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { HeaderButtonsService } from '../../Services/headerButtons.service';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { AdminService } from '../../Services/admin.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-invite-judge',
  templateUrl: './invite-judge.component.html',
  styleUrls: ['./invite-judge.component.css']
})

export class InviteJudgeComponent implements OnInit {
  match: boolean;
  form: FormGroup;
  chapters: Array<any>;
  chapter: Array<any>;
  ages: Array<String>;
  regions: Array<String>;
  submit: boolean;
  errorAlert: boolean;
  errorMessage: String;
  isLeader: boolean;
  doneAlert: boolean;

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private loginService: LoginService,
    private headerButtonsService: HeaderButtonsService, private adminService: AdminService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.isLeader = this.localStorageService.get("isCLeader")||this.localStorageService.get("isRLeader")||this.localStorageService.get("isGLeader")
    this.isLeader = this.localStorageService.get("isCLeader")||this.localStorageService.get("isRLeader")||this.localStorageService.get("isGLeader")
    if (this.localStorageService.get("isGLeader")) {
      this.headerButtonsService.setIsSignedInGLeader();
    }
    if (this.localStorageService.get("isCLeader")) {
      this.headerButtonsService.setIsSignedInCLeader();
    }
    if (this.localStorageService.get("isRLeader")) {
      this.headerButtonsService.setIsSignedInRLeader();
    }
    this.doneAlert = false
    this.chapters = new Array<any>()
    this.chapter = new Array<any>()
    this.ages = new Array<String>();

    this.regions = new Array<String>();

    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
    });
  }
  
  register() {
    this.submit = true;
    console.log(this.form.valid)
    if (this.form.valid) {
      // this.resortIdeas();
      if (this.isLeader) {
        this.userSvc.createNewJudge(this.form.value.email).subscribe(res => {
          let judgeId = res.data;
        })
      }
      else {
        this.adminService.createNewJudge(this.form.value.email).subscribe(res => {
          let judgeId = res.data;
        })
      }
      this.doneAlert = true;
      this.form.reset()
      this.submit = false
    }
  }

  showAlert(message) {
    this.errorAlert = true;
    this.errorMessage = message;
  }
}
