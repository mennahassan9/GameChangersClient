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
      this.ideaService.submitIdea(this.slides[0], this.slidesName);
    }
  }

  onUpload(event) {
    console.log("UPLOAD SRC --> ", event.srcElement);
    console.log("UPLOAD SRC FILES --> ", event.srcElement.files);
    this.slides = event.srcElement.files;
    if (this.slides.length > 0) {
      this.slidesName = this.form.controls.ideaTitle.value;
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required])
    });
  }

}
