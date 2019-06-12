import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { JudgingService } from '../Services/judging.service';
import { IdeaService } from '../Services/idea.service';
import { LoginService } from '../Services/login.service';
import { HeaderButtonsService } from '../Services/headerButtons.service';
import { Question } from '../edit-questions/models/question';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-judge-idea',
  templateUrl: './judge-idea.component.html',
  styleUrls: ['./judge-idea.component.css']
})
export class JudgeIdeaComponent implements OnInit {
  questions: any[];
  maxScore: number;
  judgeId: any;
  teamName: string;
  idea: any = {};
  form: FormGroup;
  formSubmitted: boolean;
  loading: boolean;
  loaded: boolean = false;
  deadlineReached: boolean = false;
  innovationScoreValid: boolean = true;;
  problemSolvingScoreValid: boolean = true;
  financialImpactScoreValid: boolean = true;
  feasibilityScoreValid: boolean = true;
  qualityOfPresentationScoreValid: boolean = true;
  ideaId: string = "";
  totalScore: number = 0;
  totalScoreValid: boolean = true;
  errAlert: boolean;
  errMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private judgingService: JudgingService,
    private ideaService: IdeaService,
    private headerButtonsService: HeaderButtonsService,
    private userService: UserService
  ) { }

  async submit() {
    this.hideAlerts()
    if (this.form.valid) {
      this.formSubmitted = true;
      this.judgingService.judge(this.questions, this.ideaId, this.teamName).then((success) => {
        this.router.navigate(['/judge']);
      }).catch((err) => {
        this.errAlert = true;
        this.errMsg = err.json().errors[0].message;
      });
    }
  }

  ngOnInit() {
    this.hideAlerts()
    this.form = new FormGroup({});
    this.teamName = this.route.snapshot.queryParams['team'];
    this.idea = {
      name: "",
      filename: this.teamName
    };
    this.maxScore = 0;
    this.userService.getDeadlines().then((res) => {
      const judgmentDeadline = new Date(JSON.parse(res['_body']).data.judging);
      const now = new Date();
      if (now > judgmentDeadline) {
        this.deadlineReached = true;
        this.form.disable();
      } else {
        this.deadlineReached = false;
        this.judgingService.getTeamIdea(this.teamName)
          .then(response => {
            this.idea.name = response['body']['title'];
            this.ideaId = response['body']['_id'];
            this.idea.filename = response['body']['filename']
            if (response['ideajudgment']) {
              this.loaded = false;
              this.questions = []
              for (let i = 0; i < response['ideajudgment'].questions.length; i++) {
                this.questions.push(response['ideajudgment'].questions[i][0]);
              }
              this.questions.forEach((question, index) => {
                this.form.addControl(`${question.category}${index}Score`, new FormControl(question.currentScore, [Validators.required, Validators.max(question.rate), Validators.min(0)]))
                this.form.addControl(`${question.category}${index}Comment`, new FormControl('', []))
                this.loaded = (index == this.questions.length - 1);
                if (this.loaded)
                  this.startCalculateScore();
                this.maxScore += question.rate;
              });
            } else {
              this.judgingService.getQuestions().subscribe((response) => {
                this.questions = JSON.parse(response["_body"])["body"];
                this.questions.forEach((question, index) => {
                  this.form.addControl(`${question.category}${index}Score`, new FormControl('', [Validators.required, Validators.max(question.rate), Validators.min(0)]))
                  this.form.addControl(`${question.category}${index}Comment`, new FormControl('', []))
                  this.loaded = (index == this.questions.length - 1);
                  this.startCalculateScore();
                  this.maxScore += question.rate;
                });
              })
            }
          })
          .catch(err => {
            this.errAlert = true;
            this.errMsg = 'Error fetching idea!';
          });
      }
    }).catch((err) => {
      this.errAlert = true;
      this.errMsg = 'Something went wrong. Please try again later!';
    });
  }

  onDownload() {
    this.hideAlerts();
    this.toggleLoading()
    this.ideaService.downloadIdea(this.idea.filename).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        var win = window.open(fileURL);
        this.toggleLoading();
      }, (err) => {
        this.errAlert = true;
        this.errMsg = 'Download Failed! Try again later';
        this.toggleLoading();
      }
    );
  }

  checkBtn() {
    if (this.form.valid && this.feasibilityScoreValid && this.financialImpactScoreValid && this.innovationScoreValid
      && this.qualityOfPresentationScoreValid && this.problemSolvingScoreValid) {
      (<HTMLInputElement>document.getElementById("submit_btn")).disabled = false;
    } else {
      (<HTMLInputElement>document.getElementById("submit_btn")).disabled = true;
    }

  }

  startCalculateScore() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).valueChanges.subscribe(() => {
        if (key.includes('Score')) {
          this.totalScore = 0;
          this.questions.forEach((question) => {
            this.totalScore += isNaN(question.currentScore) || question.currentScore > question.rate ? 0 : question.currentScore;
          });
        }
      });
    });
  }

  toggleLoading() {
    this.loading = !this.loading;
    if (this.loading)
      this.form.disable();
    else
      this.form.enable();
  }

  hideAlerts() {
    this.errAlert = false;
    this.errMsg = '';
  }
}
