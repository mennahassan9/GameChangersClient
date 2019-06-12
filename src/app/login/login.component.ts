import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

import { LoginService } from './../Services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { HeaderButtonsService } from '../Services/headerButtons.service';

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
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private headerButtonsService: HeaderButtonsService
  ) {}

  // calls the end point for verifying credentials and redirects on success.
  submit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      // redirect to the landing page for the profile in case of valid user credentials
      const email = this.form.get('email').value;
      let password = this.form.get('password').value;
      this.loginService.loginCheck(email, password).then((res) => {
        this.wrongCredentials = false;
        this.headerButtonsService.setIsSignedIn();
        
        // this.localStorageService.set("token", JSON.parse(res["_body"])["token"]);
        if (this.localStorageService.get("isAdmin") == true) {
          this.router.navigate(['./admin/dashboard']);
        }
        else{
          if(this.localStorageService.get("isJudge")){
            this.router.navigate(['./judge']);
          }
          if(this.localStorageService.get("isCLeader")|| this.localStorageService.get("isRLeader")||this.localStorageService.get("isGLeader"))
          {
            this.router.navigate(['./leader/dashboard'])
          }else{
            this.router.navigate(['./profile']);
          }

        }

      }, (err) => {
        this.wrongCredentials = true;
      });
    }
  }

  // binds the templates form to the customized validations, as defined here.
  ngOnInit() {
    this.localStorageService.remove("token");
    this.localStorageService.remove("isJudge");
    this.localStorageService.remove("isAdmin");
    this.localStorageService.remove("email");

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
