import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-view-user-idea',
  templateUrl: './admin-view-user-idea.component.html',
  styleUrls: ['./admin-view-user-idea.component.css']
})
export class AdminViewUserIdeaComponent implements OnInit {

  user: string;
  idea: any = {};
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
  ideaFlag: boolean;
  ideaMsg: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
  }


  toggleLoading() {
    this.loading = !this.loading;
    if (this.loading)
      this.form.disable()
    else
      this.form.enable()
  }

  onDownload() {
    this.toggleLoading()
    this.adminService.downloadIdea(this.filename).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        var win = window.open(fileURL);
        this.toggleLoading();
      }, (err) => {
        this.ideaFlag = true;
        this.ideaMsg = "error occurred while trying to download Idea "
        this.toggleLoading();
      }
    );
  }

  ngOnInit() {
    this.user = this.route.snapshot.params['id'];
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
      challenge: new FormControl('', [Validators.required])
    });

    this.adminService.getUserIdea(this.user).subscribe((res) => {
      this.ideaFlag = false;
      if (JSON.parse(res["_body"])["data"] != null) {
        this.idea = JSON.parse(res["_body"])["data"]["0"];
        this.title = this.idea.title;
        this.oldFilename = this.idea.oldFilename;
        this.alreadyExistingChallenge = this.idea.challenge;
        this.filename = this.idea.filename;
        this.form.get('challenge').setValue(this.alreadyExistingChallenge);
      }
      else {
        this.ideaFlag = true;
        this.ideaMsg = "No Idea found for this user"
      }
    }, (err) => {
      this.ideaFlag = true;
      this.ideaMsg = err.json().message;
    })

  }
}


