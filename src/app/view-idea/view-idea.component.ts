import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { IdeaService } from '../Services/idea.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import * as mime from 'mime-types'

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.css']
})
export class ViewIdeaComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean;
  slides: any;
  slidesName: string;
  title: string;
  filename: string;
  loading: boolean;
  oldFilename: string;
  errorAlert: boolean;
  errorMessage: string;
  successAlert: boolean;
  successMessage: string;
  deadlineReached: boolean;


  constructor(
    private teamService: TeamService,
    private http: Http,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private ideaService: IdeaService
  ) { }

  hideAlerts() {
    this.errorAlert = false;
    this.successAlert = false;
  }

  toggleLoading() {
    this.loading = !this.loading;
    if (this.loading)
      this.form.disable()
    else
      this.form.enable()
  }

  editIdea() {
    this.hideAlerts();
    this.formSubmitted = true;
    if (this.form.valid) {
      if (this.slides) {
        this.toggleLoading()
        this.ideaService.changeIdea(this.slides[0], this.form.get('ideaTitle').value, this.filename).subscribe(
          (res) => {
            this.toggleLoading()
            if (res == '200') {
              this.successAlert = true;
              this.successMessage = 'Thank you for submitting your idea!';
            }
            else {
              this.errorAlert = true;
              this.errorMessage = 'There was an error in submitting your idea, please resubmit.';
            }
          }
        );
      }
      else {
        this.ideaService.changeIdea(null, this.form.get('ideaTitle').value, this.filename).subscribe(
          (res) => {
            if (res == '200') {
              this.successAlert = true;
              this.successMessage = 'Thank you for submitting your idea!';
            }
            else {
              this.errorAlert = true;
              this.errorMessage = 'There was an error in submitting your idea, please resubmit.';
            }
          });
      }
    }
  }

  backToProfile() {
    this.router.navigate(['./profile']);
  }

  onUpload(event) {
    var target = event.target || event.srcElement;
    this.slides = target.files;
    if (this.slides.length > 0) {
      this.slidesName = this.form.controls.ideaTitle.value;
    }
  }

  onDownload() {
    this.toggleLoading()
    this.ideaService.downloadIdea(this.filename).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        var win = window.open(fileURL);
        this.toggleLoading();
      }, (err) => {
        this.toggleLoading();
        this.errorAlert = true;
        this.errorMessage = 'Download Failed! Try again later.';
      }
    );
  }

  ngOnInit() {
    this.loading = false;
    this.hideAlerts();
    this.userService.getDeadlines().then((res) => {
      const submissionDeadline = new Date(JSON.parse(res['_body']).data.submission);
      const now = new Date();
      if (now > submissionDeadline) {
        this.deadlineReached =true;
        this.errorAlert = true;
        this.errorMessage = 'Submission deadline has been reached.'
        this.form.disable();
      }
    })
      .catch((err) => {
        this.errorAlert = true;
        this.errorMessage = 'Something went wrong, please try again later.';
      });
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
    });
    this.ideaService.getIdea().subscribe((res) => {
      let data = res.json().body;
      if (data != null) {
        this.title = data.title;
        this.oldFilename = data.oldFilename;
        this.filename = data.filename;
      } else {
        this.errorAlert = true;
        this.errorMessage = 'No idea was submitted.';
      }
    }, (err) => {
      if (err.json().status == 404) {
        this.router.navigate(['./registerIdea']);
      } else {
        this.errorAlert = true;
        this.errorMessage = 'Something went wrong, please try again later.';
      }
    });
  }
}