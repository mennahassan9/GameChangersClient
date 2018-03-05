import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators, FormControlName } from '@angular/forms';
import { VALID } from '@angular/forms/src/model';
import {DndModule} from 'ng2-dnd';
import { IdeaModel } from '../../shared/Models/IdeaModel';
import { UserService } from '../Services/user.service';
import { RegistrationModel } from './Models/RegistrationModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  otherLocationField: boolean;
  match: boolean;
  form : FormGroup;
  locations: Array<String>;
  ages: Array<String>;
  regions: Array<String>;
  ideas: Array<IdeaModel>;
  submit: boolean;
  constructor(private fb : FormBuilder, private userSvc: UserService) { }

  ngOnInit() {
    this.locations = new Array<String>()
    this.ages = new Array<String>();
    this.ideas = new Array<IdeaModel>();
    this.regions = new Array<String>();
    this.addLocations();
    this.addAges();
    this.addIdeas();
    this.addRegions();
    this.form = new FormGroup({
      name: new FormControl('' , [Validators.required]),
      email : new FormControl('' , [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(dell|emc|virtustream|rsa|pivotal|secureworks)\.com$")]),
      password: new FormControl('' , [Validators.required, Validators.minLength(8)]),
      passConf: new FormControl('' , [Validators.required]),
      region: new FormControl('', Validators.required),
      isRemote: new FormControl('' , [Validators.required]),
      location: new FormControl('' , [Validators.required]),
      otherLocation: new FormControl(''),
      position: new FormControl('' , [Validators.required]),
      careerLevel: new FormControl('' , [Validators.required]),
      age: new FormControl('' , [Validators.required]),
      previousParticipation: new FormControl('' , [Validators.required]),
      genNextMember: new FormControl('' , [Validators.required]),
      ideasOrder: new FormControl('[1,2,3]' , [Validators.required]),
      brief: new FormControl('')
    });
    this.form.get('passConf').valueChanges.subscribe(() => {
      if(this.form.get('password').value === this.form.get('passConf').value){
        this.match = true;
      }
      else{
        this.match = false;
      }
    });
    this.form.get('password').valueChanges.subscribe(() => {
      if(this.form.get('password').value === this.form.get('passConf').value){
        this.match = true;
      }
      else{
        this.match = false;
      }
    });
  }
  register()
  {
    this.submit = true;
    if(this.form.valid){
      this.resortIdeas();
      this.userSvc.register(this.form.value as RegistrationModel);
    }
    else{
      }
  }
  resortIdeas()
  {
    var newIdeasOrder = []
    for(var i = 0; i < this.ideas.length; i++)
    {
      newIdeasOrder.push(this.ideas[i].id);
    }
    this.form.get('ideasOrder').setValue(newIdeasOrder);
  }

  addLocations(){
    this.locations.push("Others")    
    this.locations.push("Other")
  }
  addAges()
  {
    this.ages.push("<25");
    this.ages.push("25-29");
    this.ages.push("30-34");
    this.ages.push("34-39");
    this.ages.push("40-45");
    this.ages.push("45-49");
    this.ages.push("50-55");
    this.ages.push("55-59");
    this.ages.push("60-64");
    this.ages.push("65+");
  }
  addIdeas()
  {
    var idea = new IdeaModel();
    idea.id = "1";
    idea.title = "Chief Customer Office - Customer Advocacy";
    idea.owner = "Robert Langford (VP, Customer Advocacy)"
    idea.body = "How can we develop a better customer experience by improving tools and processes based on feedback from the Voice of Field Survey?"
    this.ideas.push(idea);
    idea = new IdeaModel();
    idea.id = "2";
    idea.title = "Automation of Service";
    idea.owner = "Kent Allison (Sr Dir, GSD Software Development)"
    idea.body = "How can Artificial Intelligence transform the way we support customers?"
    this.ideas.push(idea);
    idea = new IdeaModel();
    idea.id = "3";
    idea.title = "Culture Code";
    idea.owner = "Jennifer Saavedra (SVP, Talent and Culture)"
    idea.body = "How do we make #Culturecode really come to life, and be a consistent experience for all team member?"
    this.ideas.push(idea);
    
  }
  addRegions()
  {
    this.regions.push("IMEA");
    this.regions.push("APJ");
    this.regions.push("Americas");
  }
  detectNewIdeaOrder(ideas)
  {
    ideas = ideas as IdeaModel;
    this.ideas = ideas;
  }
  onSelect(data){
    if(data == "Other")
    {
      this.otherLocationField = true;
      this.form.get('otherLocation').setValidators(Validators.required)
    }
    else
    {
      this.otherLocationField = false;
      this.form.get('otherLocation').setValue("");
      this.form.get('otherLocation').clearValidators();
    }
  }

}
