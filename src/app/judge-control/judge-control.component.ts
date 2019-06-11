import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { IdeaService } from '../Services/idea.service';

@Component({
  selector: 'app-judge-control',
  templateUrl: './judge-control.component.html',
  styleUrls: ['./judge-control.component.css']
})
export class JudgeControlComponent implements OnInit {

  teamName: string;
  JudgeEmail: string;
  challengeName: string;
  judges: any[] = [];
  form: FormGroup;
  loading: boolean;
  ideaId: string;
  fileName: string;
  errorAlert: boolean;
  errorMessage: string;

  constructor(private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('')
    });
    this.toggleLoading();
    this.adminService.getIdea(this.route.snapshot.queryParams['team']).subscribe(res => {
      this.teamName = res.body.teamName;
      this.challengeName = res.body.challenge;
      this.ideaId = res.body._id;
      this.fileName = res.body.filename;
      this.getJudges(res.body.judgments);
      this.toggleLoading();
    })
  }
  getJudges(judgments) {
    judgments.forEach(judgment => {
      let object = {};
      object['name'] = judgment.judgeName;
      object['email'] = judgment.judgeEmail;
      object['score'] = judgment.score == -1 ? "not judged yet" : judgment.score;
      this.judges.push(object);
    });
  }

  toggleLoading() {
    this.loading = !this.loading;
    if (this.loading)
      this.form.disable();
    else
      this.form.enable();
  }

  onDownload() {
    this.toggleLoading()
    this.hideAlerts();
    this.ideaService.downloadIdea(this.fileName).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        var win = window.open(fileURL);
        this.toggleLoading();
      }, (err) => {
        alert("Download Failed! Try again later.");
        this.toggleLoading();
      }
    );
  }

  addJudge() {
    this.toggleLoading();
    this.hideAlerts();
    this.adminService.isJudge(this.form.value.email).subscribe(res => {
      // already a judge
      let judgeId = res.data._id
      this.adminService.assignJudge(judgeId, this.ideaId).subscribe(res => {
        let judge = {};
        const judgment = res.data.idea.judgments.filter(judgment => judgment.judgeId == judgeId)[0];
        judge['name'] = judgment.judgeName;
        judge['email'] = judgment.judgeEmail;
        judge['score'] = 'not judged yet';
        this.judges.push(judge);
        this.toggleLoading();
      }, err => {
        this.errorAlert = true;
        this.errorMessage = err.json().errors[0].message;
        this.toggleLoading();
      });
    }, err => {
      err = err.json();
      if (err.status == 404) {
        // make the user a judge
        this.adminService.createNewJudge(this.form.value.email).subscribe(res => {
          let judgeId = res.data;
          // assign to the idea
          this.toggleLoading()
          this.adminService.assignJudge(judgeId, this.ideaId).subscribe(res => {
            let judge = {}
            const judgment = res.data.idea.judgments.filter((judgment) => judgment.judgeId === judgeId)[0];
            judge['name'] = judgment.judgeName;
            judge['email'] = judgment.judgeEmail;
            judge['score'] = 'not judged yet';
            this.judges.push(judge);
            this.toggleLoading();
          }, err => {
            this.errorAlert = true;
            this.errorMessage = err.json().errors[0].message;
            this.toggleLoading();
          });
        }, err => {
          this.errorAlert = true;
          this.errorMessage = err.json().errors[0].message;
          this.toggleLoading();
        });
      } else {
        this.errorAlert = true;
        this.errorMessage = err.errors[0].message;
        this.toggleLoading();
      }
    });
  }

  hideAlerts() {
    this.errorAlert = false;
  }
}
