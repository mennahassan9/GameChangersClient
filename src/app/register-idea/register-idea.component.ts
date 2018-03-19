import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { IdeaService } from './../Services/idea.service';

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

  constructor(
    private router: Router,
    private ideaService: IdeaService
  ) {}

  submitIdea() {
    this.formSubmitted = true;

    // checking whether a file is uploaded or not
    if (this.slides === undefined || this.slides.length == 0) {
      this.emptyUpload = true;
    }
    else {
      this.emptyUpload = false;
    }

    // TODO: redirecting to profile or a view that only confirms the submission
    if (this.form.valid && !this.emptyUpload) {
      this.ideaTitle = this.form.get('ideaTitle').value;
      this.ideaService.submitIdea(this.slides[0], this.ideaTitle, this.selectedChallenge);
    }
  }

  // saving the file uploaded by the user
  onUpload(event) {
    this.slides = event.srcElement.files;
    if (this.slides.length > 0) {
      this.slidesName = this.form.controls.ideaTitle.value;
    }
  }

  // saving the selecting option by the user
  onSelectChallenge(value) {
    this.selectedChallenge = value;
  }

  // setting the challenges for the user to see in the UI
  initChallenges() {
    this.challenges.push("Chief Customer Office – Customer Advocacy");
    this.challenges.push("Automation of Service");
    this.challenges.push("Culture Code");
    this.challenges.push("Open Ended");
  }

  ngOnInit() {
    this.initChallenges();
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
      challenge: new FormControl('', [Validators.required])
    });
  }

}
