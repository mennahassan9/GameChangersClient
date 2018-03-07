import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

import { LoginService } from './../Services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean;
  wrongCredentials: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}

  // calls the end point for verifying credentials and redirects on success.
  submit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      // redirect to the landing page for the profile in case of valid user credentials
      let email = this.form.get('email').value;
      let password = this.form.get('password').value;

      this.loginService.loginCheck(email, password).subscribe((res) => {
        this.wrongCredentials = false;
        this.router.navigate(['./profile']);
        console.log(JSON.parse(res["_body"])["token"]);
        this.localStorageService.set("token", JSON.parse(res["_body"])["token"]);
      }, (err) => {
        this.wrongCredentials = true;
      });
    }
  }

  // binds the templates form to the customized validations, as defined here.
  ngOnInit() {
    this.localStorageService.remove("token");
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
