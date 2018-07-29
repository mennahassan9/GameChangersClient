import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import { AdminService } from '../Services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {

  team: any = {};
  creator: string;
  teamName: String;
  isAdmin: boolean;
  addedemail: string;

  constructor(
    private teamService: TeamService,
    private adminService: AdminService,
    private http: Http,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  backToProfile() {
    this.router.navigate(['./profile']);
  }

  addMember(email) {
    this.adminService.addTeamMember(this.teamName,email.value).subscribe(res => {
      if (res.team!= null) {
        this.team = res.team;
      }   
    }, (err) => {
      console.log("ERR", err);
    });
  }

  deleteMember(email) {
    this.adminService.deleteTeamMember(this.teamName,email).subscribe(res => {
    
      if (res.team!= null) {
        this.team = res.team;  
      } 
    }, (err) => {
      console.log("ERR", err);
    });
  }


  ngOnInit() {
    this.teamName = this.route.snapshot.params['teamName'];
    this.teamService.getTeam(this.teamName).subscribe((res) => {
      if (JSON.parse(res["_body"])["team"] != null) {
        this.team = JSON.parse(res["_body"])["team"];
        this.creator = this.team["creator"]["email"]
        console.log(this.creator)
      }
      else {
        console.log("NULL TEAM");
      }
    }, (err) => {
      console.log("ERR", err);
    })
    this.isAdmin = this.localStorageService.get('isAdmin');

console.log(this.isAdmin);

  }
}
