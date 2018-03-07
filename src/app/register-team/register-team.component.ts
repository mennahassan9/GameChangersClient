import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
  styleUrls: ['./register-team.component.css']
})
export class RegisterTeamComponent implements OnInit {
  teamEmails: Array<String>;
  maxNumber: boolean = false;
  alreadyInCurrentTeam: boolean = false;
  form: FormGroup;
  fb: FormBuilder;
  teamNumber: Array<number>;
  teamName: String;
  constructor(private teamService : TeamService) { }

  ngOnInit() {
    this.teamNumber = new Array<number>();
    this.teamNumber.push(1);
    this.teamEmails = new Array<String>();
    this.fb = new FormBuilder();
    this.form = this.fb.group({
      teamName: new FormControl('', [Validators.compose([Validators.required])])
    })
  }
  addEmployee(email)
  { 
    this.alreadyInCurrentTeam = false;  
    if(this.checkEmployee(email.value)){
      this.alreadyInCurrentTeam = true;
    }
    else{
      if(this.teamEmails.length < 6)
      this.teamEmails.push(email.value)
      else
      this.maxNumber = true;
    }
    console.log(this.alreadyInCurrentTeam)
  }
  checkEmployee(email)
  {
    // console.log()
    for(var i = 0; i< this.teamEmails.length; i++)
    {
      console.log(email)
      if(this.teamEmails[i] == email)
      return true
    }
    return false;

  }
  removeFromTeam(index)
  {
    this.teamEmails.splice(index, 1)
  }
  createTeam()
  {
    this.teamService.createTeam(this.teamName, this.teamEmails)
  }
}
