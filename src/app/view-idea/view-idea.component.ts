import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { IdeaService } from '../Services/idea.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.css']
})
export class ViewIdeaComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean;
  slides: any;
  slidesName: string;
  selectedChallenge: boolean;

  constructor(
    private teamService : TeamService,
    private http: Http, 
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private ideaService: IdeaService
  ) { }

  editIdea() {
    this.formSubmitted = true;
    if (this.form.valid) {
        // send the parameters to the 
        // register-idea.component.ts is a good reference
        // this.ideaService.changeIdea();
    }
  }

  onUpload(event) {
    this.slides = event.srcElement.files;
    if (this.slides.length > 0) {
      this.slidesName = this.form.controls.ideaTitle.value;
    }
  }

  onSelectChallenge(value) {
    this.selectedChallenge = value;
  }

  ngOnInit() {
    this.form = new FormGroup({
        ideaTitle: new FormControl('', [Validators.required]),
        challenge: new FormControl('', [Validators.required])
    });
  }
}
