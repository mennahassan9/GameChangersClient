import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './../Services/login.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: any = {};

    constructor(
      private loginService: LoginService,
      private router: Router
    ) {}

    redirectToTeam() {
      this.router.navigate(['./registerTeam']);
    }

    ngOnInit() {
      this.loginService.getUser().subscribe((res) => {
        this.currentUser = JSON.parse(res["_body"]);
      }, (err) => {
        console.log("ERR --> ", err);
      });
    }
}