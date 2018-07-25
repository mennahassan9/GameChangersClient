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
      this.mailFormSubmitted = false;
      console.log('UPDATED');

    }, e => {
      alert('something went wrong');
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
      this.mailFormSubmitted = false;
      console.log('UPDATED');

    }, e => {
      alert('something went wrong');
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
      const mail = res.mail;
      this.mailForm = new FormGroup({
        emailHost: new FormControl(mail.host, [Validators.required]),
        emailPort: new FormControl(mail.port, [Validators.required]),
        emailUserName: new FormControl(mail.username, [Validators.required]),
        emailPassword: new FormControl(mail.password, [Validators.required]),
      });
    }, e => {
      alert('Something went wrong, please try again later');
    });

    this.adminService.getDeadlines().subscribe(res => {      
      const deadlines = JSON.parse(res._body)["body"];    
      this.deadlinesForm = new FormGroup({
        registrationDeadline: new FormControl(deadlines.registration, [Validators.required]),
        submissionDeadline: new FormControl(deadlines.submission, [Validators.required]),
        judgingDeadline: new FormControl(deadlines.judging, [Validators.required]),
        teamsDeadline: new FormControl(deadlines.teams, [Validators.required]),
      });
    }, e => {
      alert('Something went wrong, please try again later');
    });

    this.min = new Date();



  }

}
