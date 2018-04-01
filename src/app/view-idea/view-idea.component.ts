import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../Services/team.service';
import { UserService } from '../Services/user.service';
import { IdeaService } from '../Services/idea.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { LocalStorageService } from 'angular-2-local-storage';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import * as mime from 'mime-types'

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
  challenge: string;
  title: string;
  challenges = [];
  alreadyExistingChallenge: string;
  filename: string; 
  loading: boolean; 
  oldFilename: string;

  constructor(
    private teamService: TeamService,
    private http: Http,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private ideaService: IdeaService
  ) { }

  toggleLoading() {
    this.loading = !this.loading;
    if(this.loading)
      this.form.disable()
    else
       this.form.enable()
  }

  editIdea() {
    this.formSubmitted = true;
    if (this.form.valid) {
        if(this.slides) {
          this.toggleLoading()
          this.ideaService.changeIdea(this.slides[0], this.form.get('ideaTitle').value, this.form.get('challenge').value, this.filename).subscribe(
            (res) => {
              this.toggleLoading()
              if(res == '200') {
                this.router.navigate(['./profile']);
                alert("Thank you for submitting your idea!")
              }
              else alert("There was an error in submitting your idea, please resubmit.")
            }
          );
        }
        else {
          this.ideaService.changeIdea(null, this.form.get('ideaTitle').value, this.form.get('challenge').value, this.filename).subscribe(
            (res) => {
              if(res == '200') {
                this.router.navigate(['./profile']);
              }
              else alert("There was an error in submitting your idea, please resubmit.")
            });
        }
    }
  }

  backToProfile() {
    this.router.navigate(['./profile']);
  }

  onUpload(event) {
    this.slides = event.srcElement.files;
    if (this.slides.length > 0) { 
      this.slidesName = this.form.controls.ideaTitle.value;
    }
  }

  onDownload() {
    this.toggleLoading()
    this.ideaService.downloadIdea(this.filename).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        var win = window.open(fileURL);
        this.toggleLoading()

      }
    );
  }

  onSelectChallenge(value) {
    this.selectedChallenge = value;
  }

  initChallenges() {
    this.challenges.push("Chief Customer Office – Customer Advocacy");
    this.challenges.push("Automation of Service");
    this.challenges.push("Culture Code");
    this.challenges.push("Open Ended");
  }

  ngOnInit() {
    this.initChallenges();
    this.loading = false;
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
      challenge: new FormControl('', [Validators.required])
    });
    this.ideaService.getIdea().subscribe((res) => {
      if (JSON.parse(res['_body']) != null) {
        this.title = JSON.parse(res['_body']).idea.title;
        this.oldFilename = JSON.parse(res['_body']).idea.oldFilename;
        this.alreadyExistingChallenge = JSON.parse(res['_body']).idea.challenge;
        this.filename = JSON.parse(res['_body']).idea.filename;
        this.form.get('challenge').setValue(this.alreadyExistingChallenge);
      } else {
        console.log('idea is null');
      }
      }, (err) => {
      console.log('ERR', err);
    });
  }
}