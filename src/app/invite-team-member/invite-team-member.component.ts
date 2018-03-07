import { Component, OnInit, Output, EventEmitter, trigger, Input } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  @Output('employee') addEmployeeToPending: EventEmitter<any> = new EventEmitter();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fb = new FormBuilder(); 
    this.form = this.fb.group({
      email: new FormControl('', [Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(dell|emc|virtustream|rsa|pivotal|secureworks)\.com$")])])
  })
  }
  checkIfInTeam()
  {
    this.send = true;
    if(this.form.valid){
    // this.userService.checkIfInTeam(this.form.get('email').value).then((isInTeam) => {
    //  if(isInTeam)
    //  {
    //   this.alreadyInvited = true;
    //   this.send= false;  
    //  }
    //  else{
    //   this.addEmployeeToPending.emit(this.form.get('email'));
    //   this.form.get('email').setValue(" ");
    //   this.send = false;
    //  }
    // })
      this.addEmployeeToPending.emit(this.form.get('email'));
      this.form.get('email').setValue(" ");
      this.send = false;
    }
      
  }
}
