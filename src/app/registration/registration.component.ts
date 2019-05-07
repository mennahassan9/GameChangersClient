import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { VALID } from '@angular/forms/src/model';
import { DndModule } from 'ng2-dnd';
import { IdeaModel } from '../../shared/Models/IdeaModel';
import { UserService } from '../Services/user.service';
import { RegistrationModel } from './Models/RegistrationModel';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  otherChapterField: boolean;
  match: boolean;
  form: FormGroup;
  chapters: Array<String>;
  ages: Array<String>;
  regions: Array<String>;
  ideas: Array<IdeaModel>;
  submit: boolean;
  errorAlert: boolean;
  errorMessage: String;
  hasIdea: boolean;

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private loginService: LoginService, 
    private headerButtonsService: HeaderButtonsService) { }

  ngOnInit() {
    this.chapters = new Array<String>()
    this.ages = new Array<String>();
    this.ideas = new Array<IdeaModel>();
    this.regions = new Array<String>();
    this.addChapters();
    this.addAges();
    this.addIdeas();
    this.addRegions();
    this.userSvc.getDeadlines().then((res) => {
      const registrationDeadline = new Date(JSON.parse(res['_body']).data.registration);
      const now = new Date();
      if (now > registrationDeadline) {
        this.showAlert('Deadline has been reached')
        this.form.disable();
      } 
    })
      .catch((err) => {
        alert('Something went wrong, please try again later');
      });
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      passConf: new FormControl(''),
      region: new FormControl(''),
    //  isRemote: new FormControl(''),
        chapter: new FormControl(''),
    //  otherChapter: new FormControl(''),
    //  position: new FormControl(''),
    //  careerLevel: new FormControl(''),
    //  age: new FormControl(''),
    //  previousParticipation: new FormControl(''),
    //  genNextMember: new FormControl(''),
    //  ideasOrder: new FormControl('[1,2,3]'),
    //  brief: new FormControl('')
    });
    this.form.get('passConf').valueChanges.subscribe(() => {
      if (this.form.get('password').value === this.form.get('passConf').value) {
        this.match = true;
      }
      else {
        this.match = false;
      }
    });
    this.form.get('password').valueChanges.subscribe(() => {
      if (this.form.get('password').value === this.form.get('passConf').value) {
        this.match = true;
      }
      else {
        this.match = false;
      }
    });
  }
  register() {
    this.submit = true;
    console.log(this.hasIdea)
    if (this.form.valid) {
      // this.resortIdeas();
      this.userSvc.register(this.form.value as RegistrationModel).then((success) => {
        if(this.hasIdea) {
          this.loginService.loginCheck(this.form.get('email').value, this.form.get('password').value).then((res) => {
            this.headerButtonsService.setIsSignedIn();
            this.router.navigate(['/registerTeam'])
          });
      
        }
        else 
          this.router.navigate(['./signin']);
      }).catch((err) => {
        console.log(err);
          err = err.json();
          if(err.errors[0].messages){
            this.showAlert(err.errors[0].messages[0]);
          }else {
            this.showAlert(err.errors[0].message);
          }
        });
    }
  }
  resortIdeas() {
    var newIdeasOrder = []
    for (var i = 0; i < this.ideas.length; i++) {
      newIdeasOrder.push(this.ideas[i].id);
    }
    this.form.get('ideasOrder').setValue(newIdeasOrder);
  }
  addChapters() {
    this.chapters.push("Others")
    this.chapters.push("Egypt")
    this.chapters.push("Other")
  }
  addAges() {
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
  addIdeas() {
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
  addRegions() {
    this.regions.push("MENA");
    this.regions.push("APJ");
    this.regions.push("Americas");
  }
  detectNewIdeaOrder(ideas) {
    ideas = ideas as IdeaModel;
    this.ideas = ideas;
  }
  onSelect(data) {
    if (data == "Other") {
      this.otherChapterField = true;
      this.form.get('otherChapter').setValidators(Validators.required)
    }
    else {
      this.otherChapterField = false;
      this.form.get('otherChapter').setValue("");
      this.form.get('otherChapter').clearValidators();
    }
  }
showAlert(message) {
  this.errorAlert = true;
  this.errorMessage = message;
}
}
