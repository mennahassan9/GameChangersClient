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

  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private challengeService: IdeaChallengeService,
    private userService: UserService,
  ) {}

  toggleLoading() {
    this.loading = !this.loading;
    if (this.loading) {
      this.form.disable();
    } else {
       this.form.enable();
    }
  }

  submitIdea() {
    this.formSubmitted = true;
    // checking whether a file is uploaded or not
    if (this.slides === undefined || this.slides.length === 0) {
      this.emptyUpload = true;
    } else {
      this.emptyUpload = false;
    }

    // TODO: redirecting to profile or a view that only confirms the submission
    if (this.form.valid && !this.emptyUpload) {
      this.ideaTitle = this.form.get('ideaTitle').value;
      this.toggleLoading();
      this.ideaService.submitIdea(this.slides[0], this.ideaTitle, (this.form.get('challenge').value)["name"]).subscribe(
        (res) => {
          this.toggleLoading();
          console.log(res);
          if (res == '200') {
            alert('Thank you for submitting your idea!');
            this.router.navigate(['./profile']);
          } else {
            alert('There was an error in submitting your idea, please resubmit.');
          }
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

  // saving the selecting option by the user
  onSelectChallenge(value) {
    this.selectedChallenge = value;
  }

  // setting the challenges for the user to see in the UI
  // initChallenges() {
  //   this.challengeService.getChallenges().subscribe(res=>{
  //     this.challenges = JSON.parse(res._body)["body"];
  //     }, e => {
  //       this.challenges = [];
  //   })
    // this.challenges.push("Customer Advocacy/Ways to improve Ease of Doing Business (EoDB)");
    // this.challenges.push("Innovative ways of using Blockchain for customer support");
    // this.challenges.push("How do we make our #CultureCode really come to life?");
    // this.challenges.push("Open Ended – Innovative ways of using Dell products");
 // }

  ngOnInit() {
   // this.initChallenges();
    this.userService.getDeadlines().then((res) => {
      const submissionDeadline = new Date(JSON.parse(res['_body']).body.submission);
      const now = new Date();
      if(now > submissionDeadline){
        this.deadlineReached = true;
        this.form.disable();
      }else{
        this.deadlineReached = false;
      }
    })
    .catch((err)=>{
      alert('Something went wrong, please try again later');
    });
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
      challenge: new FormControl('', [Validators.required])
    });
  }

}
