import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { HeaderButtonsService } from '../../Services/headerButtons.service';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-invite-leader',
  templateUrl: './invite-leader.component.html',
  styleUrls: ['./invite-leader.component.css']
})
export class InviteLeaderComponent implements OnInit {
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
  Gleader: boolean;
  doneAlert: boolean;

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private loginService: LoginService,
    private headerButtonsService: HeaderButtonsService, private adminService: AdminService) { }

  ngOnInit() {
    this.doneAlert = false
    this.chapters = new Array<any>()
    this.chapter = new Array<any>()
    this.ages = new Array<String>();

    this.regions = new Array<String>();

    this.userSvc.getRegions().subscribe((res) => {
      console.log("REGIONS", res)
      res.data.forEach(element => {
        this.regions.push(element.name)

      });
      console.log(this.regions)
    })
    this.userSvc.getChapters().subscribe((res) => {
      console.log("CHAPTERS", res)
      this.chapter = res.data
      console.log(this.chapters)
    })


    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      region: new FormControl(''),
      chapter: new FormControl(''),

    });
  }
  register() {
    this.submit = true;

    if (this.form.valid) {
      // this.resortIdeas();
      console.log(this.form.value, "VALUE")
      if (this.Cleader == true) {
        this.adminService.inviteCleader(this.form.value)
      }
      if (this.Rleader == true) {
        this.adminService.inviteRleader(this.form.value)
      }
      if (this.Gleader == true) {
        this.adminService.inviteGleader(this.form.value)
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

  getChapters() {
    this.chapters = []
    console.log(this.form.get('region').value)
    this.chapter.forEach(chapter => {
      if (chapter.region.name == this.form.get('region').value) { this.chapters.push(chapter.name) }
    })

  }
}
