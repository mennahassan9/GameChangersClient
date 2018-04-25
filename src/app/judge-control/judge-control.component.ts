import { Component, OnInit } from '@angular/core';
import { AdminService} from '../Services/admin.service';
import { Params, ActivatedRoute , Router} from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators, FormControlName } from '@angular/forms';
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
  judges: any[] =[];
  form : FormGroup;
  loading: boolean;
  ideaId: string; 
  fileName: string;

  constructor(private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl('')
    });
    this.toggleLoading();
    this.adminService.getIdea(this.route.snapshot.queryParams['team']).subscribe(res => {
      console.log(res);
      this.teamName = res.body.teamName;
      this.challengeName = res.body.challenge;
      this.ideaId = res.body._id;
      this.fileName = res.body.filename;
      this.getJudges(res.body.judgments);
      this.toggleLoading();
    })
  }
  getJudges(judgments){
    judgments.forEach(judgment => {
      let object = {};
      object['name'] = judgment.judgeName;
      object['email'] = judgment.judgeEmail == undefined? 'judge@emc.com':judgment.judgeEmail ;
      object['score'] = judgment.score == -1 ? "not judged yet": judgment.score;
      this.judges.push(object);      
    });
  }
  
  toggleLoading() {
    this.loading = !this.loading;
    if(this.loading)
      this.form.disable()
    else
       this.form.enable()
  }

  removeJudge(judge){
    console.log(judge);
  }

  onDownload() {
    this.toggleLoading()
    console.log(this.fileName);
    this.ideaService.downloadIdea(this.fileName).subscribe(
      (res) => {
          var fileURL = URL.createObjectURL(res);
          var win = window.open(fileURL);
          this.toggleLoading();
      } , (err) => {
          alert("Download Failed! Try again later.");
          this.toggleLoading();
      }
    );
  }

  addJudge(){
    this.toggleLoading()
    this.adminService.isJudge(this.form.value.email).subscribe(res => {
      console.log(res);
      if(res.state == true && res.isJudge == true && res.isUser == true){ // already a judge
        let judgeId = res.judgeId
        this.adminService.assignJudge(judgeId, this.ideaId).subscribe(res => {
          let object = {}
          object['name'] = res.judge.name 
          object['email'] = res.judge.email
          object['score'] = "not judged yet";
          this.judges.push(object);
          this.toggleLoading();
        })
      }else{
        if(res.state == true && !res.isJudge && res.isUser){ // make the user a judge
          this.adminService.makeUserAJudge(this.form.value.email).subscribe(res => { // assign to the idea
            this.adminService.assignJudge(res.body, this.ideaId).subscribe(res => {
              let object = {}
              object['name'] = res.judge.name 
              object['email'] = res.judge.email
              object['score'] = "not judged yet";      
              this.judges.push(object);
              this.toggleLoading();
            })
          })
        }else{
          if(res.state == false){ // create new judge 
            this.adminService.createNewJudge(this.form.value.email).subscribe(res => { // assign to the idea
              this.adminService.assignJudge(res.body, this.ideaId).subscribe(res => {
                let object = {}
                object['name'] = res.judge.name 
                object['email'] = res.judge.email
                object['score'] = "not judged yet";    
                this.judges.push(object);
                this.toggleLoading();
              })
            })
          }
        }

      }
    })
  }

}
