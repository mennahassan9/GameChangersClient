import { Component, OnInit, Output, EventEmitter, trigger, Input } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-invite-team-member',
  templateUrl: './invite-team-member.component.html',
  styleUrls: ['./invite-team-member.component.css']
})
export class InviteTeamMemberComponent implements OnInit {
  send: boolean;
  form: FormGroup;
  fb: FormBuilder;
  alreadyInvited: boolean;
  email:string
  items:any;
  notMember: boolean
  fromList: boolean = false;
  @Output('employee') addEmployeeToPending: EventEmitter<any> = new EventEmitter();
  constructor(private userService: UserService 
    ,private teamService: TeamService) 
    { }

  handleInput(){
    this.fromList = false;
    if(this.email.length != 0){
      this.teamService.SearchUsers(this.email).subscribe((res) => {
      this.items = res.body;
      }, (err) => {
        console.log("ERR", err);
      })
    }else
      this.items = null;
  }

  enter(email){
    this.email = email;
    this.items = null;
    this.notMember = false;
  }

  ngOnInit() {
    this.fb = new FormBuilder(); 
    this.notMember = false;
    this.form = this.fb.group({
      email: new FormControl('', [Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(dell|emc|virtustream|rsa|pivotal|secureworks)\.com$")])])
    })
  }
  checkIfInTeam()
  {
    if(this.email && this.email.length != 0){
      this.teamService.SearchUsers(this.email).subscribe((res) => {
      if(res.body.length == 0)
        this.notMember = true;
        if(this.form.valid && !this.notMember){
          this.addEmployeeToPending.emit(this.form.get('email'));
          this.form.get('email').setValue(" ");
          this.send = false;
        }
      }, (err) => {
        console.log("ERR", err);
      })
    }
    
  }
}
