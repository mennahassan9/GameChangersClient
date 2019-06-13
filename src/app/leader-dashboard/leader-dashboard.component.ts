import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { TeamService } from '../Services/team.service';
import { LoginService } from '../Services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { HeaderButtonsService } from '../Services/headerButtons.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-leader-dashboard',
  templateUrl: './leader-dashboard.component.html',
  styleUrls: ['./leader-dashboard.component.css']
})
export class LeaderDashboardComponent implements OnInit {


  alertFlag: boolean;
  alertMsg: string;
  chapter: any
  region: any
  cl: boolean= false
  rl: boolean= false
  submit : boolean;
created: boolean = false;

  public users: string = "";
  public teams: number = 0;
  form: FormGroup;
 
  constructor(
   private userService : UserService,
   private teamService : TeamService,
   private loginService : LoginService,
   private localStorageService: LocalStorageService,
   private headerService: HeaderButtonsService
  ) { }

  send() {
    this.submit = true;
   
    if (this.form.valid) {
      // this.resortIdeas();
      console.log("value", this.form.value)
      if(this.cl){
        this.userService.sendToC(this.chapter,this.form.value)
      }
      if(this.rl){
        this.userService.sendToR(this.region,this.form.value)
      }
    }
  this.form.reset();
  this.created=true
  this.submit=false;
  }

  ngOnInit() {
    this.form = new FormGroup({
      subject: new FormControl(''),
      body: new FormControl('')})
    
    this.loginService.getUser().subscribe((res) => {
      this.chapter = JSON.parse(res["_body"]).data.chapter;
      this.region = JSON.parse(res["_body"]).data.region; 
      if (this.localStorageService.get("isGLeader")) {
        this.headerService.setIsSignedInGLeader();
        this.teamService.getTeams().subscribe(res => {
          console.log(res)
          this.teams = res.data.length;
        }, e=>{
          this.alertFlag=true;
          this.alertMsg= "Couldn't connect to server";
        })
        this.userService.getAllUsers().subscribe(res => {
          this.users = res.data.length;
        }, e=>{
          this.alertFlag=true;
          this.alertMsg= "Couldn't connect to server";
    
        })
      }
      if(this.localStorageService.get("isCLeader") == true){
        this.cl=true
        this.headerService.setIsSignedInCLeader();
        this.userService.getUsersC(this.chapter).subscribe(res => {
          
          this.users = res.data;
          this.users = res.data.length;
          
        }, e=>{
          this.alertFlag=true;
          this.alertMsg= "Couldn't connect to server";
    
        })
        this.teamService.getTeamsC(this.chapter).subscribe(res=>{
          console.log(res)
          this.teams=res.data.length
        },
        e=>{})
      
      }
        if(this.localStorageService.get("isRLeader") == true){
          this.rl=true;
          this.headerService.setIsSignedInRLeader();
          this.userService.getUsersR(this.region).subscribe(res => {
            this.users = res.data;
            this.users = res.data.length;
            
          }, e=>{
            this.alertFlag=true;
            this.alertMsg= "Couldn't connect to server";
      
          })
          this.teamService.getTeamsR(this.region).subscribe(res=>{
            this.teams=res.data.length
          },
            e=>{})
        
        }
    })


}
}
