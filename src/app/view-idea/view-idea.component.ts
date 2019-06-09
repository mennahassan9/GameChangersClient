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
import { IdeaChallengeService } from '../Services/idea-challenge.service';
import { stringify } from '@angular/core/src/render3/util';

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
  oldFilenames: Array<string> = [];
  errorAlert: boolean;
  errorMessage: string;
  successAlert: boolean;
  successMessage: string;
  deadlineReached: boolean;
  challenges: Array<string> = [];
  selectedChallenge: string;
  description: string;


  constructor(
    private teamService: TeamService,
    private http: Http,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private ideaService: IdeaService,
    private challengeService: IdeaChallengeService,
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
    let returnedChallenge;
    if (this.form.valid) {
      if((this.form.get('challenge').value)["name"] == undefined){
        returnedChallenge = this.selectedChallenge;
      }
      else{
        returnedChallenge = (this.form.get('challenge').value)["name"];
      }
      if (this.slides) {
        this.toggleLoading()
        this.ideaService.changeIdea(this.slides, this.form.get('ideaTitle').value, this.filename,
          returnedChallenge, this.form.get('description').value).subscribe(
                
          (res) => {
            this.toggleLoading()
            if (res == '200') {
              this.successAlert = true;
              this.successMessage = 'Thank you for submitting your idea!';


              this.ideaService.getIdea().subscribe((res) => {
                let data = res.json().body;
                if (data != null) {
                  this.title = data.title;
                  this.oldFilenames = data.oldFilename;
                  this.filename = data.filename;
                  this.selectedChallenge = data.category;
                  this.description = data.description;
                } else {
                  this.errorAlert = true;
                  this.errorMessage = 'No idea was submitted.';
                }
              }, (err) => {
                console.log("ERROOORRR IDEA" , err)
                if (err.json().status == 404) {
                  this.router.navigate(['./registerIdea']);
                } else {
                  this.errorAlert = true;
                  this.errorMessage = 'Something went wrong, please try again later.';
                }
              });





            }
            else {
              this.errorAlert = true;
              this.errorMessage = 'There was an error in submitting your idea, please resubmit.';
            }
          }
        );
        
      }
      else {
        this.ideaService.changeIdea(null, this.form.get('ideaTitle').value, this.filename,
        returnedChallenge, this.form.get('description').value).subscribe(

          (res) => {
            if (res == '200') {
              this.successAlert = true;
              this.successMessage = 'Thank you for submitting your idea!';

              this.ideaService.getIdea().subscribe((res) => {
                let data = res.json().body;
                if (data != null) {
                  this.title = data.title;
                  this.oldFilenames = data.oldFilename;
                  this.filename = data.filename;
                  this.selectedChallenge = data.category;
                  this.description = data.description;
                } else {
                  this.errorAlert = true;
                  this.errorMessage = 'No idea was submitted.';
                }
              }, (err) => {
                console.log("ERROOORRR IDEA" , err)
                if (err.json().status == 404) {
                  this.router.navigate(['./registerIdea']);
                } else {
                  this.errorAlert = true;
                  this.errorMessage = 'Something went wrong, please try again later.';
                }
              });



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
    console.log(event)
    var target = event.target || event.srcElement;
    this.slides = target.files;
    if (this.slides.length > 0) {
      this.slidesName = this.form.controls.ideaTitle.value;
    }
  }

  onDownload() {
    this.toggleLoading()
    this.ideaService.downloadIdea(this.form.get('FileName').value).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        var win = window.open(fileURL);
        this.toggleLoading();
        location.reload()
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
      this.initChallenges();
    })
      .catch((err) => { console.log("DEADLINE",err)
        this.errorAlert = true;
        this.errorMessage = 'Something went wrong, please try again later.';
      });
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
      challenge: new FormControl('', []),
      description: new FormControl('', []),
      FileName: new FormControl('',[])
    });
    this.ideaService.getIdea().subscribe((res) => {
      let data = res.json().body;
      if (data != null) {
        this.title = data.title;
        this.oldFilenames = data.oldFilename.split(',');
        this.filename = data.filename;
        this.selectedChallenge = data.category;
        this.description = data.description;
      } else {
        this.errorAlert = true;
        this.errorMessage = 'No idea was submitted.';
      }
    }, (err) => {
      console.log("ERROOORRR IDEA" , err)
      if (err.json().status == 404) {
        this.router.navigate(['./registerIdea']);
      } else {
        this.errorAlert = true;
        this.errorMessage = 'Something went wrong, please try again later.';
      }
    });
  }

    // setting the challenges for the user to see in the UI
    initChallenges() {
      this.challengeService.getChallenges().subscribe(res => {
        this.challenges = res.json().body;
      }, e => {console.log("chanllenge")
        this.challenges = [];
      })
    }
}