import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service'

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  mailForm: FormGroup;
  deadlinesForm: FormGroup;
  min: Date;
  mailFormSubmitted: boolean;
  alertFlag: boolean;
  alertMsg: string;
  alertFlag1: boolean;
  alertMsg1: string;
  deadlineFormSubmitted: boolean;

  constructor(
    private adminService: AdminService
  ) { }

  submitMailChanges() {
    this.mailFormSubmitted = true;
    const mail = {
      host: this.mailForm.get('emailHost').value,
      port: this.mailForm.get('emailPort').value,
      username: this.mailForm.get('emailUserName').value,
      password: this.mailForm.get('emailPassword').value,
    }
    this.adminService.updateMailSettings(mail).subscribe(res => {
      this.alertFlag=false;
      this.mailFormSubmitted = false;
      

    }, e => {
      this.alertFlag=true;
      this.alertMsg="something went wrog while trying to update mail settings"
    });

  }

  submitDeadlineChanges() {
    this.deadlineFormSubmitted = true;
    const deadlines = {
      registration: this.deadlinesForm.get('registrationDeadline').value,
      submission: this.deadlinesForm.get('submissionDeadline').value,
      judging: this.deadlinesForm.get('judgingDeadline').value,
      teams: this.deadlinesForm.get('teamsDeadline').value,
    }
    this.adminService.updateDeadlines(deadlines).subscribe(res => {
      this.alertFlag1=false;
      this.mailFormSubmitted = false;
    

    }, e => {
      this.alertFlag1=true;
      this.alertMsg1="something went wrog while trying to update the deadlines"
    });
  }
  ngOnInit() {
    this.mailForm = new FormGroup({
      emailHost: new FormControl('', [Validators.required]),
      emailPort: new FormControl('', [Validators.required]),
      emailUserName: new FormControl('', [Validators.required]),
      emailPassword: new FormControl('', [Validators.required]),
    });

    this.deadlinesForm = new FormGroup({
      registrationDeadline: new FormControl('', [Validators.required]),
      submissionDeadline: new FormControl('', [Validators.required]),
      judgingDeadline: new FormControl('', [Validators.required]),
      teamsDeadline: new FormControl('', [Validators.required]),
    });

    this.adminService.getMailSettings().subscribe(res => {
      const mail = res.data

      this.alertFlag =false;
      
      this.mailForm = new FormGroup({
        emailHost: new FormControl(mail.host, [Validators.required]),
        emailPort: new FormControl(mail.port, [Validators.required]),
        emailUserName: new FormControl(mail.username, [Validators.required]),
        emailPassword: new FormControl(mail.password, [Validators.required]),
      });
    }, e => {
      this.alertFlag=true;
      this.alertMsg="something went wrong while trying to retrieve mail settings"
    });

    this.adminService.getDeadlines().subscribe(res => {      
      const deadlines = JSON.parse(res._body)["data"];
      this.deadlinesForm = new FormGroup({
        registrationDeadline: new FormControl(deadlines.registration, [Validators.required]),
        submissionDeadline: new FormControl(deadlines.submission, [Validators.required]),
        judgingDeadline: new FormControl(deadlines.judging, [Validators.required]),
        teamsDeadline: new FormControl(deadlines.teams, [Validators.required]),
      });
    }, e => {
      
      this.alertFlag1=true;
      this.alertMsg1="something went wrog while trying to retrieve deadlines"
    });

    this.min = new Date();



  }

}
