import { Component, OnInit } from '@angular/core';
import { TeamService } from '../Services/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from './../Services/login.service';



@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})
export class JoinTeamComponent implements OnInit {

  team: any = {};
  loading: boolean; 
  alertFlag: boolean;
  alertMsg: string;
  teamName: String;
  teamMember: string;
  user: string;
  successMsg: string;

  constructor(
    private teamService: TeamService,
    private loginService: LoginService,
    private router: Router,    
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    

    ) { }

  setErrorMessage(message) {
    this.alertMsg = message;
  }
  ngOnInit() {
    this.user = this.localStorageService.get('email');
    this.teamName = this.route.snapshot.params['teamname'];
    this.loginService.getUser().subscribe((res) => {
      this.teamMember = JSON.parse(res["_body"]).data.teamMember;
      console.log(this.teamMember)
      if (this.teamMember == this.teamName) {
        this.alertFlag = false;
        this.router.navigate([`./viewTeam/${this.teamMember}`]);
      }
      if(this.teamMember== '-1'){
        this.submitJoin(this.teamName)
      }
    }, (err) => {
      err = err.json();
      this.alertFlag = true;
      this.alertMsg = 'An error has occured. Please try again later!';
    });
   // this.submitJoin(this.teamName)
    // this.teamService.getTeam(this.teamName).subscribe((res) => {
    // this.team = res.data.team;
    //   if (this.team == null) {
    //     // this.viewAllTeams()
    //   }
    // }, (err) => {
    //   this.alertFlag = true;
    //   if (err.status == '404') {
    //     this.setErrorMessage('Team not found!');
    //   }
    //   else {
    //     this.setErrorMessage('An error has occured Please try again!');
    //   }
    // })
    // this.isAdmin = this.localStorageService.get('isAdmin');
  }
  
  

  public submitJoin(teamName){
    console.log(teamName)
    this.teamService.joinTeam(teamName).subscribe((res) => {
      this.successMsg = 'Done'
      //this.team = res.
    }, (err) => {
      err = err.json();
      console.log(err)
      //this.error = 
    })    
  }
}
