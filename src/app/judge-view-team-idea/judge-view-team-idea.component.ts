import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { JudgingService } from '../Services/judging.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IdeaService } from '../Services/idea.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-judge-view-team-idea',
  templateUrl: './judge-view-team-idea.component.html',
  styleUrls: ['./judge-view-team-idea.component.css']
})

export class JudgeViewTeamIdeaComponent implements OnInit {

  team: string;
  idea: any = {};
  judge: any = {};
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
  ideaId: string;
  loading: boolean;
  oldFilename: string;
  ideaFlag: boolean;
  ideaMsg: string;
  errorAlert: boolean;
  errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private ideaService: IdeaService,
    private judgingService: JudgingService,
    private userService: UserService
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
    this.ideaService.downloadIdea(this.filename).subscribe(
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
    this.team = this.route.snapshot.params['teamName'];
    this.form = new FormGroup({
      ideaTitle: new FormControl('', [Validators.required]),
      challenge: new FormControl('', [Validators.required])
    });

    this.judgingService.getTeamIdea(this.team)
      .then(res => { 
      this.ideaFlag = false;
      console.log(res['body'])
      if (res['body'] != null) {
        this.title = res['body']['title'];
        this.oldFilename = res['body']['oldFilename'];
        this.alreadyExistingChallenge = res['body']['category'];
        this.filename = res['body']['filename'];
        this.ideaId = res['body']['_id']
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

  assignToIdea() {
    
    this.userService.getCurrentUser().subscribe(res => {
      this.judge = JSON.parse(res["_body"])["data"];
      console.log('!!!!!!!!!!!!!!!!!!!!', this.judge._id)
    
      this.adminService.assignJudge(this.judge._id, this.ideaId).subscribe(res => {
        this.router.navigate(['/judge'])
      }, err => {
        this.errorAlert = true;
        this.errorMessage = JSON.parse(err['_body'])['errors'][0].message
      });
    })
  }
}
