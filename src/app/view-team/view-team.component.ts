import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {
  
  team: any = {};
  creator: string;

  constructor(
    private teamService : TeamService,
    private http: Http, 
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) { }

  backToProfile() {
    this.router.navigate(['./profile']);
  }

  ngOnInit() {
    this.teamService.getTeamAsMember().subscribe((res) => {
      if (JSON.parse(res["_body"])["team"] != null) {
        this.team = JSON.parse(res["_body"])["team"];
        // console.log("TEAM --> ", this.team);
        this.userService.getAnotherUser(this.team["creator"]).subscribe((res) => {
          console.log("CREATOR OBJ --> ", JSON.parse(res["_body"]));
          this.creator = JSON.parse(res["_body"])["user"]["name"];
        }, (err) => {
          console.log("ERROR FETCHING CREATOR --> ", err);
        });
      } 
      else {
        console.log("NULL TEAM");
      }
    }, (err) => {
      console.log("ERR", err);
    })
  }
}
