import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { IdeaChallengeService } from '../Services/idea-challenge.service';
import { UserService } from '../Services/user.service';
import { IdeaService } from './../Services/idea.service';
import * as mime from 'mime-types'

@Component({
  selector: 'app-register-idea',
  templateUrl: './register-idea.component.html',
  styleUrls: ['./register-idea.component.css']
})
export class RegisterIdeaComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean;
  slides: any;
  slidesName: string;
  emptyUpload: boolean;
  challenges: Array<string> = [];
  selectedChallenge: string;
  ideaTitle: string;
  loading: boolean;
  deadlineReached: boolean = false;
  submissionErr: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private challengeService: IdeaChallengeService,
    private userService: UserService,
  ) { }

  toggleLoading() {
    this.loading = !this.loading;
    if (this.loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  submitIdea() {
    this.hideAlerts();
    this.formSubmitted = true;
    // checking whether a file is uploaded or not
    if (this.slides === undefined || this.slides.length === 0) {
      this.emptyUpload = true;
    } else {
      this.emptyUpload = false;
    }
    if (this.form.valid && !this.emptyUpload) {
      this.ideaTitle = this.form.get('ideaTitle').value;
      // this.selectedChallenge = (this.form.get('challenge').value)["name"];
      this.toggleLoading();
      this.ideaService.submitIdea(this.slides[0], this.ideaTitle).subscribe((res) => {
        this.toggleLoading();
        this.router.navigate(['./viewIdea']);
      }, (err) => {
        this.toggleLoading();
        this.submissionErr = true;
        this.errorMessage = 'An error as occured while submitting your idea. Please try again.';
      }
      );
    }
  }

  // saving the file uploaded by the user
  onUpload(event) {
    var target = event.target || event.srcElement;
    this.slides = target.files;
    if (this.slides.length > 0) {
      this.slidesName = this.form.controls.ideaTitle.value;
    }
  }

  // setting the challenges for the user to see in the UI
  initChallenges() {
    this.challengeService.getChallenges().subscribe(res => {
      this.challenges = res.json().body;
    }, e => {
      this.challenges = [];
    })
  }

  ngOnInit() {
    this.userService.getDeadlines().then((res) => {
      const submissionDeadline = new Date(JSON.parse(res['_body']).data.submission);
      const now = new Date();
      if (now > submissionDeadline) {
        this.deadlineReached = true;
        this.errorMessage = 'Sorry , deadline has been reached.';
        this.form.disable();
      } else {
        this.deadlineReached = false;
        // this.initChallenges();
      }
    })
      .catch((err) => {
        alert('Something went wrong, please try again later');
      });
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
      // challenge: new FormControl('', [Validators.required])
    });
  }

  hideAlerts() {
    this.submissionErr = false;
  }
}
