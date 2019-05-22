import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

import { UserService } from './../Services/user.service';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean;
  wrongCredentials: boolean;
  sendSuccess: boolean;
  error: string;
  token: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  submit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      let newPassword = this.form.get('newPassword').value;
      let verifyPassword = this.form.get('verifyPassword').value;

      this.userService.resetPassword(this.token, newPassword, verifyPassword).subscribe((res) => {
        this.wrongCredentials = false;
        this.sendSuccess = true;
        this.formSubmitted = false;
        this.form.reset();
        this.router.navigate(['/signin']);
      }, (err) => {
        this.wrongCredentials = true;
        this.formSubmitted = false;        
        this.error = JSON.parse(err["_body"]).errors[0].message;
      });
    }
  }

  ngOnInit() {
    // this.token = this.activatedRoute.snapshot.queryParams['token'];
  
    this.token = this.activatedRoute.snapshot.paramMap.get('token');

    console.log('HI AGAIN', this.token)

    if(this.token == '' || this.token == undefined || this.token == null){
      this.error = "Please stick to the link sent to your email";
      this.wrongCredentials = true;
    }else{
      this.error = "Something went wrong please try again later"
    }
    this.form = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      verifyPassword: new FormControl('', [Validators.required])
    });
  }

}
