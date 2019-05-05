import { Component, OnInit, ɵConsole } from '@angular/core';
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
  errAlert: boolean;
  errMessage: string;
  editFlag: boolean;
  alertFlag: boolean;
  editMsg: string;
  alertMsg: string;
  user: string;
  enableJoin: boolean;


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

  viewAllTeams() {
    this.router.navigate(['./teams']);
  }

  addMember(email) {

    this.adminService.addTeamMember(this.teamName, email.value).subscribe(res => {

      this.editFlag = false;

      if (res != null) {
        this.team.members = res.data.members;

      }

    }, (err) => {
      this.editFlag = true;
      this.editMsg = "couldn't add member to team"
    });
  }

  deleteMember(email) {
    this.adminService.deleteTeamMember(this.teamName, email).subscribe(res => {

      this.editFlag = false;
      if (res != null) {
        this.team.members = res.data.members;


      }
    }, (err) => {
      this.editFlag = true;
      this.editMsg = "couldn't delete member to team"
    });
  }

  hideAlerts() {
    this.errAlert = false;
    this.errMessage = '';
  }

  setErrorMessage(message) {
    this.errMessage = message;
  }


  ngOnInit() {
    this.hideAlerts();
    this.user = this.localStorageService.get('email');
    this.teamName = this.route.snapshot.params['teamName'];
    this.enableJoin = true
    this.teamService.getTeam(this.teamName).subscribe((res) => {
      this.team = res.data.team;
      console.log(this.team.members)
      this.creator = this.team.creator === null ? '' : this.team.creator.email;
      console.log(this.user)
      this.team.members.forEach(member => {
        if (member.email == this.user) {
          this.enableJoin = false
        }
      });
      if (this.team.members.includes(this.user)){
        console.log('user in team', this.user)
      }
    }, (err) => {
      this.errAlert = true;
      if (err.status == '404') {
        this.setErrorMessage('Team not found!');
      }
      else {
        this.setErrorMessage('An error has occured Please try again!');
      }
    })
    this.isAdmin = this.localStorageService.get('isAdmin');
  }
}
