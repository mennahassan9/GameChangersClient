import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { IdeaService } from '../Services/idea.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { HeaderButtonsService } from '../Services/headerButtons.service';

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
  isLeader: boolean;
  idea: any;
  successAlert: boolean;

  constructor(private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private ideaService: IdeaService,
    private localStorageService: LocalStorageService,
    private headerService: HeaderButtonsService

  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('')
    });
    this.toggleLoading();
    this.isLeader = this.localStorageService.get("isCLeader") || this.localStorageService.get("isRLeader") || this.localStorageService.get("isGLeader")
    if (this.localStorageService.get("isGLeader")) {
      this.headerService.setIsSignedInGLeader();
    }
    if (this.localStorageService.get("isCLeader")) {
      this.headerService.setIsSignedInCLeader();
    }
    if (this.localStorageService.get("isRLeader")) {
      this.headerService.setIsSignedInRLeader();
    }
    if (this.isLeader) {
      console.log('hhhhhhhh')
      this.ideaService.getIdea(this.route.snapshot.queryParams['team']).subscribe((res) => {
        // console.log(res)
        // this.ideaFlag = false;
        if (JSON.parse(res["_body"])["body"] != null) {
          this.idea = JSON.parse(res["_body"])["body"];
          console.log(this.idea)
          this.teamName = this.idea.teamName;
          // this.title = this.idea.title;
          this.challengeName = this.idea.category;
          this.fileName = this.idea.filename;
          this.getJudges(this.idea.judgments);
          this.toggleLoading();
        }
        else {
          this.errorAlert = true;
          this.errorMessage = "No Idea found for this user"
        }
      }, (err) => {
        this.errorAlert = true;
        this.errorMessage = "Couldn't retrieve idea"
      })
    } else {
      this.adminService.getIdea(this.route.snapshot.queryParams['team']).subscribe(res => {
        this.teamName = res.body.teamName;
        this.challengeName = res.body.challenge;
        this.ideaId = res.body._id;
        this.fileName = res.body.filename;
        this.getJudges(res.body.judgments);
        this.toggleLoading();
      })
    }
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
    this.errorMessage = ''
    this.adminService.isJudge(this.form.value.email).subscribe(res => {
      // already a judge
      this.toggleLoading()
      let judgeId = res.data._id
      if (!res.data.isJudge) {
        this.adminService.createNewJudge(this.form.value.email).subscribe(res => {
          // assign to the idea
          this.successAlert = true
          this.errorMessage = "Successfully created judge\n"
          this.toggleLoading()
        }, err => {
          // this.toggleLoading()
          this.errorAlert = true
          this.errorMessage = this.errorMessage + err.json().errors[0].message + '\n'
          this.toggleLoading()
        })
      }

      this.adminService.assignJudge(judgeId, this.ideaId).subscribe(res => {
        let judge = {};
        const judgment = res.data.judgments.filter(judgment => judgment.judgeId == judgeId)[0];
        judge['name'] = judgment.judgeName;
        judge['email'] = judgment.judgeEmail;
        judge['score'] = 'not judged yet';
        this.judges.push(judge);
        this.successAlert = true
        this.errorMessage = this.errorMessage + "Successfully assigned judge to idea\n"
        //this.toggleLoading();
      }, err => {
        this.errorAlert = true;
        // this.errorMessage = err.json().errors[0].message;
        this.errorMessage = this.errorMessage + err.json().errors[0].message + '\n'
        //this.toggleLoading();
      });
    }, err => {
      this.errorMessage = err.json().errors[0].message
      this.adminService.createNewJudge(this.form.value.email).subscribe(res => {
        console.log('hihihihihihi', res)
        let judgeId = res.data
        // assign to the idea
        this.successAlert = true
        this.errorMessage = "\nSuccessfully created judge\n"
        this.toggleLoading()

        this.adminService.assignJudge(judgeId, this.ideaId).subscribe(res => {
          let judge = {};
          const judgment = res.data.judgments.filter(judgment => judgment.judgeId == judgeId)[0];
          judge['name'] = judgment.judgeName;
          judge['email'] = judgment.judgeEmail;
          judge['score'] = 'not judged yet';
          this.judges.push(judge);
          this.successAlert = true
          this.errorMessage = this.errorMessage + "Successfully assigned judge to idea\n"
          //this.toggleLoading();
        }, err => {
          this.errorAlert = true;
          // this.errorMessage = err.json().errors[0].message;
          this.errorMessage = this.errorMessage + err.json().errors[0].message + '\n'
          this.toggleLoading();
        });
      }, err => {
        this.errorAlert = true;
        // this.errorMessage = err.json().errors[0].message;
        this.errorMessage = this.errorMessage + err.json().errors[0].message + '\n'
        this.toggleLoading();
      })
    })
  }

  hideAlerts() {
    this.errorAlert = false;
  }
}
