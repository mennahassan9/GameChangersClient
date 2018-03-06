import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

import { UserService } from './../Services/user.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean;
  wrongCredentials: boolean;
  sendSuccess: boolean;
  error: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  submit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      let email = this.form.get('email').value;

      this.userService.forgotPassword(email).subscribe((res) => {
        this.wrongCredentials = false;
        this.sendSuccess = true;
        this.formSubmitted = false;
        this.form.reset();
      }, (err) => {
        this.wrongCredentials = true;
        this.formSubmitted = false;        
        this.error = JSON.parse(err["_body"])["message"];
      });
    }
  }
  ngOnInit() {
    this.error = "Something went wrong please try again later"
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
  }

}
