import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { HeaderButtonsService } from '../../Services/headerButtons.service';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { AdminService } from '../../Services/admin.service';

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
  Cleader: boolean;
  Rleader: boolean;
  doneAlert: boolean;

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private loginService: LoginService,
    private headerButtonsService: HeaderButtonsService, private adminService: AdminService) { }

  ngOnInit() {
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
      this.adminService.createNewJudge(this.form.value.email).subscribe(res => {
        let judgeId = res.data;
      })
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
